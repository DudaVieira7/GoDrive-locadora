import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { FaLock, FaUnlock } from "react-icons/fa";
import Button from "../../componentes/Button/Button";
import CardPopUp from "../../componentes/CardPopUp/CardPopUp";
import Header from "../../componentes/Header/Header";
import Input from "../../componentes/Input/Input";
import { criarConta, getRedirectPath } from "../../utils/auth";
import "./auth.css";

function Cadastro() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      await criarConta(nomeUsuario, email, senha);
      navigate(getRedirectPath(location.search), { replace: true });
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Não foi possível criar a conta.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="form-container">
      <Header />
      <h1>Cadastro</h1>

      <CardPopUp>
        <form className="card-content auth-form" onSubmit={handleSubmit}>
          <h2 className="card-title">Crie a sua conta</h2>

          <Input
            label="Nome de utilizador"
            labelStyle={{ color: "#D9D9D9", fontWeight: "300" }}
            backgroundColor="#00000075"
            type="text"
            name="username"
            placeholder="Digite o seu nome"
            borderColor="#84ff00"
            style={{ color: "#84ff00" }}
            width="100%"
            autoComplete="username"
            required
            minLength={2}
            maxLength={60}
            value={nomeUsuario}
            onChange={(event) => setNomeUsuario(event.target.value)}
          />

          <Input
            label="E-mail"
            labelStyle={{ color: "#D9D9D9", fontWeight: "300" }}
            backgroundColor="#00000075"
            type="email"
            name="email"
            placeholder="Digite o seu e-mail"
            icon={<BsFillEnvelopeFill />}
            borderColor="#84ff00"
            iconColor="#84ff00"
            iconPosition="right"
            style={{ color: "#84ff00" }}
            width="100%"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <Input
            label="Senha"
            labelStyle={{ color: "#D9D9D9", fontWeight: "300" }}
            type={mostrarSenha ? "text" : "password"}
            name="password"
            placeholder="Crie uma senha com pelo menos 8 caracteres"
            icon={mostrarSenha ? <FaUnlock /> : <FaLock />}
            iconPosition="right"
            iconColor="#84ff00"
            width="100%"
            backgroundColor="#00000075"
            borderColor="#84ff00"
            borderRadius={8}
            style={{ color: "#84ff00" }}
            autoComplete="new-password"
            required
            minLength={8}
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            onIconClick={() => setMostrarSenha((visible) => !visible)}
          />

          {erro && <p className="auth-error" role="alert">{erro}</p>}

          <p className="auth-demo-note">
            Protótipo: a conta ficará salva somente neste navegador.
          </p>

          <Button width="100%" type="submit" disabled={carregando}>
            {carregando ? "Criando conta..." : "Criar Conta"}
          </Button>

          <p className="bottom-text">
            Já tem uma conta? <Link to={`/login${location.search}`}>FAZER LOGIN</Link>
          </p>
        </form>
      </CardPopUp>
    </div>
  );
}

export default Cadastro;
