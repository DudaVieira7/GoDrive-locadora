import { useState } from "react";
import type { ReservaPesquisa } from "../DadosPesquisa";

import "./DadosReserva.css";

interface DadosReservaProps {
  onBuscar: (dados: ReservaPesquisa | null) => void;
  onConfirmarBusca?: () => void;
}

type Campos = ReservaPesquisa;

interface Resultado {
  dados: ReservaPesquisa | null;
  erro: string;
  incompleto: boolean;
}

function validarPeriodo(campos: Campos): Resultado {
  const { dataRetirada, horaRetirada, dataDevolucao, horaDevolucao } = campos;

  if (!dataRetirada || !horaRetirada || !dataDevolucao || !horaDevolucao) {
    return {
      dados: null,
      incompleto: true,
      erro: "Informe as datas e os horários de retirada e devolução.",
    };
  }

  const inicio = new Date(`${dataRetirada}T${horaRetirada}:00`).getTime();
  const fim = new Date(`${dataDevolucao}T${horaDevolucao}:00`).getTime();

  if (inicio < Date.now()) {
    return {
      dados: null,
      incompleto: false,
      erro: "A retirada não pode estar no passado.",
    };
  }

  if (fim <= inicio) {
    return {
      dados: null,
      incompleto: false,
      erro: "A devolução deve ser posterior à retirada.",
    };
  }

  return { dados: { ...campos }, incompleto: false, erro: "" };
}

function DadosReserva({ onBuscar, onConfirmarBusca }: DadosReservaProps) {
  const [campos, setCampos] = useState<Campos>({
    dataRetirada: "",
    horaRetirada: "10:00",
    dataDevolucao: "",
    horaDevolucao: "10:00",
  });

  const [erro, setErro] = useState("");
  const hoje = new Date().toLocaleDateString("en-CA");

  function atualizarCampo(campo: keyof Campos, valor: string) {
    setCampos((prev) => ({ ...prev, [campo]: valor }));
    if (erro) setErro("");
  }

  function handleBuscar() {
    const r = validarPeriodo(campos);

    setErro(r.erro);

    // Período inválido (null) também é enviado: assim a lista antiga some.
    onBuscar(r.dados);

    if (r.dados) {
      onConfirmarBusca?.();
    }
  }

  return (
    <>
      <div className="dados-reserva">
        <div className="campo-reserva">
          <label htmlFor="data-retirada">Retirada</label>
          <input
            id="data-retirada"
            type="date"
            min={hoje}
            value={campos.dataRetirada}
            onChange={(e) => atualizarCampo("dataRetirada", e.target.value)}
          />
          <input
            type="time"
            aria-label="Horário de retirada"
            value={campos.horaRetirada}
            onChange={(e) => atualizarCampo("horaRetirada", e.target.value)}
          />
        </div>

        <div className="campo-reserva">
          <label htmlFor="data-devolucao">Devolução</label>
          <input
            id="data-devolucao"
            type="date"
            min={campos.dataRetirada || hoje}
            value={campos.dataDevolucao}
            onChange={(e) => atualizarCampo("dataDevolucao", e.target.value)}
          />
          <input
            type="time"
            aria-label="Horário de devolução"
            value={campos.horaDevolucao}
            onChange={(e) => atualizarCampo("horaDevolucao", e.target.value)}
          />
        </div>

        <button
          type="button"
          className="btn-buscar-reserva"
          onClick={handleBuscar}
        >
          Buscar veículos
        </button>
      </div>

      {erro && (
        <p className="erro-reserva" role="alert">
          {erro}
        </p>
      )}
    </>
  );
}

export default DadosReserva;