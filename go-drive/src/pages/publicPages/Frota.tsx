import { useState } from "react";

import Header from "../../componentes/Header/Header";
import Footer from "../../componentes/Footer/Footer";
import PesquisaVeiculos from "../../componentes/Pesquisa/Pesquisa";
import FrotaCarros from "../../componentes/FrotaCarros/FrotaCarros";

import { veiculos } from "../../componentes/Pesquisa/DadosPesquisa";
import type { Veiculo } from "../../componentes/Pesquisa/DadosPesquisa";

import "./publicPagesStyles/Frota.css";

import carImage from "../../../public/images/blackCarBackgound.jpg";
import { IoCarSport } from "react-icons/io5";

function Frota() {
  const [veiculosFiltrados, setVeiculosFiltrados] =
    useState<Veiculo[]>(veiculos);

  return (
    <div className="pagina">
      <Header />

      <main className="conteudo">
        <section className="hero">
          <img
            className="hero-img"
            src={carImage}
            alt="Carro da GoDrive"
          />

          <div className="hero-overlay" />

          <div className="hero-topbar">
            <PesquisaVeiculos onSearch={setVeiculosFiltrados} />
          </div>
        </section>

        <section className="listagem-frota" id="frota-resultados">
          {veiculosFiltrados.length > 0 ? (
            <FrotaCarros veiculos={veiculosFiltrados} />
          ) : (
            <div className="sem-c">
              <h2>
                Nenhum veículo disponível para o período selecionado.
              </h2>

              <IoCarSport className="iconeCarro" />
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Frota;