import { useState, type FormEvent } from "react";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { FaLock, FaUnlock } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../componentes/Button/Button";
import CardPopUp from "../../componentes/CardPopUp/CardPopUp";
import Header from "../../componentes/Header/Header";
import Input from "../../componentes/Input/Input";
import { entrarNaConta, getRedirectPath } from "../../utils/auth";
import "./auth.css";

function Login() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
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
      await entrarNaConta(email, senha);
      navigate(getRedirectPath(location.search), { replace: true });
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Não foi possível entrar na conta.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="form-container">
      <Header />
      <h1>Login</h1>

      <CardPopUp>
        <form className="card-content auth-form" onSubmit={handleSubmit}>
          <h2 className="card-title">Bem-vindo de volta!</h2>

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
            placeholder="Digite a sua senha"
            icon={mostrarSenha ? <FaUnlock /> : <FaLock />}
            iconPosition="right"
            iconColor="#84ff00"
            width="100%"
            backgroundColor="#00000075"
            borderColor="#84ff00"
            borderRadius={8}
            style={{ color: "#84ff00" }}
            autoComplete="current-password"
            required
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            onIconClick={() => setMostrarSenha((visible) => !visible)}
          />

          {erro && <p className="auth-error" role="alert">{erro}</p>}

          <p className="fgpassword">
            <Link to="/fgpassword">Esqueci minha senha</Link>
          </p>

          <Button width="100%" type="submit" disabled={carregando}>
            {carregando ? "Entrando..." : "Entrar"}
          </Button>

          <p className="bottom-text">
            Ainda não tem uma conta?{" "}
            <Link to={`/cadastro${location.search}`}>CRIAR CONTA</Link>
          </p>
        </form>
      </CardPopUp>
    </div>
  );
}

export default Login;
