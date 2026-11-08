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

// Data (AAAA-MM-DD) e hora (HH:MM) atuais no fuso do usuário.
function obterAgora() {
  const agora = new Date();

  return {
    data: agora.toLocaleDateString("en-CA"),
    hora: agora.toTimeString().slice(0, 5),
  };
}

function validarPeriodo(campos: Campos): Resultado {
  const {
    dataRetirada,
    horaRetirada,
    dataDevolucao,
    horaDevolucao,
  } = campos;

  if (!dataRetirada || !horaRetirada || !dataDevolucao || !horaDevolucao) {
    return {
      dados: null,
      incompleto: true,
      erro: "Informe as datas e os horários de retirada e devolução.",
    };
  }

  const inicio = new Date(`${dataRetirada}T${horaRetirada}:00`).getTime();
  const fim = new Date(`${dataDevolucao}T${horaDevolucao}:00`).getTime();

  // Ignora os segundos: retirar "agora" (no minuto atual) é permitido.
  const agoraSemSegundos = new Date();
  agoraSemSegundos.setSeconds(0, 0);

  if (inicio < agoraSemSegundos.getTime()) {
    const { data, hora } = obterAgora();

    return {
      dados: null,
      incompleto: false,
      erro:
        dataRetirada === data
          ? `Para retirada hoje, escolha um horário a partir de ${hora}.`
          : "A retirada não pode estar no passado.",
    };
  }

  if (fim <= inicio) {
    return {
      dados: null,
      incompleto: false,
      erro: "A devolução deve ser posterior à retirada.",
    };
  }

  return {
    dados: { ...campos },
    incompleto: false,
    erro: "",
  };
}

function DadosReserva({
  onBuscar,
  onConfirmarBusca,
}: DadosReservaProps) {
  const [campos, setCampos] = useState<Campos>({
    dataRetirada: "",
    horaRetirada: "10:00",
    dataDevolucao: "",
    horaDevolucao: "10:00",
  });

  const [erro, setErro] = useState("");

  const { data: hoje, hora: horaAtual } = obterAgora();

  function atualizarCampo(campo: keyof Campos, valor: string) {
    setCampos((prev) => {
      const novo = { ...prev, [campo]: valor };

      // Se escolheu HOJE e o horário padrão (10:00) já passou,
      // ajusta automaticamente a hora de retirada para a hora atual.
      if (
        campo === "dataRetirada" &&
        valor === hoje &&
        novo.horaRetirada < horaAtual
      ) {
        novo.horaRetirada = horaAtual;
      }

      return novo;
    });

    if (erro) setErro("");
  }

  // Abre o calendário nativo do navegador
  function abrirCalendario(
    e: React.MouseEvent<HTMLInputElement>
  ) {
    e.currentTarget.showPicker();
  }

  function handleBuscar() {
    const r = validarPeriodo(campos);

    setErro(r.erro);

    // Envia null quando o período é inválido.
    onBuscar(r.dados);

    if (r.dados) {
      onConfirmarBusca?.();
    }
  }

  return (
    <>
      <div className="dados-reserva">

        {/* Retirada */}
        <div className="campo-reserva">
          <label htmlFor="data-retirada">
            Retirada
          </label>

          <input
            id="data-retirada"
            type="date"
            min={hoje}
            value={campos.dataRetirada}
            onChange={(e) =>
              atualizarCampo("dataRetirada", e.target.value)
            }
            onClick={abrirCalendario}
          />

          <input
            type="time"
            aria-label="Horário de retirada"
            min={campos.dataRetirada === hoje ? horaAtual : undefined}
            value={campos.horaRetirada}
            onChange={(e) =>
              atualizarCampo("horaRetirada", e.target.value)
            }
          />
        </div>

        {/* Devolução */}
        <div className="campo-reserva">
          <label htmlFor="data-devolucao">
            Devolução
          </label>

          <input
            id="data-devolucao"
            type="date"
            min={campos.dataRetirada || hoje}
            value={campos.dataDevolucao}
            onChange={(e) =>
              atualizarCampo("dataDevolucao", e.target.value)
            }
            onClick={abrirCalendario}
          />

          <input
            type="time"
            aria-label="Horário de devolução"
            value={campos.horaDevolucao}
            onChange={(e) =>
              atualizarCampo("horaDevolucao", e.target.value)
            }
          />
        </div>

        {/* Botão de busca */}
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