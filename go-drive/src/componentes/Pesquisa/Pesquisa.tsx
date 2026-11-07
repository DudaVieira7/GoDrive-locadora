import { useEffect, useMemo, useRef, useState } from "react";
import { IoSearchOutline, IoFilter } from "react-icons/io5";

import { veiculos, verificarDisponibilidade } from "./DadosPesquisa";
import type { Veiculo, ReservaPesquisa } from "./DadosPesquisa";

import DadosReserva from "./DadosReserva/DadosReserva";

import "./Pesquisa.css";

interface PesquisaVeiculosProps {
  // id do elemento da página onde ficam os carros (para rolar até ele).
  idResultados?: string;

  onSearch?: (resultado: Veiculo[]) => void;
  onReservationSearch?: (
    dados: ReservaPesquisa,
    resultado: Veiculo[]
  ) => void;
}

function normalizarTexto(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function PesquisaVeiculos({
  idResultados = "frota-resultados",
  onSearch,
  onReservationSearch,
}: PesquisaVeiculosProps) {
  const [textoPesquisa, setTextoPesquisa] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precoMaximo, setPrecoMaximo] = useState("");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const [periodoPesquisado, setPeriodoPesquisado] =
    useState<ReservaPesquisa | null>(null);

  const [resetReserva, setResetReserva] = useState(0);

  // Cruza texto + categoria + preço + disponibilidade no período.
  const resultados = useMemo(() => {
    const textoNormalizado = normalizarTexto(textoPesquisa);

    return veiculos.filter((veiculo) => {
      const dadosVeiculo = normalizarTexto(
        `${veiculo.marca} ${veiculo.modelo} ${veiculo.categoria}`
      );

      const correspondePesquisa = dadosVeiculo.includes(textoNormalizado);

      const correspondeCategoria =
        categoria === "" ||
        normalizarTexto(veiculo.categoria) === normalizarTexto(categoria);

      const correspondePreco =
        precoMaximo === "" || veiculo.precoDiaria <= Number(precoMaximo);

      const correspondeDisponibilidade =
        !periodoPesquisado ||
        verificarDisponibilidade(veiculo, periodoPesquisado);

      return (
        correspondePesquisa &&
        correspondeCategoria &&
        correspondePreco &&
        correspondeDisponibilidade
      );
    });
  }, [textoPesquisa, categoria, precoMaximo, periodoPesquisado]);

  const onSearchRef = useRef(onSearch);
  onSearchRef.current = onSearch;
  const onReservationSearchRef = useRef(onReservationSearch);
  onReservationSearchRef.current = onReservationSearch;

  // Envia o resultado ao pai sempre que ele mudar.
  useEffect(() => {
    onSearchRef.current?.(resultados);

    if (periodoPesquisado) {
      onReservationSearchRef.current?.(periodoPesquisado, resultados);
    }
  }, [resultados, periodoPesquisado]);

  // Ao clicar em "Buscar veículos", leva o cliente até os carros disponíveis.
  function rolarParaResultados() {
    setTimeout(() => {
      document
        .getElementById(idResultados)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  function limparPeriodo() {
    setPeriodoPesquisado(null);
    setResetReserva((n) => n + 1);
  }

  function limparFiltros() {
    setCategoria("");
    setPrecoMaximo("");
  }

  return (
    <section className="pesquisa-container">
      <div className="pesquisa-barra">
        <div className="pesquisa-campo">
          <input
            type="text"
            placeholder="Qual carro você está procurando?"
            value={textoPesquisa}
            onChange={(e) => setTextoPesquisa(e.target.value)}
          />
          <IoSearchOutline className="pesquisa-icone" />
        </div>

        <button
          className="pesquisa-botao-filtro"
          type="button"
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
          aria-expanded={mostrarFiltros}
        >
          Filtrar veículos
          <IoFilter />
        </button>
      </div>

      {mostrarFiltros && (
        <div className="pesquisa-painel-filtros">
          <h3>Filtrar veículos</h3>

          <div className="pesquisa-campo-filtro">
            <label htmlFor="categoria-veiculo">Categoria</label>
            <select
              id="categoria-veiculo"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Todas as categorias</option>
              <option value="Econômico">Econômicos</option>
              <option value="Luxo">Luxo</option>
              <option value="Picape">Picapes</option>
              <option value="Sedã">Sedãs</option>
              <option value="SUV">SUVs</option>
            </select>
          </div>

          <div className="pesquisa-campo-filtro">
            <label htmlFor="preco-maximo">Preço máximo por diária</label>
            <input
              id="preco-maximo"
              type="number"
              min="0"
              placeholder="Ex.: 300"
              value={precoMaximo}
              onChange={(e) => setPrecoMaximo(e.target.value)}
            />
          </div>

          <button
            className="pesquisa-botao-limpar"
            type="button"
            onClick={limparFiltros}
          >
            Limpar filtros
          </button>
        </div>
      )}

      <DadosReserva
        key={resetReserva}
        onBuscar={setPeriodoPesquisado}
        onConfirmarBusca={rolarParaResultados}
      />

      {periodoPesquisado && (
        <p className="pesquisa-resumo">
          {resultados.length === 0
            ? "Nenhum veículo disponível para o período."
            : `${resultados.length} veículo(s) disponível(is) de ${periodoPesquisado.dataRetirada} às ${periodoPesquisado.horaRetirada} até ${periodoPesquisado.dataDevolucao} às ${periodoPesquisado.horaDevolucao}.`}{" "}
          <button
            type="button"
            className="pesquisa-botao-periodo"
            onClick={limparPeriodo}
          >
            Mostrar toda a frota
          </button>
        </p>
      )}
    </section>
  );
}

export default PesquisaVeiculos;