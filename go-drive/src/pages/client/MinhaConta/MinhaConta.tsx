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
import { 
  BsFillEnvelopeFill, 
  BsFillTelephoneFill, 
  BsFillPersonFill, 
  BsCardText, 
  BsCreditCard2Front,
  BsCalendarCheck,
  BsAward
} from "react-icons/bs";
import Footer from "../../../componentes/Footer/Footer";
import Header from "../../../componentes/Header/Header";
import Input from "../../../componentes/Input/Input";
import Button from "../../../componentes/Button/Button";
import { veiculos } from "../../../componentes/Pesquisa/DadosPesquisa";
import {
  atualizarPerfil,
  getReservasDoUsuario,
  getUsuarioAtual,
} from "../../../utils/auth";
import type { DadosPerfil, ReservaUsuario, Usuario } from "../../../utils/auth";
import "./MinhaConta.css";

type SecaoConta = "visao-geral" | "reservas" | "dados";

interface UsuarioComCnhExt extends Usuario {
  categoriaCnh?: string;
  validadeCnh?: string;
}

function isSecaoConta(value: string | null): value is SecaoConta {
  return value === "visao-geral" || value === "reservas" || value === "dados";
}

function MinhaConta() {
  const [searchParams] = useSearchParams();
  const [usuario, setUsuario] = useState<UsuarioComCnhExt | null>(getUsuarioAtual);
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
    const profile: DadosPerfil & { email?: string; categoriaCnh?: string; validadeCnh?: string } = {
      nomeUsuario: String(formData.get("nomeUsuario") ?? ""),
      telefone: String(formData.get("telefone") ?? ""),
      endereco: String(formData.get("endereco") ?? ""),
      cpf: String(formData.get("cpf") ?? ""),
      cnh: String(formData.get("cnh") ?? ""),
      email: String(formData.get("email") ?? ""),
      categoriaCnh: String(formData.get("categoriaCnh") ?? ""),
      validadeCnh: String(formData.get("validadeCnh") ?? ""),
    };

    try {
      atualizarPerfil(profile);
      setUsuario({
        ...getUsuarioAtual()!,
        email: profile.email || usuario?.email || "",
        categoriaCnh: profile.categoriaCnh,
        validadeCnh: profile.validadeCnh,
      });
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
                  <p>{usuario.email} • CNH Categoria {usuario.categoriaCnh || "B"}</p>
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
                  Ver Detalhes Completos
                </Link>
              </div>
            </div>
          </section>
        )}

        {secao === "reservas" && (
          <section className="conta-painel">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontFamily: "Orbitron, Poppins, sans-serif", fontSize: "1.3rem", fontWeight: 700 }}>Minhas Reservas</h2>
              <span style={{ color: "#777777", fontSize: "0.85rem" }}>Exibindo 3 veículos</span>
            </div>

            <div className="reservas-lista-completa">
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
            </div>
          </section>
        )}

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
              
              <Input
                label="Nome Completo"
                labelStyle={{ color: "#D9D9D9", fontWeight: "300" }}
                backgroundColor="#00000075"
                type="text"
                name="nomeUsuario"
                required
                defaultValue={usuario.nomeUsuario}
                placeholder="Digite o seu nome"
                icon={<BsFillPersonFill />}
                borderColor="#868a82"
                iconColor="#84ff00"
                iconPosition="right"
                style={{ color: "#fff" }}
                width="100%"
              />
              
              <Input
                label="E-mail"
                labelStyle={{ color: "#D9D9D9", fontWeight: "300" }}
                backgroundColor="#00000075"
                type="email"
                name="email"
                required
                defaultValue={usuario.email}
                placeholder="Digite o seu e-mail"
                icon={<BsFillEnvelopeFill />}
                borderColor="#868a82"
                iconColor="#84ff00"
                iconPosition="right"
                style={{ color: "#fff" }}
                width="100%"
              />
              
              <Input
                label="Telefone / WhatsApp"
                labelStyle={{ color: "#D9D9D9", fontWeight: "300" }}
                backgroundColor="#00000075"
                type="tel"
                name="telefone"
                defaultValue={usuario.telefone || "+351 912 345 678"}
                placeholder="Digite o seu telefone"
                icon={<BsFillTelephoneFill />}
                borderColor="#868a82"
                iconColor="#84ff00"
                iconPosition="right"
                style={{ color: "#fff" }}
                width="100%"
              />

              <div style={{ gridColumn: "1 / -1" }}>
                <Input
                  label="CPF / Documento"
                  labelStyle={{ color: "#D9D9D9", fontWeight: "300" }}
                  backgroundColor="#00000075"
                  type="text"
                  name="cpf"
                  defaultValue={usuario.cpf || "123.456.789-00"}
                  placeholder="Digite o seu CPF"
                  icon={<BsCreditCard2Front />}
                  borderColor="#868a82"
                  iconColor="#84ff00"
                  iconPosition="right"
                  style={{ color: "#fff" }}
                  width="100%"
                />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <span className="form-secao-titulo">
                  <HiShieldCheck style={{ color: "var(--verde)", fontSize: "1.1rem" }} /> Dados da Habilitação (CNH)
                </span>
              </div>

              <Input
                label="Número da CNH"
                labelStyle={{ color: "#D9D9D9", fontWeight: "300" }}
                backgroundColor="#00000075"
                type="text"
                name="cnh"
                defaultValue={usuario.cnh || "09876543210"}
                placeholder="Digite o número da CNH"
                icon={<BsCardText />}
                borderColor="#868a82"
                iconColor="#84ff00"
                iconPosition="right"
                style={{ color: "#fff" }}
                width="100%"
              />

              <Input
                label="Categoria"
                labelStyle={{ color: "#D9D9D9", fontWeight: "300" }}
                backgroundColor="#00000075"
                type="text"
                name="categoriaCnh"
                defaultValue={usuario.categoriaCnh || "B"}
                placeholder="Ex: B, AB"
                icon={<BsAward />}
                borderColor="#868a82"
                iconColor="#84ff00"
                iconPosition="right"
                style={{ color: "#fff" }}
                width="100%"
              />

              <Input
                label="Validade CNH"
                labelStyle={{ color: "#D9D9D9", fontWeight: "300" }}
                backgroundColor="#00000075"
                type="text"
                name="validadeCnh"
                defaultValue={usuario.validadeCnh || "15/08/2029"}
                placeholder="DD/MM/AAAA"
                icon={<BsCalendarCheck />}
                borderColor="#868a82"
                iconColor="#84ff00"
                iconPosition="right"
                style={{ color: "#fff" }}
                width="100%"
              />

              {erro && <p className="conta-mensagem erro" role="alert">{erro}</p>}
              {mensagem && <p className="conta-mensagem sucesso" role="status">{mensagem}</p>}
              
              <Button
                type="submit" 
                width="100" 
                borderRadius="30px" 
                fontSize="1.2rem" 
                fontWeight="600"
                fontFamily="Science Gothic Variable"
                >
                Salvar Alterações
              </Button>
            </form>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default MinhaConta;