
import Header from "../../componentes/Header/Header";
import Input from "../../componentes/Input/Input";

import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

function Login() {
  return (
    <div>
      <Header />

      <h1>Login</h1>

      {/* Input de e-mail */}
      <Input
        label="E-mail"
        type="email"
        name="email"
        placeholder="Digite seu e-mail"
        icon={<FaEnvelope />}
        iconPosition="left"
        width="350px"
      />

      {/* Input de senha */}
      <Input
        label="Senha"
        type="password"
        name="password"
        placeholder="Digite sua senha"
        icon={<FaLock />}
        iconPosition="right"
        width="350px"
        backgroundColor="#f9fafb"
        borderColor="#84ff00"
        borderRadius={8}
      />

      {/* Input de usuário */}
      <Input
        label="Nome de usuário"
        type="text"
        name="username"
        placeholder="Digite seu nome"
        icon={<FaUser />}
        iconPosition="left"
        width="350px"
        height={55}
        iconColor="#84ff00"
        iconSize={22}
      />

      
    </div>
  );
}

export default Login;
