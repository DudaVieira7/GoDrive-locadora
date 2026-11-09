import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";

import Header from "../../../componentes/Header/Header";
import Button from "../../../componentes/Button/Button";

import {
  veiculos,
  getNomeMarca,
  getNomeCategoria,
} from "../../../componentes/Pesquisa/DadosPesquisa";

import "./Alugar.css";


interface Periodo {
  dataRetirada: string;
  horaRetirada: string;
  dataDevolucao: string;
  horaDevolucao: string;
}

// Data no formato AAAA-MM-DD (fuso do usuário), somando "dias" à data de hoje.
function dataEm(dias: number) {
  const d = new Date();
  d.setDate(d.getDate() + dias);
  return d.toLocaleDateString("en-CA");
}

// Quantidade de diárias (mínimo 1, arredonda para cima).
function calcularDiarias(p: Periodo) {
  const inicio = new Date(`${p.dataRetirada}T${p.horaRetirada}:00`).getTime();
  const fim = new Date(`${p.dataDevolucao}T${p.horaDevolucao}:00`).getTime();

  if (Number.isNaN(inicio) || Number.isNaN(fim) || fim <= inicio) return 1;

  return Math.max(1, Math.ceil((fim - inicio) / (1000 * 60 * 60 * 24)));
}

const moeda = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function Alugar() {
 
  const { id } = useParams();

  const veiculo = useMemo(
    () => veiculos.find((v) => String(v.id_carro) === id) ?? veiculos[0],
    [id]
  );

  const hoje = dataEm(0);

  const [localRetirada, setLocalRetirada] = useState("Porto");
  const [outroDestino, setOutroDestino] = useState(false);
  const [localDevolucao, setLocalDevolucao] = useState("");

  const [campos, setCampos] = useState<Periodo>({
    dataRetirada: hoje,
    horaRetirada: "10:00",
    dataDevolucao: dataEm(7),
    horaDevolucao: "10:00",
  });

  
  const [periodo, setPeriodo] = useState<Periodo>(campos);
  const [erro, setErro] = useState("");

  function atualizarCampo(campo: keyof Periodo, valor: string) {
    setCampos((prev) => ({ ...prev, [campo]: valor }));
    if (erro) setErro("");
  }

  function aplicar() {
    const inicio = new Date(
      `${campos.dataRetirada}T${campos.horaRetirada}:00`
    ).getTime();
    const fim = new Date(
      `${campos.dataDevolucao}T${campos.horaDevolucao}:00`
    ).getTime();

    if (
      !campos.dataRetirada ||
      !campos.dataDevolucao ||
      Number.isNaN(inicio) ||
      Number.isNaN(fim)
    ) {
      setErro("Informe as datas e os horários.");
      return;
    }

    if (fim <= inicio) {
      setErro("A devolução deve ser posterior à retirada.");
      return;
    }

    setErro("");
    setPeriodo({ ...campos });
  }

  function alugar() {
    
    console.log("Reserva", {
      veiculo: veiculo?.id_carro,
      localRetirada,
      localDevolucao: outroDestino ? localDevolucao : localRetirada,
      ...periodo,
    });
  }

  if (!veiculo) {
    return (
      <div className="alugar-pagina">
        <Header />
        <p className="alugar-vazio">Veículo não encontrado.</p>
      </div>
    );
  }

  const diarias = calcularDiarias(periodo);
  const total = diarias * veiculo.preco_diaria;
  const marca = getNomeMarca(veiculo.fk_id_marca);

  return (
    <div className="alugar-pagina">
      <Header />

      <main className="alugar-conteudo">
        
        <aside className="alugar-card">
          <h2>Aluguel de carros</h2>

          <div className="alugar-caixa alugar-caixa--local">
            <div className="alugar-caixa-texto">
              <label htmlFor="local-retirada">local de retirada</label>
              <input
                id="local-retirada"
                type="text"
                value={localRetirada}
                onChange={(e) => setLocalRetirada(e.target.value)}
              />
            </div>
            <IoLocationSharp className="alugar-pin" />
          </div>

          <label className="alugar-toggle">
            <input
              type="checkbox"
              checked={outroDestino}
              onChange={(e) => setOutroDestino(e.target.checked)}
            />
            <span className="alugar-toggle-trilho" aria-hidden="true" />
            <span className="alugar-toggle-texto">devolver em outro destino</span>
          </label>

          {outroDestino && (
            <div className="alugar-caixa alugar-caixa--local">
              <div className="alugar-caixa-texto">
                <label htmlFor="local-devolucao">local de devolução</label>
                <input
                  id="local-devolucao"
                  type="text"
                  placeholder="Digite o local"
                  value={localDevolucao}
                  onChange={(e) => setLocalDevolucao(e.target.value)}
                />
              </div>
              <IoLocationSharp className="alugar-pin" />
            </div>
          )}

          <div className="alugar-linha">
            <div className="alugar-caixa alugar-caixa--data">
              <label htmlFor="data-retirada">data retirado</label>
              <input
                id="data-retirada"
                type="date"
                min={hoje}
                value={campos.dataRetirada}
                onChange={(e) => atualizarCampo("dataRetirada", e.target.value)}
              />
            </div>

            <div className="alugar-caixa alugar-caixa--hora">
              <label htmlFor="hora-retirada">horário retirada</label>
              <input
                id="hora-retirada"
                type="time"
                value={campos.horaRetirada}
                onChange={(e) => atualizarCampo("horaRetirada", e.target.value)}
              />
            </div>
          </div>

          <div className="alugar-linha">
            <div className="alugar-caixa alugar-caixa--data">
              <label htmlFor="data-devolucao">data devolução</label>
              <input
                id="data-devolucao"
                type="date"
                min={campos.dataRetirada || hoje}
                value={campos.dataDevolucao}
                onChange={(e) => atualizarCampo("dataDevolucao", e.target.value)}
              />
            </div>

            <div className="alugar-caixa alugar-caixa--hora">
              <label htmlFor="hora-devolucao">horário devolução</label>
              <input
                id="hora-devolucao"
                type="time"
                value={campos.horaDevolucao}
                onChange={(e) => atualizarCampo("horaDevolucao", e.target.value)}
              />
            </div>
          </div>

          {erro && (
            <p className="alugar-erro" role="alert">
              {erro}
            </p>
          )}

          <Button
            type="button"
            onClick={aplicar}
            width="100%"
            height="54px"
            padding="0"
            borderRadius="10px"
            fontSize="16px"
            fontWeight="700"
          >
            Aplicar
          </Button>
        </aside>

        {/* ===== Lado direito: carro ===== */}
        
        <section className="alugar-detalhes">
          <div className="alugar-topo">
            <div className="alugar-imagem">
              <img src={veiculo.src} alt={`${marca} ${veiculo.modelo}`} />
            </div>

            <div className="alugar-resumo">
              <h1>
                {marca} {veiculo.modelo}
              </h1>

              <div className="alugar-precos">
                <p>Preço por dia</p>
                <strong>{moeda(veiculo.preco_diaria)}</strong>
                <p>
                  Preço total por{" "}
                  <span>
                    {diarias} {diarias === 1 ? "dia" : "dias"} {moeda(total)}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="alugar-base">
            <div className="alugar-descricao">
              <h3>descrição detalhada do veículo</h3>

              <ul>
                <li>{marca}</li>
                <li>{veiculo.modelo}</li>
                <li>Categoria: {getNomeCategoria(veiculo.fk_categoria)}</li>
                <li>Ano: {veiculo.ano_modelo}</li>
                <li>Combustível: {veiculo.tipo_combustivel}</li>
                <li>
                  Quilometragem: {veiculo.quilometragem.toLocaleString("pt-BR")}{" "}
                  km
                </li>
              </ul>
            </div>

            <Button
              type="button"
              onClick={alugar}
              width="100%"
              height="75px"
              padding="0"
              borderRadius="14px"
              fontSize="16px"
              fontWeight="700"
            >
              alugar
            </Button>
          </div>
        </section>
      </main>
      
    </div>
  );
}

export default Alugar;