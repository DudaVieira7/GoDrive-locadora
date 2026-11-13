import { useMemo, useState } from "react";
import type { KeyboardEvent } from "react";
import AdminLayout from "../../../componentes/AdminLayout/AdminLayout";
import { SEVERIDADES, obterLogs } from "./LogsAuditoriaDados";
import type { LogAuditoria, Severidade } from "./LogsAuditoriaDados";
import "./LogsAuditoria.css";

/* ==========================================================================
   LogsAuditoria.tsx
   Seção "logs de auditoria" da Área do Administrador.
   Abaixo das abas: card de pesquisa (campos escuros) + card preto com
   seletor de severidade e a tabela, no lugar onde ficava o gráfico.
   A casca (topbar, título, abas) vem do AdminLayout.
   Os dados vêm de logsAuditoriaDados.ts (trocar por API depois).
========================================================================== */

type FiltroSeveridade = "TODAS" | Severidade;

const POR_PAGINA = 8;
const TODOS_LOGS = obterLogs();
const UNIDADES = Array.from(new Set(TODOS_LOGS.map((l) => l.unidade))).sort();

/* ==========================================================================
   UTILITÁRIOS
========================================================================== */

/* "Atendente" casa com "atendente", "áéí" casam com "aei" */
function normalizar(txt: string) {
  return txt
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/* 2026-11-08T17:58:21.412 -> 2026-11-08 17:58:21.412 */
function fmtTimestamp(ts: string) {
  return ts.replace("T", " ");
}

/* Exporta os registros filtrados (separador ";" abre direto no Excel pt-BR) */
function exportarCSV(linhas: LogAuditoria[]) {
  const cabecalho = ["ID", "Timestamp", "Operador", "Cargo", "Unidade", "Ação", "Alvo", "IP", "Severidade"];
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const corpo = linhas.map((l) =>
    [l.id, fmtTimestamp(l.timestamp), l.operador, l.cargo, l.unidade, l.acao, l.alvo, l.ip, l.severidade],
  );
  const csv = [cabecalho, ...corpo].map((r) => r.map(esc).join(";")).join("\n");

  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `logs-auditoria-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

const IconeBusca = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4.5 4.5" />
  </svg>
);

/* ==========================================================================
   PÁGINA
========================================================================== */
function LogsAuditoria() {
  const [busca, setBusca] = useState("");
  const [unidade, setUnidade] = useState("");
  const [de, setDe] = useState("");
  const [ate, setAte] = useState("");
  const [severidade, setSeveridade] = useState<FiltroSeveridade>("TODAS");
  const [pagina, setPagina] = useState(1);
  const [selecionado, setSelecionado] = useState<string | null>(TODOS_LOGS[0]?.id ?? null);

  /* busca + unidade + datas (as contagens de severidade partem daqui) */
  const baseFiltrada = useMemo(() => {
    const termo = normalizar(busca.trim());
    return TODOS_LOGS.filter((l) => {
      const dia = l.timestamp.slice(0, 10);
      if (de && dia < de) return false;
      if (ate && dia > ate) return false;
      if (unidade && l.unidade !== unidade) return false;
      if (!termo) return true;
      const texto = normalizar(
        [l.id, l.timestamp, l.operador, l.cargo, l.unidade, l.acao, l.alvo, l.ip, l.severidade].join(" "),
      );
      return texto.includes(termo);
    });
  }, [busca, unidade, de, ate]);

  const contagem = useMemo(() => {
    const c: Record<FiltroSeveridade, number> = {
      TODAS: baseFiltrada.length,
      INFO: 0,
      WARNING: 0,
      CRITICAL: 0,
    };
    baseFiltrada.forEach((l) => {
      c[l.severidade] += 1;
    });
    return c;
  }, [baseFiltrada]);

  const resultado = useMemo(
    () => (severidade === "TODAS" ? baseFiltrada : baseFiltrada.filter((l) => l.severidade === severidade)),
    [baseFiltrada, severidade],
  );

  const totalPaginas = Math.max(1, Math.ceil(resultado.length / POR_PAGINA));
  const paginaAtual = Math.min(pagina, totalPaginas);
  const inicio = (paginaAtual - 1) * POR_PAGINA;
  const visiveis = resultado.slice(inicio, inicio + POR_PAGINA);

  const temFiltro = busca !== "" || unidade !== "" || severidade !== "TODAS" || de !== "" || ate !== "";

  function limpar() {
    setBusca("");
    setUnidade("");
    setSeveridade("TODAS");
    setDe("");
    setAte("");
    setPagina(1);
  }

  function aoTeclarLinha(e: KeyboardEvent<HTMLTableRowElement>, id: string) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelecionado(id);
    }
  }

  return (
    <AdminLayout>
      {/* ===== Pesquisa ===== */}
      <section className="logs-filtros-card" role="search" aria-label="Pesquisar logs de auditoria">
        <div className="logs-secao">
          <h2>
            <IconeBusca />
            Pesquisar nos logs
          </h2>
          {temFiltro && (
            <button type="button" className="logs-limpar" onClick={limpar}>
              Limpar filtros
            </button>
          )}
        </div>

        <div className="logs-campos">
          <label className="logs-campo logs-campo-busca">
            <span>Pesquisa</span>
            <input
              type="search"
              value={busca}
              placeholder="ID, operador, ação, alvo ou IP"
              onChange={(e) => {
                setBusca(e.target.value);
                setPagina(1);
              }}
            />
          </label>

          <label className="logs-campo">
            <span>Unidade</span>
            <select
              value={unidade}
              onChange={(e) => {
                setUnidade(e.target.value);
                setPagina(1);
              }}
            >
              <option value="">Todas as unidades</option>
              {UNIDADES.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </label>

          <label className="logs-campo">
            <span>De</span>
            <input
              type="date"
              value={de}
              max={ate || undefined}
              onChange={(e) => {
                setDe(e.target.value);
                setPagina(1);
              }}
            />
          </label>

          <label className="logs-campo">
            <span>Até</span>
            <input
              type="date"
              value={ate}
              min={de || undefined}
              onChange={(e) => {
                setAte(e.target.value);
                setPagina(1);
              }}
            />
          </label>
        </div>
      </section>

      {/* ===== Card preto: severidade + tabela (onde ficava o gráfico) ===== */}
      <section className="logs-card" aria-label="Registros de auditoria">
        <div className="logs-card-header">
          <div>
            <h2>Registros de Auditoria</h2>
            <p>Ações realizadas por operadores, gerentes e pelo próprio sistema.</p>
          </div>

          <button
            type="button"
            className="logs-exportar"
            disabled={resultado.length === 0}
            onClick={() => exportarCSV(resultado)}
          >
            Exportar CSV
          </button>
        </div>

        <div className="logs-severidades">
          <div className="admin-periodos" role="group" aria-label="Filtrar por severidade">
            {(["TODAS", ...SEVERIDADES] as FiltroSeveridade[]).map((s) => (
              <button
                key={s}
                type="button"
                className={severidade === s ? "admin-periodo ativo" : "admin-periodo"}
                aria-pressed={severidade === s}
                onClick={() => {
                  setSeveridade(s);
                  setPagina(1);
                }}
              >
                {s === "TODAS" ? "Todas" : s}
                <span className="logs-contagem">{contagem[s]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="logs-tabela-wrap">
          <table className="logs-tabela">
            <thead>
              <tr>
                <th scope="col">LOG ID / Timestamp</th>
                <th scope="col">Operador &amp; Cargo</th>
                <th scope="col">Código da Ação</th>
                <th scope="col">Alvo / Entidade</th>
                <th scope="col">Terminal / IP</th>
                <th scope="col">Severidade</th>
              </tr>
            </thead>
            <tbody>
              {visiveis.map((l) => (
                <tr
                  key={l.id}
                  className={selecionado === l.id ? "logs-linha ativa" : "logs-linha"}
                  aria-selected={selecionado === l.id}
                  tabIndex={0}
                  onClick={() => setSelecionado(l.id)}
                  onKeyDown={(e) => aoTeclarLinha(e, l.id)}
                >
                  <td>
                    <span className="logs-id">{l.id}</span>
                    <span className="logs-mono-suave">{fmtTimestamp(l.timestamp)}</span>
                  </td>
                  <td>
                    <span className="logs-operador">{l.operador}</span>
                    <span className="logs-mono-suave">
                      {l.cargo} • {l.unidade}
                    </span>
                  </td>
                  <td>
                    <span className="logs-acao">{l.acao}</span>
                  </td>
                  <td className="logs-alvo">{l.alvo}</td>
                  <td>
                    <span className="logs-ip">{l.ip}</span>
                  </td>
                  <td>
                    <span className={`logs-badge ${l.severidade.toLowerCase()}`}>{l.severidade}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {visiveis.length === 0 && (
            <div className="logs-vazio">
              <strong>Nenhum registro encontrado</strong>
              <p>Ajuste a pesquisa, a severidade ou o período para ver outros logs.</p>
              {temFiltro && (
                <button type="button" className="logs-limpar" onClick={limpar}>
                  Limpar filtros
                </button>
              )}
            </div>
          )}
        </div>

        {/* ===== Rodapé: contador + paginação ===== */}
        <div className="logs-rodape">
          <span className="logs-rodape-texto" aria-live="polite">
            {resultado.length === 0
              ? "0 registros"
              : `Mostrando ${inicio + 1}–${inicio + visiveis.length} de ${resultado.length} registros`}
          </span>

          <div className="logs-pag">
            <button type="button" disabled={paginaAtual <= 1} onClick={() => setPagina(paginaAtual - 1)}>
              Anterior
            </button>
            <span className="logs-pag-info">
              {paginaAtual} / {totalPaginas}
            </span>
            <button
              type="button"
              disabled={paginaAtual >= totalPaginas}
              onClick={() => setPagina(paginaAtual + 1)}
            >
              Próxima
            </button>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}

export default LogsAuditoria;