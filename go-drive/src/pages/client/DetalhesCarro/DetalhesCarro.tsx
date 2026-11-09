import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import Footer from "../../../componentes/Footer/Footer";
import Header from "../../../componentes/Header/Header";
import {
  getNomeCategoria,
  getNomeMarca,
  veiculos,
} from "../../../componentes/Pesquisa/DadosPesquisa";
import { solicitarAluguel, usuarioEstaLogado } from "../../../utils/auth";
import "./DetalhesCarro.css";

function DetalhesCarro() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [erroReserva, setErroReserva] = useState("");

  if (!usuarioEstaLogado()) {
    return (
      <Navigate
        to={`/cadastro?redirect=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  const veiculo = veiculos.find((item) => item.id_carro === Number(id));

  if (!veiculo) {
    return (
      <div className="detalhes-pagina">
        <Header />
        <main className="detalhes-nao-encontrado">
          <h1>Veículo não encontrado</h1>
          <Link to="/frota">Voltar para a frota</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const nomeCompleto = `${getNomeMarca(veiculo.fk_id_marca)} ${veiculo.modelo}`;

  return (
    <div className="detalhes-pagina">
      <Header />

      <main className="detalhes-container">
        <Link className="detalhes-voltar" to="/frota">
          Voltar para a frota
        </Link>

        <section className="detalhes-card">
          <div className="detalhes-imagem">
            <img src={veiculo.src} alt={nomeCompleto} />
          </div>

          <div className="detalhes-conteudo">
            <p className="detalhes-categoria">
              {getNomeCategoria(veiculo.fk_categoria)}
            </p>
            <h1>{nomeCompleto}</h1>
            <p className="detalhes-preco">
              {veiculo.preco_diaria.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
              <span> / diária</span>
            </p>

            <dl className="detalhes-informacoes">
              <div><dt>Ano</dt><dd>{veiculo.ano_modelo}</dd></div>
              <div><dt>Quilometragem</dt><dd>{veiculo.quilometragem.toLocaleString("pt-BR")} km</dd></div>
              <div><dt>Combustível</dt><dd>{veiculo.tipo_combustivel}</dd></div>
              <div><dt>Transmissão</dt><dd>{veiculo.transmissao}</dd></div>
              <div><dt>Cor</dt><dd>{veiculo.cor}</dd></div>
              <div><dt>Portas</dt><dd>{veiculo.numero_portas}</dd></div>
              <div><dt>Placa</dt><dd>{veiculo.placa}</dd></div>
              <div><dt>Status</dt><dd>{veiculo.status_veiculo}</dd></div>
            </dl>

            <button
              className="detalhes-alugar"
              type="button"
              onClick={() => {
                setErroReserva("");
                try {
                  solicitarAluguel(veiculo.id_carro);
                  navigate("/minha-conta?secao=reservas");
                } catch (error) {
                  setErroReserva(
                    error instanceof Error
                      ? error.message
                      : "Não foi possível solicitar o aluguel.",
                  );
                }
              }}
            >
              Alugar
            </button>
            {erroReserva && (
              <p className="detalhes-erro" role="alert">{erroReserva}</p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default DetalhesCarro;