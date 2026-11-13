/* ==========================================================================
   logsAuditoriaDados.ts
   Dados mockados da tela "Logs de auditoria" (Área do Administrador).

   Quando ligar na API, troque só `obterLogs` (e, se quiser filtrar no
   servidor, passe os filtros como parâmetro). O componente
   LogsAuditoria.tsx não precisa mudar.
========================================================================== */

/* ==========================================================================
   TIPOS
========================================================================== */
export type Severidade = "INFO" | "WARNING" | "CRITICAL";

export interface LogAuditoria {
  id: string; // LOG-9841
  timestamp: string; // ISO local, com milissegundos: 2026-11-08T17:58:21.412
  operador: string; // quem executou a ação
  cargo: string; // cargo / sistema de origem
  unidade: string; // unidade / localização
  acao: string; // código da ação (SNAKE_CASE_MAIUSCULO)
  alvo: string; // entidade afetada
  ip: string; // terminal / IP de origem
  severidade: Severidade;
}

/* ==========================================================================
   CONSTANTES DE APOIO (usadas pelos filtros)
========================================================================== */
export const SEVERIDADES: Severidade[] = ["INFO", "WARNING", "CRITICAL"];

/* ==========================================================================
   DADOS MOCKADOS  (troque depois pelos dados reais da API)
========================================================================== */
export const LOGS_DADOS: LogAuditoria[] = [
  {
    id: "LOG-9841",
    timestamp: "2026-11-08T17:58:21.412",
    operador: "Op. Marcos Andrade",
    cargo: "Atendente de Balcão",
    unidade: "Congonhas (CGH)",
    acao: "CHECKIN_COMPLETED",
    alvo: "Reserva GOD-884910",
    ip: "192.168.1.45",
    severidade: "INFO",
  },
  {
    id: "LOG-9840",
    timestamp: "2026-11-08T17:42:05.109",
    operador: "SISTEMA_AUTO",
    cargo: "System Cron Engine",
    unidade: "Sede Corporativa",
    acao: "PRICE_DYNAMIC_SYNC",
    alvo: "Grupo SUV Premium (Frota CGH)",
    ip: "10.0.0.12",
    severidade: "INFO",
  },
  {
    id: "LOG-9839",
    timestamp: "2026-11-08T16:15:33.890",
    operador: "Desconhecido",
    cargo: "Unauthenticated API",
    unidade: "Externa",
    acao: "FAILED_LOGIN_ATTEMPT",
    alvo: "Painel Admin / Subnet 192.168.1.*",
    ip: "187.45.109.12",
    severidade: "CRITICAL",
  },
  {
    id: "LOG-9838",
    timestamp: "2026-11-08T15:30:12.001",
    operador: "Renata Souza (Gerência)",
    cargo: "Gerente Regional",
    unidade: "Congonhas (CGH)",
    acao: "PRICE_OVERRIDE_MANUAL",
    alvo: "Reserva GOD-992014",
    ip: "192.168.1.12",
    severidade: "WARNING",
  },
  {
    id: "LOG-9837",
    timestamp: "2026-11-08T14:02:44.755",
    operador: "Carlos Mendes (TI)",
    cargo: "SysAdmin",
    unidade: "Matriz / TI",
    acao: "ROLE_PERMISSIONS_UPDATE",
    alvo: "Operador Marcos Andrade (Mat: 4402)",
    ip: "192.168.1.100",
    severidade: "WARNING",
  },
  {
    id: "LOG-9836",
    timestamp: "2026-11-08T13:20:09.318",
    operador: "Op. Juliana Prado",
    cargo: "Atendente de Balcão",
    unidade: "Guarulhos (GRU)",
    acao: "CHECKOUT_COMPLETED",
    alvo: "Reserva GOD-883377",
    ip: "192.168.2.31",
    severidade: "INFO",
  },
  {
    id: "LOG-9835",
    timestamp: "2026-11-08T12:47:51.642",
    operador: "Desconhecido",
    cargo: "Unauthenticated API",
    unidade: "Externa",
    acao: "FAILED_LOGIN_ATTEMPT",
    alvo: "Painel Admin / Subnet 192.168.1.*",
    ip: "187.45.109.12",
    severidade: "CRITICAL",
  },
  {
    id: "LOG-9834",
    timestamp: "2026-11-08T11:05:27.204",
    operador: "Renata Souza (Gerência)",
    cargo: "Gerente Regional",
    unidade: "Congonhas (CGH)",
    acao: "VEHICLE_STATUS_CHANGED",
    alvo: "Veículo GDR-4F21 → Em manutenção",
    ip: "192.168.1.12",
    severidade: "WARNING",
  },
  {
    id: "LOG-9833",
    timestamp: "2026-11-08T10:31:40.870",
    operador: "Op. Fernanda Lima",
    cargo: "Atendente de Balcão",
    unidade: "Viracopos (VCP)",
    acao: "RESERVATION_CANCELLED",
    alvo: "Reserva GOD-881205",
    ip: "192.168.3.18",
    severidade: "INFO",
  },
  {
    id: "LOG-9832",
    timestamp: "2026-11-08T09:12:03.556",
    operador: "Carlos Mendes (TI)",
    cargo: "SysAdmin",
    unidade: "Matriz / TI",
    acao: "DATA_EXPORT",
    alvo: "Relatório financeiro (Out/2026)",
    ip: "192.168.1.100",
    severidade: "WARNING",
  },
  {
    id: "LOG-9831",
    timestamp: "2026-11-08T08:00:00.003",
    operador: "SISTEMA_AUTO",
    cargo: "System Cron Engine",
    unidade: "Sede Corporativa",
    acao: "BACKUP_COMPLETED",
    alvo: "Banco de dados principal",
    ip: "10.0.0.12",
    severidade: "INFO",
  },
  {
    id: "LOG-9830",
    timestamp: "2026-11-07T19:44:18.927",
    operador: "Op. Marcos Andrade",
    cargo: "Atendente de Balcão",
    unidade: "Congonhas (CGH)",
    acao: "CONTRACT_GENERATED",
    alvo: "Reserva GOD-880932",
    ip: "192.168.1.45",
    severidade: "INFO",
  },
  {
    id: "LOG-9829",
    timestamp: "2026-11-07T18:09:56.381",
    operador: "Desconhecido",
    cargo: "Unauthenticated API",
    unidade: "Externa",
    acao: "FAILED_LOGIN_ATTEMPT",
    alvo: "Painel Admin / Subnet 192.168.2.*",
    ip: "201.17.88.203",
    severidade: "CRITICAL",
  },
  {
    id: "LOG-9828",
    timestamp: "2026-11-07T16:36:22.744",
    operador: "Renata Souza (Gerência)",
    cargo: "Gerente Regional",
    unidade: "Congonhas (CGH)",
    acao: "PASSWORD_RESET",
    alvo: "Operador Juliana Prado (Mat: 4415)",
    ip: "192.168.1.12",
    severidade: "WARNING",
  },
  {
    id: "LOG-9827",
    timestamp: "2026-11-07T15:02:10.098",
    operador: "Op. Juliana Prado",
    cargo: "Atendente de Balcão",
    unidade: "Guarulhos (GRU)",
    acao: "USER_LOGIN",
    alvo: "Sessão de balcão",
    ip: "192.168.2.31",
    severidade: "INFO",
  },
  {
    id: "LOG-9826",
    timestamp: "2026-11-07T11:48:37.215",
    operador: "SISTEMA_AUTO",
    cargo: "System Cron Engine",
    unidade: "Sede Corporativa",
    acao: "PRICE_DYNAMIC_SYNC",
    alvo: "Grupo Econômico (Frota GRU)",
    ip: "10.0.0.12",
    severidade: "INFO",
  },
  {
    id: "LOG-9825",
    timestamp: "2026-11-06T17:25:49.660",
    operador: "Carlos Mendes (TI)",
    cargo: "SysAdmin",
    unidade: "Matriz / TI",
    acao: "ROLE_PERMISSIONS_UPDATE",
    alvo: "Operador Fernanda Lima (Mat: 4431)",
    ip: "192.168.1.100",
    severidade: "WARNING",
  },
  {
    id: "LOG-9824",
    timestamp: "2026-11-06T10:14:05.433",
    operador: "Op. Fernanda Lima",
    cargo: "Atendente de Balcão",
    unidade: "Viracopos (VCP)",
    acao: "CHECKIN_COMPLETED",
    alvo: "Reserva GOD-879840",
    ip: "192.168.3.18",
    severidade: "INFO",
  },
];

/* Quando ligar na API, troque só esta função */
export function obterLogs(): LogAuditoria[] {
  return [...LOGS_DADOS].sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}