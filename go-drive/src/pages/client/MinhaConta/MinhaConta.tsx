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
import {
  getNomeCategoria,
  getNomeMarca,
  veiculos,
} from "../../../componentes/Pesquisa/DadosPesquisa";
import {
  atualizarPerfil,
  cancelarReserva,
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

function statusDaReserva(reserva: ReservaUsuario) {
  if (reserva.status === "Cancelada") return "Cancelada";
  if (!reserva.dataRetirada || !reserva.horaRetirada ||
      !reserva.dataDevolucao || !reserva.horaDevolucao) {
    return "Solicitada";
  }

  const inicio = new Date(
    `${reserva.dataRetirada}T${reserva.horaRetirada}:00`,
  ).getTime();
  const fim = new Date(
    `${reserva.dataDevolucao}T${reserva.horaDevolucao}:00`,
  ).getTime();
  if (Number.isNaN(inicio) || Number.isNaN(fim)) return "Solicitada";
  if (fim <= Date.now()) return "Concluída";
  if (inicio <= Date.now()) return "Em andamento";
  return "Agendada";
}

function reservaEstaAtiva(reserva: ReservaUsuario) {
  const status = statusDaReserva(reserva);
  return status !== "Cancelada" && status !== "Concluída";
}

function formatarDataHora(data?: string, hora?: string) {
  if (!data || !hora) return "Não informado";
  const timestamp = new Date(`${data}T${hora}:00`);
  if (Number.isNaN(timestamp.getTime())) return "Não informado";
  return `${timestamp.toLocaleDateString("pt-BR")} às ${hora}`;
}

const moeda = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function MinhaConta() {
  const [searchParams] = useSearchParams();
  const [usuario, setUsuario] = useState<UsuarioComCnhExt | null>(getUsuarioAtual);
  const [reservas, setReservas] = useState<ReservaUsuario[]>(getReservasDoUsuario);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [erroReserva, setErroReserva] = useState("");
  
  const secaoParam = searchParams.get("secao");
  const secao: SecaoConta = isSecaoConta(secaoParam) ? secaoParam : "visao-geral";
  const reservasAtivas = reservas.filter(reservaEstaAtiva);
  const reservaEmDestaque = reservasAtivas[0];
  const veiculoEmDestaque = reservaEmDestaque
    ? veiculos.find((item) => item.id_carro === reservaEmDestaque.idCarro)
    : undefined;

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

  function handleCancelReservation(id: string) {
    setErroReserva("");
    try {
      cancelarReserva(id);
      setReservas(getReservasDoUsuario());
    } catch (error) {
      setErroReserva(
        error instanceof Error
          ? error.message
          : "Não foi possível cancelar a reserva.",
      );
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
                  {reservas.length}
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
                  <strong>{reservas.length}</strong>
                </div>
                <div className="stat-icon">
                  <HiKey />
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-content">
                  <span>Reserva Ativa</span>
                  <strong>{reservasAtivas.length}</strong>
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

            {reservaEmDestaque ? (
              <div className="card-sessao-bloco">
                <div className="card-sessao-header">
                  <span className="status-andamento">
                    Reserva {statusDaReserva(reservaEmDestaque).toLowerCase()}
                  </span>
                  <span className="badge-retirado">
                    {statusDaReserva(reservaEmDestaque)}
                  </span>
                </div>

                <div className="reserva-card-corpo">
                  <div className="reserva-carro-info">
                    {veiculoEmDestaque && (
                      <img
                        src={veiculoEmDestaque.src}
                        alt={`${getNomeMarca(veiculoEmDestaque.fk_id_marca)} ${veiculoEmDestaque.modelo}`}
                      />
                    )}
                    <div>
                      <h3>
                        {veiculoEmDestaque
                          ? `${getNomeMarca(veiculoEmDestaque.fk_id_marca)} ${veiculoEmDestaque.modelo}`
                          : `Veículo #${reservaEmDestaque.idCarro}`}
                      </h3>
                      <p>
                        {veiculoEmDestaque
                          ? `Categoria ${getNomeCategoria(veiculoEmDestaque.fk_categoria)}`
                          : "Veículo reservado"}
                      </p>
                    </div>
                  </div>
                  <div className="reserva-meta-info">
                    <div className="meta-item">
                      <span>Devolução:</span>
                      <strong>
                        {formatarDataHora(
                          reservaEmDestaque.dataDevolucao,
                          reservaEmDestaque.horaDevolucao,
                        )}
                      </strong>
                    </div>
                    <div className="meta-item">
                      <span>Local:</span>
                      <strong>{reservaEmDestaque.localDevolucao || "Não informado"}</strong>
                    </div>
                  </div>
                  <Link className="btn-acao-preto" to="/minha-conta?secao=reservas">
                    Ver Minhas Reservas
                  </Link>
                </div>
              </div>
            ) : (
              <div className="card-sessao-bloco">
                <p className="conta-reservas-vazio">Você não tem reservas ativas.</p>
                <Link className="btn-acao-preto" to="/minha-conta?secao=reservas">
                  Ver Minhas Reservas
                </Link>
              </div>
            )}
          </section>
        )}

        {secao === "reservas" && (
          <section className="conta-painel">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontFamily: "Orbitron, Poppins, sans-serif", fontSize: "1.3rem", fontWeight: 700 }}>Minhas Reservas</h2>
              <span style={{ color: "#777777", fontSize: "0.85rem" }}>
                {reservas.length} {reservas.length === 1 ? "reserva" : "reservas"}
              </span>
            </div>

            {erroReserva && (
              <p className="conta-mensagem erro" role="alert">{erroReserva}</p>
            )}

            <div className="reservas-lista-completa">
              {reservas.length === 0 ? (
                <p className="conta-reservas-vazio">Você ainda não fez nenhuma reserva.</p>
              ) : (
                reservas.map((reserva) => {
                  const veiculo = veiculos.find(
                    (item) => item.id_carro === reserva.idCarro,
                  );
                  const status = statusDaReserva(reserva);
                  const classeStatus = status
                    .toLowerCase()
                    .replaceAll(" ", "-");

                  return (
                    <article className="reserva-card-item" key={reserva.id}>
                      <div className="reserva-card-top">
                        <span className={`badge-status ${classeStatus}`}>
                          {status}
                        </span>
                        <span className="reserva-codigo">
                          Cód: #{reserva.id.slice(0, 8).toUpperCase()}
                        </span>
                        <span className="reserva-total">
                          Total: <strong>{reserva.total !== undefined ? moeda(reserva.total) : "—"}</strong>
                        </span>
                      </div>
                      <div className="reserva-card-corpo">
                        <div className="reserva-carro-info">
                          {veiculo && (
                            <img
                              src={veiculo.src}
                              alt={`${getNomeMarca(veiculo.fk_id_marca)} ${veiculo.modelo}`}
                            />
                          )}
                          <div>
                            <h3>
                              {veiculo
                                ? `${getNomeMarca(veiculo.fk_id_marca)} ${veiculo.modelo}`
                                : `Veículo #${reserva.idCarro}`}
                            </h3>
                            <p>
                              {veiculo
                                ? `Ano ${veiculo.ano_modelo} • ${veiculo.tipo_combustivel} • ${getNomeCategoria(veiculo.fk_categoria)}`
                                : "Detalhes do veículo indisponíveis"}
                            </p>
                          </div>
                        </div>
                        <div className="reserva-meta-info">
                          <div className="meta-item">
                            <span>Retirada</span>
                            <strong>
                              {formatarDataHora(reserva.dataRetirada, reserva.horaRetirada)}
                              <br />
                              <span className="reserva-local">
                                {reserva.localRetirada || "Local não informado"}
                              </span>
                            </strong>
                          </div>
                          <div className="meta-item">
                            <span>Devolução</span>
                            <strong>
                              {formatarDataHora(reserva.dataDevolucao, reserva.horaDevolucao)}
                              <br />
                              <span className="reserva-local">
                                {reserva.localDevolucao || "Local não informado"}
                              </span>
                            </strong>
                          </div>
                        </div>
                        {reservaEstaAtiva(reserva) && (
                          <button
                            className="btn-acao-outline"
                            type="button"
                            onClick={() => handleCancelReservation(reserva.id)}
                          >
                            Cancelar reserva
                          </button>
                        )}
                      </div>
                    </article>
                  );
                })
              )}
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