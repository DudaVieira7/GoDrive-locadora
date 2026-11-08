import Header from "../../componentes/Header/Header";
import Input from "../../componentes/Input/Input";
import Button from "../../componentes/Button/Button"; //
import './auth.css';
import CardPopUp from "../../componentes/CardPopUp/CardPopUp";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <div className="form-container">
      <Header />

      <h1>Esqueci minha Senha</h1>
      <p> digite seu email e enviaremos um email de redefinição</p>
      
      <CardPopUp>
        <div className="card-content">
          <h2 className="card-title">Recupere sua senha de acesso!</h2>
          
          <Input
            label="E-mail" 
            labelStyle={{color: "#D9D9D9", fontWeight: "300"}}
            backgroundColor="#00000075"
            type="email"
            name="email"
            placeholder="Digite o seu e-mail"
            icon={<BsFillEnvelopeFill />}
            borderColor="#84ff00"
            iconColor="#84ff00"
            iconPosition="right"
            style={{color:"#84ff00"}}
            width="100%"
          />
          
          <Button width="100%" type="submit">
            Redefinir Senha
          </Button>

          <p className="bottom-text">
            Ainda não tem uma conta? <Link to={'/cadastro'}>CRIAR CONTA</Link>
          </p>
        </div>
      </CardPopUp>
    </div>
  );
}

export default ForgotPassword;