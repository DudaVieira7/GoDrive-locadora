import { useState } from "react";
import Header from "../../componentes/Header/Header";
import Input from "../../componentes/Input/Input";
import './auth.css';
import { FaLock, FaUnlock } from "react-icons/fa";
import CardPopUp from "../../componentes/CardPopUp/CardPopUp";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Button from "../../componentes/Button/Button";

function ResetPassword() {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <div className="form-container">
      <Header />

      <h1>Cadastro</h1>
      
      <CardPopUp>
        <div className="card-content">
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
            maxLength={8}
            onIconClick={() => setMostrarSenha(!mostrarSenha)} 
          />
            <Button width="100%" >
            Criar Conta
          </Button>

          <p className="bottom-text">Já tem uma conta? <Link to={'/login'}>FAZER LOGIN</Link></p>
        </div>
      </CardPopUp>
    </div>
  );
}

export default ResetPassword;