/* ==========================================================================
   visaoGeralDados.ts
   Dados mockados da tela "Visão Geral" (Área do Administrador).

   Quando ligar na API, troque só este arquivo (principalmente `obterDados`
   e `METRICAS_DADOS`). O componente VisaoGeral.tsx não precisa mudar.
========================================================================== */

/* ==========================================================================
   TIPOS
========================================================================== */
export type Periodo = "1D" | "1W" | "1M" | "3M" | "1Y" | "All";
export type MetricaId = "lucro" | "locacoes" | "clientes" | "funcionarios";
export type Aba = "geral" | "logs" | "workers";

export interface Ponto {
  rotulo: string;
  valor: number;
}

/* [valor inicial, valor final, intensidade da ondulação] */
export type ParamsSerie = [number, number, number];

/* Dados puros da métrica (o ícone fica no componente, pois é JSX) */
export interface MetricaDados {
  id: MetricaId;
  titulo: string; // texto pequeno da célula
  valor: string; // valor grande da célula
  tituloGrafico: string;
  descricao: string;
  eixoY: string; // legenda vertical do gráfico
  rotuloTooltip: string;
  moeda: boolean;
  arredondar: number; // passo de arredondamento dos valores gerados
  params: Record<Periodo, ParamsSerie>;
}

export interface AbaDados {
  id: Aba;
  rotulo: string;
}

/* ==========================================================================
   DADOS MOCKADOS  (troque depois pelos dados reais da API)
========================================================================== */
export const USUARIO = { nome: "Maria" };

export const ABAS_DADOS: AbaDados[] = [
  { id: "geral", rotulo: "visão geral" },
  { id: "logs", rotulo: "logs de auditoria" },
  { id: "workers", rotulo: "workers" },
];

export const METRICAS_DADOS: MetricaDados[] = [
  {
    id: "locacoes",
    titulo: "Total de Locações Anual",
    valor: "1.340",
    tituloGrafico: "Evolução das Locações",
    descricao: "Total de carros alugados ao longo do período selecionado.",
    eixoY: "Carros alugados",
    rotuloTooltip: "Locações",
    moeda: false,
    arredondar: 1,
    params: {
      "1D": [2, 22, 3],
      "1W": [40, 95, 8],
      "1M": [60, 140, 12],
      "3M": [300, 520, 40],
      "1Y": [70, 160, 15],
      All: [400, 1340, 80],
    },
  },
  {
    id: "clientes",
    titulo: "Total de novos Clientes este mês",
    valor: "2.104",
    tituloGrafico: "Evolução de Novos Clientes",
    descricao: "Cadastros de novos clientes ao longo do período selecionado.",
    eixoY: "Novos clientes",
    rotuloTooltip: "Novos clientes",
    moeda: false,
    arredondar: 1,
    params: {
      "1D": [1, 14, 2],
      "1W": [60, 110, 10],
      "1M": [70, 150, 15],
      "3M": [200, 380, 30],
      "1Y": [120, 260, 25],
      All: [300, 2104, 150],
    },
  },
  {
    id: "funcionarios",
    titulo: "Funcionários cadastrados no sistema",
    valor: "0",
    tituloGrafico: "Evolução do Quadro de Funcionários",
    descricao: "Funcionários ativos na unidade em que o administrador trabalha.",
    eixoY: "Funcionários",
    rotuloTooltip: "Funcionários",
    moeda: false,
    arredondar: 1,
    params: {
      "1D": [98, 100, 1],
      "1W": [97, 100, 1],
      "1M": [92, 100, 2],
      "3M": [84, 100, 3],
      "1Y": [60, 100, 5],
      All: [20, 100, 6],
    },
  },
  {
    id: "lucro",
    titulo: "Lucro total Anual",
    valor: "R$ 1.200.000",
    tituloGrafico: "Evolução dos Lucros",
    descricao: "Consolidado financeiro de locações ativas e finalizadas do grupo GoDrive.",
    eixoY: "Lucro total anual",
    rotuloTooltip: "Lucro Líquido",
    moeda: true,
    arredondar: 100,
    params: {
      "1D": [1800, 21000, 1400],
      "1W": [31000, 62000, 3500],
      "1M": [42000, 94000, 4000],
      "3M": [90000, 300000, 15000],
      "1Y": [60000, 520000, 30000],
      All: [150000, 1200000, 60000],
    },
  },
];

export const PERIODOS: Periodo[] = ["1D", "1W", "1M", "3M", "1Y", "All"];

/* ==========================================================================
   GERAÇÃO DAS SÉRIES MOCKADAS
========================================================================== */
const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

const HOJE = new Date(2026, 10, 8); // 08 Nov 2026 (mock)

function fmtData(d: Date) {
  return `${String(d.getDate()).padStart(2, "0")} ${MESES[d.getMonth()]}`;
}

function diasAtras(n: number) {
  const d = new Date(HOJE);
  d.setDate(d.getDate() - n);
  return d;
}

function rotulosDoPeriodo(p: Periodo): string[] {
  switch (p) {
    case "1D":
      return Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}h`);
    case "1W":
      return Array.from({ length: 7 }, (_, i) => fmtData(diasAtras(6 - i)));
    case "1M":
      return Array.from({ length: 8 }, (_, i) => fmtData(new Date(2026, 10, i + 1)));
    case "3M":
      return Array.from({ length: 13 }, (_, i) => fmtData(diasAtras(84 - i * 7)));
    case "1Y":
      return Array.from(
        { length: 12 },
        (_, i) => MESES[new Date(2026, 10 - (11 - i), 1).getMonth()] ?? "",
      );
    default:
      return ["2022", "2023", "2024", "2025", "2026"];
  }
}

/* Gera uma série "natural" (tendência + leve ondulação), sempre igual */
function gerarSerie(rotulos: string[], [inicio, fim, ondulacao]: ParamsSerie, arredondar: number): Ponto[] {
  const n = rotulos.length;
  return rotulos.map((rotulo, i) => {
    const t = n === 1 ? 1 : i / (n - 1);
    const base = inicio + (fim - inicio) * t;
    const ruido = Math.sin(i * 1.7 + 1) * ondulacao;
    return { rotulo, valor: Math.max(0, Math.round((base + ruido) / arredondar) * arredondar) };
  });
}

/* Quando ligar na API, troque só esta função */
export function obterDados(metrica: MetricaDados, periodo: Periodo): Ponto[] {
  return gerarSerie(rotulosDoPeriodo(periodo), metrica.params[periodo], metrica.arredondar);
}