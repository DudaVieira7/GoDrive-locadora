import type { ReactElement, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/goDrive_logoBranca.png";
import { ABAS_DADOS } from "../../pages/admin/VisaoGeral/visaoGeralDados";
import type { Aba } from "../../pages/admin/VisaoGeral/visaoGeralDados";
import "./AdminLayout.css";


const svgProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": true,
} as const;

const IconeGrade = () => (
  <svg {...svgProps}>
    <path d="M3 3h8v8H3V3zm10 0h8v5h-8V3zM3 13h8v8H3v-8zm10-3h8v11h-8V10z" />
  </svg>
);

const IconeLogs = () => (
  <svg {...svgProps}>
    <path d="M3 5h14v2H3V5zm0 4h14v2H3V9zm0 4h8v2H3v-2zm12 0a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm-.8 2v3.2l2.4 1.4.8-1.3-1.8-1V15h-1.4z" />
  </svg>
);

const IconeWorkers = () => (
  <svg {...svgProps}>
    <circle cx="9" cy="6" r="3.2" />
    <path d="M3 20v-5a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v5H3zm13-7h5a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-5v-8z" />
  </svg>
);

const ICONES_ABA: Record<Aba, () => ReactElement> = {
  geral: IconeGrade,
  logs: IconeLogs,
  workers: IconeWorkers,
};

const ROTAS_ABA: Record<Aba, string> = {
  geral: "/admin/visao-geral",
  logs: "/admin/logs-auditoria",
  workers: "/admin/adminstrar-funcionarios",
};

function AdminLayout({ children }: { children: ReactNode }) {
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
          {ABAS_DADOS.map(({ id, rotulo }) => {
            const Icone = ICONES_ABA[id];
            return (
              <NavLink
                key={id}
                to={ROTAS_ABA[id]}
                className={({ isActive }) => (isActive ? "admin-aba ativa" : "admin-aba")}
              >
                <Icone />
                {rotulo}
              </NavLink>
            );
          })}
        </nav>

        {/* ===== Conteúdo da página ===== */}
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;