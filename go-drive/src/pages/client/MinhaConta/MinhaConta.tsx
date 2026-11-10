import { useState, type FormEvent } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { 
  HiOutlineViewGrid, 
  HiOutlineTruck, 
  HiOutlineUser, 
  HiKey, 
  HiShieldCheck, 
  HiBadgeCheck 
} from "react-icons/hi";
import Footer from "../../../componentes/Footer/Footer";
import Header from "../../../componentes/Header/Header";
import {  veiculos } from "../../../componentes/Pesquisa/DadosPesquisa";
import {
  atualizarPerfil,
  getReservasDoUsuario,
  getUsuarioAtual,
} from "../../../utils/auth";
import type { DadosPerfil, ReservaUsuario, Usuario } from "../../../utils/auth";
import "./MinhaConta.css";

type SecaoConta = "visao-geral" | "reservas" | "dados";

function isSecaoConta(value: string | null): value is SecaoConta {
  return value === "visao-geral" || value === "reservas" || value === "dados";
}

function MinhaConta() {
  const [searchParams] = useSearchParams();
  const [usuario, setUsuario] = useState<Usuario | null>(getUsuarioAtual);
  const [reservas] = useState<ReservaUsuario[]>(getReservasDoUsuario);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  
  const secaoParam = searchParams.get("secao");
  const secao: SecaoConta = isSecaoConta(secaoParam) ? secaoParam : "visao-geral";

  if (!usuario) {
    return <Navigate to="/login?redirect=%2Fminha-conta" replace />;
  }

  function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");
    setMensagem("");

    const formData = new FormData(event.currentTarget);
    const profile: DadosPerfil = {
      nomeUsuario: String(formData.get("nomeUsuario") ?? ""),
      telefone: String(formData.get("telefone") ?? ""),
      endereco: String(formData.get("endereco") ?? ""),
      cpf: String(formData.get("cpf") ?? ""),
      cnh: String(formData.get("cnh") ?? ""),
    };

    try {
      atualizarPerfil(profile);
      setUsuario(getUsuarioAtual());
      setMensagem("Seus dados foram atualizados com sucesso!");
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Não foi possível salvar seus dados.");
    }
  }

  const navigation = [
    { id: "visao-geral" as SecaoConta, label: "Visão Geral", icon: <HiOutlineViewGrid /> },
    { id: "reservas" as SecaoConta, label: "Minhas Reservas", icon: <HiOutlineTruck /> },
    { id: "dados" as SecaoConta, label: "Editar Dados", icon: <HiOutlineUser /> },
  ];

  return (
    <div className="conta-pagina">
      <Header />

      <main className="conta-container">
        <h1>Minha Conta</h1>
        
        {/* Navegação em Pílula */}
        <nav className="conta-navegacao" aria-label="Seções da conta">
          {navigation.map((item) => (
            <Link
              key={item.id}
              className={secao === item.id ? "conta-nav-link ativo" : "conta-nav-link"}
              to={`/minha-conta?secao=${item.id}`}
            >
              <span style={{ fontSize: "1.1rem", display: "flex" }}>{item.icon}</span>
              {item.label}
              {item.id === "reservas" && (
                <span className="conta-badge-count">
                  {reservas.length > 0 ? reservas.length : 3}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* --- SEÇÃO: VISÃO GERAL --- */}
        {secao === "visao-geral" && (
          <section className="conta-painel">
            <div className="perfil-banner">
              <div className="perfil-info-usuario">
                <div className="perfil-avatar-grande">
                  <HiOutlineUser />
                </div>
                <div className="perfil-detalhes">
                  <h2>
                    {usuario.nomeUsuario} <span className="badge-vip">Cliente VIP</span>
                  </h2>
                  <p>{usuario.email} • CNH Categoria B</p>
                </div>
              </div>
              <Link className="btn-editar-perfil" to="/minha-conta?secao=dados">
                Editar Perfil
              </Link>
            </div>

            <div className="conta-stats-grid">
              <div className="stat-card">
                <div className="stat-content">
                  <span>Total de Aluguéis</span>
                  <strong>12</strong>
                </div>
                <div className="stat-icon">
                  <HiKey />
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-content">
                  <span>Reserva Ativa</span>
                  <strong>{reservas.length > 0 ? reservas.length : 1}</strong>
                </div>
                <div className="stat-icon">
                  <HiOutlineTruck />
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-content">
                  <span>Pontos GoDrive</span>
                  <strong>1.450</strong>
                </div>
                <div className="stat-icon">
                  <HiBadgeCheck />
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-content">
                  <span>Status CNH</span>
                  <strong style={{ color: "var(--verde)", fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "6px" }}>
                    <HiShieldCheck style={{ fontSize: "1.3rem" }} /> Válida
                  </strong>
                </div>
                <div className="stat-icon">
                  <HiShieldCheck />
                </div>
              </div>
            </div>

            <div className="card-sessao-bloco">
              <div className="card-sessao-header">
                <span className="status-andamento">Reserva em Andamento</span>
                <span className="badge-retirado">Retirado</span>
              </div>
              
              <div className="reserva-card-corpo">
                <div className="reserva-carro-info">
                  <img src={veiculos[0]?.src} alt="Fiat Argo" />
                  <div>
                    <h3>Fiat Argo</h3>
                    <p>Placa: ABC-1D23 • Categoria Econômico</p>
                  </div>
                </div>
                <div className="reserva-meta-info">
                  <div className="meta-item">
                    <span>Devolução:</span>
                    <strong>17/11/2026 às 10:00</strong>
                  </div>
                  <div className="meta-item">
                    <span>Local:</span>
                    <strong>Porto</strong>
                  </div>
                </div>
                <Link className="btn-acao-preto" to="/minha-conta?secao=reservas">
                  Ver Detalhes completos
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* --- SEÇÃO: MINHAS RESERVAS --- */}
        {secao === "reservas" && (
          <section className="conta-painel">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontFamily: "Orbitron, Poppins, sans-serif", fontSize: "1.3rem", fontWeight: 700 }}>Minhas Reservas</h2>
              <span style={{ color: "#777777", fontSize: "0.85rem" }}>Exibindo 3 veículos</span>
            </div>

            <div className="reservas-lista-completa">
              {/* Card 1 */}
              <div className="reserva-card-item">
                <div className="reserva-card-top">
                  <span className="badge-status em-andamento">Em andamento</span>
                  <span className="reserva-codigo">Cód: #GD-89241</span>
                  <span className="reserva-total">Total: <strong>R$ 770,00</strong></span>
                </div>
                <div className="reserva-card-corpo">
                  <div className="reserva-carro-info">
                    <img src={veiculos[0]?.src} alt="Fiat Argo" />
                    <div>
                      <h3>Fiat Argo</h3>
                      <p>Ano 2023 • Flex • Econômico</p>
                    </div>
                  </div>
                  <div className="reserva-meta-info">
                    <div className="meta-item">
                      <span>Retirada</span>
                      <strong>10/11/2026 - 10:00<br/><span style={{color:"#777", fontWeight:"normal"}}>Porto</span></strong>
                    </div>
                    <div className="meta-item">
                      <span>Devolução</span>
                      <strong>17/11/2026 - 10:00<br/><span style={{color:"#777", fontWeight:"normal"}}>Porto</span></strong>
                    </div>
                  </div>
                  <button className="btn-acao-preto">Comprovante</button>
                </div>
              </div>

              {/* Card 2 */}
              <div className="reserva-card-item">
                <div className="reserva-card-top">
                  <span className="badge-status confirmada">Confirmada</span>
                  <span className="reserva-codigo">Cód: #GD-90112</span>
                  <span className="reserva-total">Total: <strong>R$ 1.400,00</strong></span>
                </div>
                <div className="reserva-card-corpo">
                  <div className="reserva-carro-info">
                    <img src={veiculos[1]?.src || veiculos[0]?.src} alt="Jeep Compass" />
                    <div>
                      <h3>Jeep Compass</h3>
                      <p>Ano 2024 • Flex • SUV Prestige</p>
                    </div>
                  </div>
                  <div className="reserva-meta-info">
                    <div className="meta-item">
                      <span>Retirada</span>
                      <strong>20/12/2026 - 09:00<br/><span style={{color:"#777", fontWeight:"normal"}}>Lisboa Aeroporto</span></strong>
                    </div>
                    <div className="meta-item">
                      <span>Devolução</span>
                      <strong>27/12/2026 - 18:00<br/><span style={{color:"#777", fontWeight:"normal"}}>Lisboa Aeroporto</span></strong>
                    </div>
                  </div>
                  <button className="btn-acao-outline">Cancelar</button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* --- SEÇÃO: EDITAR DADOS PESSOAIS --- */}
        {secao === "dados" && (
          <section className="conta-form-container">
            <h2>Editar Dados Pessoais</h2>
            <p>Mantenha seus dados cadastrais e de motorista sempre atualizados.</p>
            
            <form className="conta-form" onSubmit={handleUpdate}>
              <div style={{ gridColumn: "1 / -1" }}>
                <span className="form-secao-titulo">
                  <HiOutlineUser style={{ color: "var(--verde)", fontSize: "1.1rem" }} /> Informações Pessoais
                </span>
              </div>
              
              <div className="conta-caixa-input">
                <label htmlFor="nomeUsuario">Nome Completo</label>
                <input
                  id="nomeUsuario"
                  name="nomeUsuario"
                  type="text"
                  required
                  defaultValue={usuario.nomeUsuario}
                />
              </div>
              
              <div className="conta-caixa-input">
                <label htmlFor="email">E-mail</label>
                <input id="email" type="email" value={usuario.email} readOnly />
              </div>
              
              <div className="conta-caixa-input">
                <label htmlFor="telefone">Telefone / WhatsApp</label>
                <input id="telefone" name="telefone" type="tel" defaultValue={usuario.telefone || "+351 912 345 678"} />
              </div>

              <div className="conta-caixa-input" style={{ gridColumn: "1 / -1" }}>
                <label htmlFor="cpf">CPF / Documento</label>
                <input id="cpf" name="cpf" type="text" defaultValue={usuario.cpf || "123.456.789-00"} />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <span className="form-secao-titulo">
                  <HiShieldCheck style={{ color: "var(--verde)", fontSize: "1.1rem" }} /> Dados da Habilitação (CNH)
                </span>
              </div>

              <div className="conta-caixa-input">
                <label htmlFor="cnh">Número da CNH</label>
                <input id="cnh" name="cnh" type="text" defaultValue={usuario.cnh || "09876543210"} />
              </div>

              <div className="conta-caixa-input">
                <label htmlFor="categoria">Categoria</label>
                <input id="categoria" type="text" defaultValue="B" readOnly />
              </div>

              <div className="conta-caixa-input">
                <label htmlFor="validade">Validade CNH</label>
                <input id="validade" type="text" defaultValue="15/08/2029" readOnly />
              </div>

              {erro && <p className="conta-mensagem erro" role="alert">{erro}</p>}
              {mensagem && <p className="conta-mensagem sucesso" role="status">{mensagem}</p>}
              
              <button className="btn-salvar-alugar" type="submit">
                Salvar Alterações
              </button>
            </form>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default MinhaConta;
