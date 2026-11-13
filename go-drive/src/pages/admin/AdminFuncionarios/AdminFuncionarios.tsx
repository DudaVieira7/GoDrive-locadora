import { useEffect, useState, type FormEvent } from "react";
import AdminLayout from "../../../componentes/AdminLayout/AdminLayout";
import {
  atualizarFuncionario,
  criarFuncionario,
  excluirFuncionario,
  listarFuncionarios,
} from "../../../utils/auth";
import type { Funcionario } from "../../../utils/auth";
import "./AdminFuncionarios.css";

function AdminFuncionarios() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [funcionarioEditando, setFuncionarioEditando] =
    useState<Funcionario | null>(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erroLista, setErroLista] = useState("");
  const [mensagemLista, setMensagemLista] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    try {
      setFuncionarios(listarFuncionarios());
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível carregar os funcionários.",
      );
    }
  }, []);

  function cancelarEdicao() {
    setFuncionarioEditando(null);
    setNome("");
    setEmail("");
    setSenha("");
    setErro("");
    setMensagem("");
  }

  async function salvarFuncionario(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");
    setMensagem("");
    setCarregando(true);

    try {
      if (funcionarioEditando) {
        await atualizarFuncionario(
          funcionarioEditando.email,
          nome,
          email,
          senha,
        );
        setMensagem("Os dados do funcionário foram atualizados.");
      } else {
        await criarFuncionario(nome, email, senha);
        setMensagem("Funcionário cadastrado com sucesso.");
      }

      setFuncionarios(listarFuncionarios());
      setFuncionarioEditando(null);
      setNome("");
      setEmail("");
      setSenha("");
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível salvar o funcionário.",
      );
    } finally {
      setCarregando(false);
    }
  }

  function editarFuncionario(funcionario: Funcionario) {
    setFuncionarioEditando(funcionario);
    setNome(funcionario.nomeUsuario);
    setEmail(funcionario.email);
    setSenha("");
    setErro("");
    setMensagem("");
  }

  function handleExcluirFuncionario(funcionario: Funcionario) {
    const confirmado = window.confirm(
      `Tem certeza de que deseja excluir o funcionário ${funcionario.nomeUsuario}?`,
    );
    if (!confirmado) return;

    setErroLista("");
    setMensagemLista("");
    try {
      excluirFuncionario(funcionario.email);
      setFuncionarios(listarFuncionarios());
      if (funcionarioEditando?.email === funcionario.email) {
        setFuncionarioEditando(null);
        setNome("");
        setEmail("");
        setSenha("");
      }
      setMensagemLista("Funcionário excluído com sucesso.");
    } catch (error) {
      setErroLista(
        error instanceof Error
          ? error.message
          : "Não foi possível excluir o funcionário.",
      );
    }
  }

  return (
    <AdminLayout>
      <main className="funcionarios-conteudo">
        <section className="funcionarios-intro">
          <div>
            <p className="funcionarios-sobretitulo">GESTÃO DA EQUIPE</p>
            <h2>Funcionários</h2>
            <p>
              Cadastre e mantenha atualizados os acessos da sua equipe. Neste
              protótipo, os dados ficam salvos somente neste navegador.
            </p>
          </div>
          <div className="funcionarios-total" aria-label={`${funcionarios.length} funcionários cadastrados`}>
            <strong>{funcionarios.length}</strong>
            <span>{funcionarios.length === 1 ? "funcionário" : "funcionários"}</span>
          </div>
        </section>

        <div className="funcionarios-grade">
          <section className="funcionarios-form-card">
            <div className="funcionarios-card-titulo">
              <span className="funcionarios-icone" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 19v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V19m5-9a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm11-3v6m-3-3h6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div>
                <h3>{funcionarioEditando ? "Editar funcionário" : "Novo funcionário"}</h3>
                <p>
                  {funcionarioEditando
                    ? "Atualize os dados de acesso."
                    : "Preencha os dados para criar um acesso."}
                </p>
              </div>
            </div>

            <form className="funcionarios-form" onSubmit={salvarFuncionario}>
              <label className="funcionarios-campo">
                <span>Nome completo</span>
                <input
                  type="text"
                  name="nome"
                  placeholder="Ex.: Ana Silva"
                  autoComplete="name"
                  minLength={2}
                  maxLength={60}
                  required
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                />
              </label>

              <label className="funcionarios-campo">
                <span>E-mail</span>
                <input
                  type="email"
                  name="email"
                  placeholder="funcionario@empresa.com"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>

              <label className="funcionarios-campo">
                <span>Senha {funcionarioEditando && "(opcional para alterar)"}</span>
                <input
                  type="password"
                  name="password"
                  placeholder={
                    funcionarioEditando
                      ? "Deixe em branco para manter a senha atual"
                      : "Mínimo de 8 caracteres"
                  }
                  autoComplete="new-password"
                  minLength={8}
                  required={!funcionarioEditando}
                  value={senha}
                  onChange={(event) => setSenha(event.target.value)}
                />
                <small>
                  {funcionarioEditando
                    ? "A senha atual não é exibida. Informe outra somente se quiser trocá-la."
                    : "A senha deve ter pelo menos 8 caracteres."}
                </small>
              </label>

              {erro && (
                <p className="funcionarios-mensagem erro" role="alert">
                  {erro}
                </p>
              )}
              {mensagem && (
                <p className="funcionarios-mensagem sucesso" role="status">
                  {mensagem}
                </p>
              )}

              <div className="funcionarios-acoes-form">
                <button
                  className="funcionarios-salvar"
                  type="submit"
                  disabled={carregando}
                >
                  {carregando
                    ? "Salvando..."
                    : funcionarioEditando
                      ? "Salvar alterações"
                      : "Cadastrar funcionário"}
                </button>
                {funcionarioEditando && (
                  <button
                    className="funcionarios-cancelar"
                    type="button"
                    onClick={cancelarEdicao}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </section>

          <section className="funcionarios-lista-card" aria-labelledby="funcionarios-lista-titulo">
            <div className="funcionarios-lista-header">
              <div>
                <h3 id="funcionarios-lista-titulo">Equipe cadastrada</h3>
                <p>Contas que podem acessar o sistema como funcionários.</p>
              </div>
            </div>
            {erroLista && (
              <p className="funcionarios-lista-mensagem erro" role="alert">
                {erroLista}
              </p>
            )}
            {mensagemLista && (
              <p className="funcionarios-lista-mensagem sucesso" role="status">
                {mensagemLista}
              </p>
            )}

            {funcionarios.length > 0 ? (
              <div className="funcionarios-tabela-wrap">
                <table className="funcionarios-tabela">
                  <thead>
                    <tr>
                      <th scope="col">Funcionário</th>
                      <th scope="col">E-mail</th>
                      <th scope="col">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {funcionarios.map((funcionario) => (
                      <tr key={funcionario.email}>
                        <td>
                          <span className="funcionarios-nome">
                            <span className="funcionarios-avatar" aria-hidden="true">
                              {funcionario.nomeUsuario.slice(0, 1).toLocaleUpperCase("pt-BR")}
                            </span>
                            {funcionario.nomeUsuario}
                          </span>
                        </td>
                        <td>{funcionario.email}</td>
                        <td>
                          <div className="funcionarios-acoes-linha">
                            <button
                              className="funcionarios-editar"
                              type="button"
                              disabled={carregando}
                              onClick={() => editarFuncionario(funcionario)}
                              aria-label={`Editar ${funcionario.nomeUsuario}`}
                            >
                              Editar
                            </button>
                            <button
                              className="funcionarios-excluir"
                              type="button"
                              disabled={carregando}
                              onClick={() => handleExcluirFuncionario(funcionario)}
                              aria-label={`Excluir ${funcionario.nomeUsuario}`}
                            >
                              Excluir
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="funcionarios-vazio">
                <span className="funcionarios-vazio-icone" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M15 19v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V19m5-9a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm11-3v6m-3-3h6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <strong>Nenhum funcionário cadastrado</strong>
                <p>Use o formulário para adicionar a primeira conta à equipe.</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </AdminLayout>
  );
}

export default AdminFuncionarios;
