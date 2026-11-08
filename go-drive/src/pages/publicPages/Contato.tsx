import Header from "../../componentes/Header/Header";
import Input from "../../componentes/Input/Input";
import Button from "../../componentes/Button/Button"; 
import CardPopUp from "../../componentes/CardPopUp/CardPopUp";
import { BsFillEnvelopeFill } from "react-icons/bs";
import './publicPagesStyles/Contato.css'


function Contato() {
  return (
    <div className="form-container">
      <Header />  
      <CardPopUp>
        <div className="card-content">
          <h2 className="card-title">Entre em Contato com nossa equipe!</h2>
           <p className="card-subtitle">digite sua mensagem para entrar em contato</p>
          <Input
            label="Nome" 
            labelStyle={{color: "#D9D9D9", fontWeight: "300"}}
            backgroundColor="#00000075"
            type="email"
            name="email"
            placeholder="Digite o seu nome"
            borderColor="#84ff00"
            style={{color:"#84ff00"}}
            width="100%"
          />

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

          <Input
            label="mesagem" 
            labelStyle={{color: "#D9D9D9", fontWeight: "300"}}
            backgroundColor="#00000075"
            type="text"
            name="email"
            borderColor="#84ff00"
            style={{color:"#84ff00"}}
            width="100%"
            height={100}
            
          />

          
          <Button width="100%" type="submit">
            Enviar Mensagem
          </Button>
        </div>
      </CardPopUp>
    </div>
  );
}

export default Contato