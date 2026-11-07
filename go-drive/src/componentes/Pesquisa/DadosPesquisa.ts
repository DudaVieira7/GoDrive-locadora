export type StatusVeiculo =
  | "Disponível"
  | "Em manutenção";

export type StatusLocacao =
  | "Reservada"
  | "Ativa"
  | "Finalizada"
  | "Cancelada";

export interface Veiculo {
  id: number;
  marca: string;
  modelo: string;
  categoria: string;
  ano: number;
  combustivel: string;
  quilometragem: number;
  precoDiaria: number;
  src: string;
  status: StatusVeiculo;
}

export interface LocacaoVeiculo {
  id: number;
  veiculoId: number;
  dataRetirada: string;
  horaRetirada: string;
  dataDevolucao: string;
  horaDevolucao: string;
  status: StatusLocacao;
}

export interface ReservaPesquisa {
  dataRetirada: string;
  horaRetirada: string;
  dataDevolucao: string;
  horaDevolucao: string;
}

// Mantenha aqui os seus 30 veículos.
// Acrescente a propriedade status em cada objeto.
// Exemplo:
export const veiculos: Veiculo[] = [
  {
    id: 1,
    marca: "Fiat",
    modelo: "Argo",
    categoria: "Econômico",
    ano: 2023,
    combustivel: "Flex",
    quilometragem: 32000,
    precoDiaria: 110,
    src: "/images/CategoriasVeiculos/Economicos/argo.png",
    status: "Disponível",
  },
  {
    id: 2,
    marca: "Hyundai",
    modelo: "HB20",
    categoria: "Econômico",
    ano: 2023,
    combustivel: "Flex",
    quilometragem: 28000,
    precoDiaria: 115,
    src: "/images/CategoriasVeiculos/Economicos/hb20.png",
    status: "Disponível",
  },
  {
    id: 3,
    marca: "Fiat",
    modelo: "Mobi",
    categoria: "Econômico",
    ano: 2023,
    combustivel: "Flex",
    quilometragem: 25000,
    precoDiaria: 95,
    src: "/images/CategoriasVeiculos/Economicos/mobi.png",
    status: "Disponível",
  },
  {
    id: 4,
    marca: "Chevrolet",
    modelo: "Onix",
    categoria: "Econômico",
    ano: 2024,
    combustivel: "Flex",
    quilometragem: 20000,
    precoDiaria: 120,
    src: "/images/CategoriasVeiculos/Economicos/onix.png",
    status: "Disponível",
  },
  {
    id: 5,
    marca: "Volkswagen",
    modelo: "Polo",
    categoria: "Econômico",
    ano: 2024,
    combustivel: "Flex",
    quilometragem: 18000,
    precoDiaria: 130,
    src: "/images/CategoriasVeiculos/Economicos/polo.png",
    status: "Disponível",
  },
  {
    id: 6,
    marca: "Renault",
    modelo: "Kwid",
    categoria: "Econômico",
    ano: 2023,
    combustivel: "Flex",
    quilometragem: 30000,
    precoDiaria: 90,
    src: "/images/CategoriasVeiculos/Economicos/RenaultKwid.png",
    status: "Disponível",
  },
  {
    id: 7,
    marca: "BMW",
    modelo: "320i",
    categoria: "Luxo",
    ano: 2024,
    combustivel: "Gasolina",
    quilometragem: 12000,
    precoDiaria: 450,
    src: "/images/CategoriasVeiculos/luxo/bmw.png",
    status: "Disponível",
  },
  {
    id: 8,
    marca: "Jeep",
    modelo: "Commander",
    categoria: "Luxo",
    ano: 2024,
    combustivel: "Diesel",
    quilometragem: 15000,
    precoDiaria: 380,
    src: "/images/CategoriasVeiculos/luxo/jeepComander.png",
    status: "Em manutenção",
  },
  {
    id: 9,
    marca: "Volvo",
    modelo: "XC60",
    categoria: "Luxo",
    ano: 2024,
    combustivel: "Híbrido",
    quilometragem: 10000,
    precoDiaria: 500,
    src: "/images/CategoriasVeiculos/luxo/volvo.png",
    status: "Disponível",
  },
  {
    id: 10,
    marca: "Mercedes-Benz",
    modelo: "C300",
    categoria: "Luxo",
    ano: 2024,
    combustivel: "Híbrido",
    quilometragem: 7000,
    precoDiaria: 600,
    src: "/images/CategoriasVeiculos/luxo/Mercedes-BenzC300.png",
    status: "Disponível",
  },
  {
    id: 11,
    marca: "Audi",
    modelo: "Q5",
    categoria: "Luxo",
    ano: 2024,
    combustivel: "Gasolina",
    quilometragem: 9000,
    precoDiaria: 650,
    src: "/images/CategoriasVeiculos/luxo/AudiQ5.png",
    status: "Disponível",
  },
  {
    id: 12,
    marca: "Porsche",
    modelo: "Macan",
    categoria: "Luxo",
    ano: 2024,
    combustivel: "Gasolina",
    quilometragem: 5000,
    precoDiaria: 1000,
    src: "/images/CategoriasVeiculos/luxo/PorscheMacan.png",
    status: "Disponível",
  },
  {
    id: 13,
    marca: "Fiat",
    modelo: "Strada",
    categoria: "Picape",
    ano: 2024,
    combustivel: "Flex",
    quilometragem: 12000,
    precoDiaria: 200,
    src: "/images/CategoriasVeiculos/Picapes/FiatStrada.png",
    status: "Disponível",
  },
  {
    id: 14,
    marca: "Volkswagen",
    modelo: "Saveiro",
    categoria: "Picape",
    ano: 2024,
    combustivel: "Flex",
    quilometragem: 15000,
    precoDiaria: 190,
    src: "/images/CategoriasVeiculos/Picapes/savero.png",
    status: "Disponível",
  },
  {
    id: 15,
    marca: "Chevrolet",
    modelo: "Montana",
    categoria: "Picape",
    ano: 2024,
    combustivel: "Flex",
    quilometragem: 10000,
    precoDiaria: 240,
    src: "/images/CategoriasVeiculos/Picapes/montana.png",
    status: "Disponível",
  },
  {
    id: 16,
    marca: "Fiat",
    modelo: "Toro",
    categoria: "Picape",
    ano: 2024,
    combustivel: "Flex",
    quilometragem: 9000,
    precoDiaria: 300,
    src: "/images/CategoriasVeiculos/Picapes/toro.png",
    status: "Disponível",
  },
  {
    id: 17,
    marca: "Toyota",
    modelo: "Hilux",
    categoria: "Picape",
    ano: 2024,
    combustivel: "Diesel",
    quilometragem: 11000,
    precoDiaria: 450,
    src: "/images/CategoriasVeiculos/Picapes/Hilux.png",
    status: "Disponível",
  },
  {
    id: 18,
    marca: "Ford",
    modelo: "Ranger",
    categoria: "Picape",
    ano: 2024,
    combustivel: "Diesel",
    quilometragem: 8000,
    precoDiaria: 480,
    src: "/images/CategoriasVeiculos/Picapes/Ranger.png",
    status: "Disponível",
  },
  {
    id: 19,
    marca: "Chevrolet",
    modelo: "Onix Plus",
    categoria: "Sedã",
    ano: 2024,
    combustivel: "Flex",
    quilometragem: 10000,
    precoDiaria: 170,
    src: "/images/CategoriasVeiculos/Sedans/OnixPlus.png",
    status: "Disponível",
  },
  {
    id: 20,
    marca: "Fiat",
    modelo: "Cronos",
    categoria: "Sedã",
    ano: 2024,
    combustivel: "Flex",
    quilometragem: 12000,
    precoDiaria: 165,
    src: "/images/CategoriasVeiculos/Sedans/cronos.png",
    status: "Disponível",
  },
  {
    id: 21,
    marca: "Volkswagen",
    modelo: "Virtus",
    categoria: "Sedã",
    ano: 2024,
    combustivel: "Flex",
    quilometragem: 9000,
    precoDiaria: 190,
    src: "/images/CategoriasVeiculos/Sedans/virtus.png",
    status: "Disponível",
  },
  {
    id: 22,
    marca: "Hyundai",
    modelo: "HB20S",
    categoria: "Sedã",
    ano: 2024,
    combustivel: "Flex",
    quilometragem: 11000,
    precoDiaria: 180,
    src: "/images/CategoriasVeiculos/Sedans/Hb20s.png",
    status: "Disponível",
  },
  {
    id: 23,
    marca: "Toyota",
    modelo: "Corolla",
    categoria: "Sedã",
    ano: 2024,
    combustivel: "Flex",
    quilometragem: 7000,
    precoDiaria: 300,
    src: "/images/CategoriasVeiculos/Sedans/corolla.png",
    status: "Disponível",
  },
  {
    id: 24,
    marca: "BYD",
    modelo: "King",
    categoria: "Sedã",
    ano: 2025,
    combustivel: "Híbrido",
    quilometragem: 5000,
    precoDiaria: 350,
    src: "/images/CategoriasVeiculos/Sedans/BYDKing.png",
    status: "Disponível",
  },
  {
    id: 25,
    marca: "Volkswagen",
    modelo: "T-Cross",
    categoria: "SUV",
    ano: 2024,
    combustivel: "Flex",
    quilometragem: 10000,
    precoDiaria: 250,
    src: "/images/CategoriasVeiculos/SUVs/VolkswagenT-Cross.png",
    status: "Disponível",
  },
  {
    id: 26,
    marca: "Hyundai",
    modelo: "Creta",
    categoria: "SUV",
    ano: 2024,
    combustivel: "Flex",
    quilometragem: 9000,
    precoDiaria: 260,
    src: "/images/CategoriasVeiculos/SUVs/creta_comfort_7-8_branco-atlas (1).webp",
    status: "Disponível",
  },
  {
    id: 27,
    marca: "Jeep",
    modelo: "Compass",
    categoria: "SUV",
    ano: 2024,
    combustivel: "Flex",
    quilometragem: 8000,
    precoDiaria: 350,
    src: "/images/CategoriasVeiculos/SUVs/compass.png",
    status: "Disponível",
  },
  {
    id: 28,
    marca: "Honda",
    modelo: "HR-V",
    categoria: "SUV",
    ano: 2024,
    combustivel: "Flex",
    quilometragem: 11000,
    precoDiaria: 280,
    src: "/images/CategoriasVeiculos/SUVs/HondaHR-V.png",
    status: "Disponível",
  },
  {
    id: 29,
    marca: "Toyota",
    modelo: "Corolla Cross",
    categoria: "SUV",
    ano: 2024,
    combustivel: "Flex",
    quilometragem: 7000,
    precoDiaria: 380,
    src: "/images/CategoriasVeiculos/SUVs/cross.png",
    status: "Disponível",
  },
  {
    id: 30,
    marca: "Jeep",
    modelo: "Commander",
    categoria: "SUV",
    ano: 2024,
    combustivel: "Diesel",
    quilometragem: 6000,
    precoDiaria: 450,
    src: "/images/CategoriasVeiculos/SUVs/commander.png",
    status: "Disponível",
  },
];

// Dados fictícios para testar conflitos de datas.
// Em produção, essas informações virão do banco de dados.
export const locacoes: LocacaoVeiculo[] = [
  {
    id: 1,
    veiculoId: 5,
    dataRetirada: "2026-11-10",
    horaRetirada: "10:00",
    dataDevolucao: "2026-11-15",
    horaDevolucao: "10:00",
    status: "Ativa",
  },
  {
    id: 2,
    veiculoId: 12,
    dataRetirada: "2026-11-12",
    horaRetirada: "08:00",
    dataDevolucao: "2026-11-18",
    horaDevolucao: "18:00",
    status: "Reservada",
  },
  {
    id: 3,
    veiculoId: 20,
    dataRetirada: "2026-11-05",
    horaRetirada: "09:00",
    dataDevolucao: "2026-11-08",
    horaDevolucao: "09:00",
    status: "Finalizada",
  },
];

// Converte data e horário em uma data comparável.
function converterData(data: string, hora: string) {
  return new Date(`${data}T${hora}:00`).getTime();
}

// Verifica se o veículo está livre no período solicitado.
export function verificarDisponibilidade(
  veiculo: Veiculo,
  reserva: ReservaPesquisa
): boolean {
  if (veiculo.status !== "Disponível") {
    return false;
  }

  const inicioPesquisa = converterData(
    reserva.dataRetirada,
    reserva.horaRetirada
  );

  const fimPesquisa = converterData(
    reserva.dataDevolucao,
    reserva.horaDevolucao
  );

  const possuiConflito = locacoes.some((locacao) => {
    if (locacao.veiculoId !== veiculo.id) {
      return false;
    }

    // Reservas canceladas e locações finalizadas não bloqueiam datas.
    if (
      locacao.status === "Cancelada" ||
      locacao.status === "Finalizada"
    ) {
      return false;
    }

    const inicioLocacao = converterData(
      locacao.dataRetirada,
      locacao.horaRetirada
    );

    const fimLocacao = converterData(
      locacao.dataDevolucao,
      locacao.horaDevolucao
    );

    // Existe conflito quando os períodos se sobrepõem.
    return (
      inicioPesquisa < fimLocacao &&
      fimPesquisa > inicioLocacao
    );
  });

  return !possuiConflito;
}