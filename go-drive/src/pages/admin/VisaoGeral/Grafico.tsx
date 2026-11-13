import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import type { MetricaDados, Ponto } from "./visaoGeralDados";

/* ==========================================================================
   Grafico.tsx
   Tudo que desenha o gráfico de área: formatação, curva suave, eixos e tooltip.
   Não conhece a origem dos dados: recebe `dados` (Ponto[]) e a `metrica`.
   Os estilos (.admin-*) ficam em VisaoGeral.css.
========================================================================== */

/* Só o que o gráfico precisa saber da métrica */
export type MetricaDoGrafico = Pick<
  MetricaDados,
  "tituloGrafico" | "eixoY" | "rotuloTooltip" | "moeda"
>;

interface Coord {
  x: number;
  y: number;
}

/* ==========================================================================
   FORMATAÇÃO
========================================================================== */

function fmtValor(metrica: MetricaDoGrafico, v: number) {
  const txt = v.toLocaleString("pt-BR");
  return metrica.moeda ? `R$ ${txt}` : txt;
}

/* 1200000 -> 1,2M | 300000 -> 300k */
function compactar(v: number) {
  if (v >= 1_000_000) return `${(v / 1_000_000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}M`;
  if (v >= 1_000) return `${(v / 1_000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}k`;
  return v.toLocaleString("pt-BR");
}

/* ==========================================================================
   UTILITÁRIOS DE GRÁFICO
========================================================================== */

/* Curva suave (interpolação cúbica monotônica, sem "estourar" os picos) */
function curva(pts: Coord[]): string {
  const n = pts.length;
  if (n === 0) return "";
  const p0 = pts[0] as Coord;
  if (n === 1) return `M ${p0.x} ${p0.y}`;

  const dx: number[] = [];
  const m: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    const a = pts[i] as Coord;
    const b = pts[i + 1] as Coord;
    dx.push(b.x - a.x);
    m.push((b.y - a.y) / (b.x - a.x));
  }

  const t: number[] = new Array(n).fill(0);
  t[0] = m[0] as number;
  t[n - 1] = m[n - 2] as number;
  for (let i = 1; i < n - 1; i++) {
    const anterior = m[i - 1] as number;
    const atual = m[i] as number;
    t[i] = anterior * atual <= 0 ? 0 : (anterior + atual) / 2;
  }
  for (let i = 0; i < n - 1; i++) {
    const mi = m[i] as number;
    if (mi === 0) {
      t[i] = 0;
      t[i + 1] = 0;
    } else {
      const a = (t[i] as number) / mi;
      const b = (t[i + 1] as number) / mi;
      const s = a * a + b * b;
      if (s > 9) {
        const tau = 3 / Math.sqrt(s);
        t[i] = tau * a * mi;
        t[i + 1] = tau * b * mi;
      }
    }
  }

  let d = `M ${p0.x} ${p0.y}`;
  for (let i = 0; i < n - 1; i++) {
    const a = pts[i] as Coord;
    const b = pts[i + 1] as Coord;
    const w = dx[i] as number;
    const c1x = a.x + w / 3;
    const c1y = a.y + ((t[i] as number) * w) / 3;
    const c2x = b.x - w / 3;
    const c2y = b.y - ((t[i + 1] as number) * w) / 3;
    d += ` C ${c1x} ${c1y} ${c2x} ${c2y} ${b.x} ${b.y}`;
  }
  return d;
}

/* Passo "bonito" para o eixo Y (25000, 50000, 100000...) */
function passoBonito(bruto: number) {
  const mag = 10 ** Math.floor(Math.log10(bruto));
  for (const f of [1, 2, 2.5, 5, 10]) {
    if (f * mag >= bruto) return f * mag;
  }
  return 10 * mag;
}

/* ==========================================================================
   GRÁFICO PRINCIPAL (área + tooltip) — serve para qualquer métrica
========================================================================== */
function Grafico({ dados, metrica }: { dados: Ponto[]; metrica: MetricaDoGrafico }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [largura, setLargura] = useState(900);
  const [ativo, setAtivo] = useState(() => Math.round(((dados.length - 1) * 3) / 7));

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setLargura(w);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const pequeno = largura < 520;
  const altura = pequeno ? 300 : 380;
  const m = { t: 16, r: 28, b: 36, l: pequeno ? 62 : 84 };
  const w = largura - m.l - m.r;
  const h = altura - m.t - m.b;

  const max = Math.max(...dados.map((d) => d.valor), 1);
  const passo = passoBonito(max / 4);
  const yMax = passo * 4;
  const ticksY = [0, 1, 2, 3, 4].map((k) => k * passo);

  const xDe = (i: number) => m.l + (dados.length === 1 ? 0 : (i / (dados.length - 1)) * w);
  const yDe = (v: number) => m.t + h - (v / yMax) * h;

  const coords: Coord[] = dados.map((d, i) => ({ x: xDe(i), y: yDe(d.valor) }));
  const dadoAtivo = dados[ativo];
  const pAtivo = coords[ativo];
  const primeiro = coords[0];
  const ultimo = coords[coords.length - 1];
  if (!dadoAtivo || !pAtivo || !primeiro || !ultimo) return null;

  const linha = curva(coords);
  const area = `${linha} L ${ultimo.x} ${m.t + h} L ${primeiro.x} ${m.t + h} Z`;

  const salto = Math.ceil(dados.length / 8);
  const indicesX = dados.map((_, i) => i).filter((i) => i % salto === 0);

  function aoMover(e: PointerEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left - m.l;
    const idx = Math.round((px / w) * (dados.length - 1));
    setAtivo(Math.max(0, Math.min(dados.length - 1, idx)));
  }

  const LARGURA_TIP = 210;
  const esquerdaTip =
    pAtivo.x + 14 + LARGURA_TIP > largura ? pAtivo.x - 14 - LARGURA_TIP : pAtivo.x + 14;

  return (
    <div className="admin-grafico-wrap" ref={wrapRef}>
      <svg
        className="admin-grafico-svg"
        width={largura}
        height={altura}
        viewBox={`0 0 ${largura} ${altura}`}
        onPointerMove={aoMover}
        role="img"
        aria-label={metrica.tituloGrafico}
      >
        <defs>
          <linearGradient id="gradLucro" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a6ff00" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#a6ff00" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* legenda vertical do eixo Y */}
        <text
          className="admin-eixo-titulo"
          x={14}
          y={m.t + h / 2}
          textAnchor="middle"
          transform={`rotate(-90 14 ${m.t + h / 2})`}
        >
          {metrica.eixoY}
        </text>

        {/* grade horizontal + rótulos Y */}
        {ticksY.map((v) => (
          <g key={v}>
            <line x1={m.l} x2={m.l + w} y1={yDe(v)} y2={yDe(v)} className="admin-grade" />
            <line x1={m.l - 6} x2={m.l} y1={yDe(v)} y2={yDe(v)} className="admin-eixo" />
            <text x={m.l - 10} y={yDe(v) + 4} textAnchor="end" className="admin-eixo-texto">
              {compactar(v)}
            </text>
          </g>
        ))}

        {/* grade vertical + rótulos X */}
        {indicesX.map((i) => (
          <g key={i}>
            <line x1={xDe(i)} x2={xDe(i)} y1={m.t} y2={m.t + h} className="admin-grade" />
            <line x1={xDe(i)} x2={xDe(i)} y1={m.t + h} y2={m.t + h + 6} className="admin-eixo" />
            <text x={xDe(i)} y={m.t + h + 22} textAnchor="middle" className="admin-eixo-texto">
              {dados[i]?.rotulo}
            </text>
          </g>
        ))}

        {/* eixos */}
        <line x1={m.l} x2={m.l} y1={m.t} y2={m.t + h} className="admin-eixo" />
        <line x1={m.l} x2={m.l + w} y1={m.t + h} y2={m.t + h} className="admin-eixo" />

        {/* área + linha */}
        <path d={area} fill="url(#gradLucro)" />
        <path d={linha} fill="none" className="admin-linha" />

        {/* ponto ativo */}
        <line x1={pAtivo.x} x2={pAtivo.x} y1={m.t} y2={m.t + h} className="admin-cursor" />
        <circle cx={pAtivo.x} cy={pAtivo.y} r="5" className="admin-ponto" />
      </svg>

      <div
        className="admin-tooltip"
        style={{ left: esquerdaTip, top: m.t + 24, width: LARGURA_TIP }}
      >
        <span className="admin-tooltip-data">{dadoAtivo.rotulo}</span>
        <span className="admin-tooltip-valor">
          {metrica.rotuloTooltip} : {fmtValor(metrica, dadoAtivo.valor)}
        </span>
      </div>
    </div>
  );
}

export default Grafico;