import { useState, type FormEvent } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import Footer from "../../../componentes/Footer/Footer";
import Header from "../../../componentes/Header/Header";
import { getNomeMarca, veiculos } from "../../../componentes/Pesquisa/DadosPesquisa";
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
  const secao: SecaoConta = isSecaoConta(secaoParam)
    ? secaoParam
    : "visao-geral";

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
      setMensagem("Seus dados foram atualizados.");
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Não foi possível salvar seus dados.");
    }
  }

  const navigation: { id: SecaoConta; label: string }[] = [
    { id: "visao-geral", label: "Visão geral" },
    { id: "reservas", label: "Minhas reservas" },
    { id: "dados", label: "Meus dados" },
  ];

  return (
    <div className="conta-pagina">
      <Header />

      <main className="conta-container">
        <h1>Minha conta</h1>
        <nav className="conta-navegacao" aria-label="Seções da conta">
          {navigation.map((item) => (
            <Link
              key={item.id}
              className={secao === item.id ? "conta-nav-link ativo" : "conta-nav-link"}
              to={`/minha-conta?secao=${item.id}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {secao === "visao-geral" && (
          <section className="conta-painel">
            <h2>Olá, {usuario.nomeUsuario}</h2>
            <p>Este é o resumo da sua conta GoDrive.</p>
            <div className="conta-resumo">
              <article>
                <span>Reservas solicitadas</span>
                <strong>{reservas.length}</strong>
              </article>
              <article>
                <span>E-mail cadastrado</span>
                <strong>{usuario.email}</strong>
              </article>
            </div>
            {reservas.length === 0 && (
              <Link className="conta-acao" to="/frota">
                Encontrar um carro
              </Link>
            )}
          </section>
        )}

        {secao === "reservas" && (
          <section className="conta-painel">
            <h2>Minhas reservas</h2>
            {reservas.length === 0 ? (
              <div className="conta-vazio">
                <p>Você ainda não solicitou nenhum aluguel.</p>
                <Link className="conta-acao" to="/frota">Ver veículos</Link>
              </div>
            ) : (
              <div className="reservas-lista">
                {reservas.map((reserva) => {
                  const carro = veiculos.find(
                    (item) => item.id_carro === reserva.idCarro,
                  );
                  if (!carro) return null;

                  return (
                    <article className="reserva-item" key={reserva.id}>
                      <img src={carro.src} alt="" />
                      <div>
                        <h3>{getNomeMarca(carro.fk_id_marca)} {carro.modelo}</h3>
                        <p>
                          Solicitada em{" "}
                          {new Date(reserva.criadaEm).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <span className="reserva-status">{reserva.status}</span>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {secao === "dados" && (
          <section className="conta-painel">
            <h2>Meus dados</h2>
            <form className="conta-form" onSubmit={handleUpdate}>
              <label>
                Nome de utilizador
                <input
                  name="nomeUsuario"
                  type="text"
                  required
                  minLength={2}
                  maxLength={60}
                  defaultValue={usuario.nomeUsuario}
                />
              </label>
              <label>
                E-mail
                <input type="email" value={usuario.email} readOnly />
              </label>
              <label>
                Telefone
                <input name="telefone" type="tel" defaultValue={usuario.telefone} />
              </label>
              <label>
                Morada
                <input name="endereco" type="text" defaultValue={usuario.endereco} />
              </label>
              <label>
                CPF
                <input name="cpf" type="text" defaultValue={usuario.cpf} />
              </label>
              <label>
                CNH
                <input name="cnh" type="text" defaultValue={usuario.cnh} />
              </label>

              {erro && <p className="conta-mensagem erro" role="alert">{erro}</p>}
              {mensagem && <p className="conta-mensagem sucesso" role="status">{mensagem}</p>}
              <button className="conta-acao" type="submit">Salvar alterações</button>
            </form>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default MinhaConta;
