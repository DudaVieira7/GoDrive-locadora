import { useState } from "react";
import type { ReactElement } from "react";
import Grafico from "./Grafico";
import { ABAS_DADOS, METRICAS_DADOS, PERIODOS, obterDados } from "./Visaogeraldados";
import type { Aba, MetricaDados, MetricaId, Periodo } from "./Visaogeraldados";
import Logo from '../../../assets/goDrive_logoBranca.png'
import "./VisaoGeral.css";


interface Metrica extends MetricaDados {
  Icone: () => ReactElement;
}

const svgProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": true,
} as const;

const IconeCarro = () => (
  <svg {...svgProps}>
    <path d="M5 11l1.5-4.2A2 2 0 0 1 8.4 5.5h7.2a2 2 0 0 1 1.9 1.3L19 11a2 2 0 0 1 1.5 1.9V17a1 1 0 0 1-1 1h-1a1.5 1.5 0 0 1-3 0H7.5a1.5 1.5 0 0 1-3 0h-1a1 1 0 0 1-1-1v-4.1A2 2 0 0 1 5 11zm2.2-.5h9.6l-1-3H8.2l-1 3zM7 14.5a1 1 0 1 0 0 .01zm10 0a1 1 0 1 0 0 .01z" />
  </svg>
);

const IconeCliente = () => (
  <svg {...svgProps}>
    <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3.5 8h7a3.5 3.5 0 0 0-7 0zM14 9h5V7.8h-5V9zm0 3h5v-1.2h-5V12zm0 3h4v-1.2h-4V15z" />
  </svg>
);

const IconeFuncionarios = () => (
  <svg {...svgProps}>
    <circle cx="8" cy="6.5" r="3" />
    <path d="M2.5 19v-4.5A3.5 3.5 0 0 1 6 11h4a3.5 3.5 0 0 1 3.5 3.5V19h-11z" />
    <path d="M14 12.5h7a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-5.5a1 1 0 0 1 1-1zm1.5-1.5v-1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1h-1.2v-.8h-1.6v.8H15.5z" />
  </svg>
);

const IconeLucro = () => (
  <svg {...svgProps}>
    <path d="M9 3h6l-1.4 3h-3.2L9 3zm3.6 5C16.5 9.4 19 12.6 19 16a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5c0-3.4 2.5-6.6 6.4-8h2.2zM12 11a.9.9 0 0 0-.9.9v.2c-1 .2-1.7.9-1.7 1.8 0 1 .8 1.5 2 1.8 .8.2 1 .4 1 .7 0 .3-.3.5-.8.5-.5 0-.9-.2-1-.6l-1.3.3c.2.8.9 1.3 1.8 1.4v.2a.9.9 0 0 0 1.8 0v-.2c1.1-.2 1.8-.9 1.8-1.8 0-1-.7-1.5-2-1.8-.8-.2-1-.4-1-.7 0-.3.3-.5.7-.5.4 0 .7.2.9.5l1.2-.4c-.3-.7-.9-1.1-1.7-1.3v-.1A.9.9 0 0 0 12 11z" />
  </svg>
);

const IconeGrade = () => (
  <svg {...svgProps} width={16} height={16}>
    <path d="M3 3h8v8H3V3zm10 0h8v5h-8V3zM3 13h8v8H3v-8zm10-3h8v11h-8V10z" />
  </svg>
);

const IconeLogs = () => (
  <svg {...svgProps} width={16} height={16}>
    <path d="M3 5h14v2H3V5zm0 4h14v2H3V9zm0 4h8v2H3v-2zm12 0a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm-.8 2v3.2l2.4 1.4.8-1.3-1.8-1V15h-1.4z" />
  </svg>
);

const IconeWorkers = () => (
  <svg {...svgProps} width={16} height={16}>
    <circle cx="9" cy="6" r="3.2" />
    <path d="M3 20v-5a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v5H3zm13-7h5a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-5v-8z" />
  </svg>
);


/* ==========================================================================
   LIGAÇÃO DOS DADOS COM OS ÍCONES
========================================================================== */
const ICONES_METRICA: Record<MetricaId, () => ReactElement> = {
  locacoes: IconeCarro,
  clientes: IconeCliente,
  funcionarios: IconeFuncionarios,
  lucro: IconeLucro,
};

const ICONES_ABA: Record<Aba, () => ReactElement> = {
  geral: IconeGrade,
  logs: IconeLogs,
  workers: IconeWorkers,
};

const METRICAS: Metrica[] = METRICAS_DADOS.map((m) => ({ ...m, Icone: ICONES_METRICA[m.id] }));

const ABAS = ABAS_DADOS.map((a) => ({ ...a, Icone: ICONES_ABA[a.id] }));

/* ==========================================================================
   PÁGINA
========================================================================== */
function VisaoGeral() {
  const [aba, setAba] = useState<Aba>("geral");
  const [metricaId, setMetricaId] = useState<MetricaId>("lucro");
  const [periodo, setPeriodo] = useState<Periodo>("1M");

  const metrica = METRICAS.find((x) => x.id === metricaId) ?? (METRICAS[0] as Metrica);

  return (
    <div className="admin-pagina">
      {/* ===== Barra superior ===== */}
      
        <header className="admin-topbar">
        <img src={Logo} alt="goDrive" className="Logo" />
        <p className="admin-topbar-texto">Admin Analytics</p>
        </header>
      <div className="admin-painel">
        <h1 className="admin-titulo">Área do Administrador</h1>

        {/* ===== Abas ===== */}
        <nav className="admin-abas" aria-label="Seções do painel">
          {ABAS.map(({ id, rotulo, Icone }) => (
            <button
              key={id}
              type="button"
              className={aba === id ? "admin-aba ativa" : "admin-aba"}
              aria-current={aba === id ? "page" : undefined}
              onClick={() => setAba(id)}
            >
              <Icone />
              {rotulo}
            </button>
          ))}
        </nav>

        {aba !== "geral" ? (
          <div className="admin-vazio">Esta seção ainda está em construção.</div>
        ) : (
          <>
            {/* ===== Células (KPIs clicáveis) ===== */}
            <section className="admin-kpis" aria-label="Indicadores">
              {METRICAS.map((k) => {
                const selecionada = k.id === metricaId;
                return (
                  <button
                    key={k.id}
                    type="button"
                    className={selecionada ? "admin-kpi-card ativo" : "admin-kpi-card"}
                    aria-pressed={selecionada}
                    onClick={() => setMetricaId(k.id)}
                  >
                    <div className="admin-kpi-texto">
                      <span className="admin-kpi-titulo">{k.titulo}</span>
                      <strong className="admin-kpi-valor">{k.valor}</strong>
                    </div>
                    <span className="admin-kpi-icone">
                      <k.Icone />
                    </span>
                  </button>
                );
              })}
            </section>

            {/* ===== Gráfico da célula selecionada ===== */}
            <section className="admin-grafico-card">
              <div className="admin-grafico-header">
                <div>
                  <h2>{metrica.tituloGrafico}</h2>
                  <p>{metrica.descricao}</p>
                </div>

                <div className="admin-periodos" role="group" aria-label="Período do gráfico">
                  {PERIODOS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={periodo === p ? "admin-periodo ativo" : "admin-periodo"}
                      aria-pressed={periodo === p}
                      onClick={() => setPeriodo(p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <Grafico
                key={`${metrica.id}-${periodo}`}
                dados={obterDados(metrica, periodo)}
                metrica={metrica}
              />
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default VisaoGeral;