// ============================================================
// TIPOS
// ============================================================

export type StatusVeiculo = "Disponível" | "Alugado" | "Em manutenção";

export type Transmissao = "Manual" | "Automático";

export type TipoCombustivel = "Flex" | "Gasolina" | "Diesel" | "Híbrido";

export type StatusLocacao = "Reservada" | "Ativa" | "Finalizada" | "Cancelada";

// Tabela: marca
export interface Marca {
  id_marca: number;
  nome: string;
}

// Tabela: categoria
export interface Categoria {
  id_categoria: number;
  nome: string;
}

// Tabela: carro (mesmos atributos que você vai criar no banco)
export interface Veiculo {
  id_carro: number;
  fk_id_marca: number;
  fk_categoria: number;
  modelo: string;
  placa: string;
  quilometragem: number;
  ano_modelo: number;
  cor: string;
  transmissao: Transmissao;
  numero_portas: number;
  tipo_combustivel: TipoCombustivel;
  status_veiculo: StatusVeiculo;

  // Campos temporários do front-end (não fazem parte da tabela carro).
  // Quando tiver o banco, o preço pode vir da categoria/tabela de preços
  // e a imagem de uma tabela de imagens.
  preco_diaria: number;
  src: string;
}

export interface LocacaoVeiculo {
  id: number;
  veiculoId: number; // referencia Veiculo.id_carro
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

// ============================================================
// DADOS: MARCAS E CATEGORIAS
// ============================================================

export const marcas: Marca[] = [
  { id_marca: 1, nome: "Fiat" },
  { id_marca: 2, nome: "Hyundai" },
  { id_marca: 3, nome: "Chevrolet" },
  { id_marca: 4, nome: "Volkswagen" },
  { id_marca: 5, nome: "Renault" },
  { id_marca: 6, nome: "BMW" },
  { id_marca: 7, nome: "Jeep" },
  { id_marca: 8, nome: "Volvo" },
  { id_marca: 9, nome: "Mercedes-Benz" },
  { id_marca: 10, nome: "Audi" },
  { id_marca: 11, nome: "Porsche" },
  { id_marca: 12, nome: "Toyota" },
  { id_marca: 13, nome: "Ford" },
  { id_marca: 14, nome: "BYD" },
  { id_marca: 15, nome: "Honda" },
];

export const categorias: Categoria[] = [
  { id_categoria: 1, nome: "Econômico" },
  { id_categoria: 2, nome: "Luxo" },
  { id_categoria: 3, nome: "Picape" },
  { id_categoria: 4, nome: "Sedã" },
  { id_categoria: 5, nome: "SUV" },
];

// Funções auxiliares (substituem os antigos campos "marca" e "categoria").
export function getNomeMarca(fk_id_marca: number): string {
  return marcas.find((m) => m.id_marca === fk_id_marca)?.nome ?? "";
}

export function getNomeCategoria(fk_categoria: number): string {
  return categorias.find((c) => c.id_categoria === fk_categoria)?.nome ?? "";
}

// ============================================================
// DADOS: VEÍCULOS (placas fictícias)
// ============================================================

export const veiculos: Veiculo[] = [
  // ---------- Econômicos (categoria 1) ----------
  {
    id_carro: 1, fk_id_marca: 1, fk_categoria: 1, modelo: "Argo",
    placa: "ABC1D23", quilometragem: 32000, ano_modelo: 2023, cor: "Branco",
    transmissao: "Manual", numero_portas: 5, tipo_combustivel: "Flex",
    status_veiculo: "Disponível", preco_diaria: 110,
    src: "/images/CategoriasVeiculos/Economicos/argo.png",
  },
  {
    id_carro: 2, fk_id_marca: 2, fk_categoria: 1, modelo: "HB20",
    placa: "BCD2E34", quilometragem: 28000, ano_modelo: 2023, cor: "Prata",
    transmissao: "Manual", numero_portas: 5, tipo_combustivel: "Flex",
    status_veiculo: "Disponível", preco_diaria: 115,
    src: "/images/CategoriasVeiculos/Economicos/hb20.png",
  },
  {
    id_carro: 3, fk_id_marca: 1, fk_categoria: 1, modelo: "Mobi",
    placa: "CDE3F45", quilometragem: 25000, ano_modelo: 2023, cor: "Vermelho",
    transmissao: "Manual", numero_portas: 5, tipo_combustivel: "Flex",
    status_veiculo: "Disponível", preco_diaria: 95,
    src: "/images/CategoriasVeiculos/Economicos/mobi.png",
  },
  {
    id_carro: 4, fk_id_marca: 3, fk_categoria: 1, modelo: "Onix",
    placa: "DEF4G56", quilometragem: 20000, ano_modelo: 2024, cor: "Preto",
    transmissao: "Manual", numero_portas: 5, tipo_combustivel: "Flex",
    status_veiculo: "Disponível", preco_diaria: 120,
    src: "/images/CategoriasVeiculos/Economicos/onix.png",
  },
  {
    id_carro: 5, fk_id_marca: 4, fk_categoria: 1, modelo: "Polo",
    placa: "EFG5H67", quilometragem: 18000, ano_modelo: 2024, cor: "Cinza",
    transmissao: "Automático", numero_portas: 5, tipo_combustivel: "Flex",
    status_veiculo: "Disponível", preco_diaria: 130,
    src: "/images/CategoriasVeiculos/Economicos/polo.png",
  },
  {
    id_carro: 6, fk_id_marca: 5, fk_categoria: 1, modelo: "Kwid",
    placa: "FGH6I78", quilometragem: 30000, ano_modelo: 2023, cor: "Laranja",
    transmissao: "Manual", numero_portas: 5, tipo_combustivel: "Flex",
    status_veiculo: "Alugado", preco_diaria: 90,
    src: "/images/CategoriasVeiculos/Economicos/RenaultKwid.png",
  },

  // ---------- Luxo (categoria 2) ----------
  {
    id_carro: 7, fk_id_marca: 6, fk_categoria: 2, modelo: "320i",
    placa: "GHI7J89", quilometragem: 12000, ano_modelo: 2024, cor: "Preto",
    transmissao: "Automático", numero_portas: 4, tipo_combustivel: "Gasolina",
    status_veiculo: "Disponível", preco_diaria: 450,
    src: "/images/CategoriasVeiculos/luxo/bmw.png",
  },
  {
    id_carro: 8, fk_id_marca: 7, fk_categoria: 2, modelo: "Commander",
    placa: "HIJ8K90", quilometragem: 15000, ano_modelo: 2024, cor: "Cinza",
    transmissao: "Automático", numero_portas: 5, tipo_combustivel: "Diesel",
    status_veiculo: "Em manutenção", preco_diaria: 380,
    src: "/images/CategoriasVeiculos/luxo/jeepComander.png",
  },
  {
    id_carro: 9, fk_id_marca: 8, fk_categoria: 2, modelo: "XC60",
    placa: "IJK9L01", quilometragem: 10000, ano_modelo: 2024, cor: "Branco",
    transmissao: "Automático", numero_portas: 5, tipo_combustivel: "Híbrido",
    status_veiculo: "Disponível", preco_diaria: 500,
    src: "/images/CategoriasVeiculos/luxo/volvo.png",
  },
  {
    id_carro: 10, fk_id_marca: 9, fk_categoria: 2, modelo: "C300",
    placa: "JKL0M12", quilometragem: 7000, ano_modelo: 2024, cor: "Prata",
    transmissao: "Automático", numero_portas: 4, tipo_combustivel: "Híbrido",
    status_veiculo: "Disponível", preco_diaria: 600,
    src: "/images/CategoriasVeiculos/luxo/Mercedes-BenzC300.png",
  },
  {
    id_carro: 11, fk_id_marca: 10, fk_categoria: 2, modelo: "Q5",
    placa: "KLM1N23", quilometragem: 9000, ano_modelo: 2024, cor: "Azul",
    transmissao: "Automático", numero_portas: 5, tipo_combustivel: "Gasolina",
    status_veiculo: "Disponível", preco_diaria: 650,
    src: "/images/CategoriasVeiculos/luxo/AudiQ5.png",
  },
  {
    id_carro: 12, fk_id_marca: 11, fk_categoria: 2, modelo: "Macan",
    placa: "LMN2O34", quilometragem: 5000, ano_modelo: 2024, cor: "Preto",
    transmissao: "Automático", numero_portas: 5, tipo_combustivel: "Gasolina",
    status_veiculo: "Disponível", preco_diaria: 1000,
    src: "/images/CategoriasVeiculos/luxo/PorscheMacan.png",
  },

  // ---------- Picapes (categoria 3) ----------
  {
    id_carro: 13, fk_id_marca: 1, fk_categoria: 3, modelo: "Strada",
    placa: "MNO3P45", quilometragem: 12000, ano_modelo: 2024, cor: "Branco",
    transmissao: "Manual", numero_portas: 2, tipo_combustivel: "Flex",
    status_veiculo: "Disponível", preco_diaria: 200,
    src: "/images/CategoriasVeiculos/Picapes/FiatStrada.png",
  },
  {
    id_carro: 14, fk_id_marca: 4, fk_categoria: 3, modelo: "Saveiro",
    placa: "NOP4Q56", quilometragem: 15000, ano_modelo: 2024, cor: "Prata",
    transmissao: "Manual", numero_portas: 2, tipo_combustivel: "Flex",
    status_veiculo: "Disponível", preco_diaria: 190,
    src: "/images/CategoriasVeiculos/Picapes/savero.png",
  },
  {
    id_carro: 15, fk_id_marca: 3, fk_categoria: 3, modelo: "Montana",
    placa: "OPQ5R67", quilometragem: 10000, ano_modelo: 2024, cor: "Vermelho",
    transmissao: "Automático", numero_portas: 4, tipo_combustivel: "Flex",
    status_veiculo: "Disponível", preco_diaria: 240,
    src: "/images/CategoriasVeiculos/Picapes/montana.png",
  },
  {
    id_carro: 16, fk_id_marca: 1, fk_categoria: 3, modelo: "Toro",
    placa: "PQR6S78", quilometragem: 9000, ano_modelo: 2024, cor: "Cinza",
    transmissao: "Automático", numero_portas: 4, tipo_combustivel: "Flex",
    status_veiculo: "Disponível", preco_diaria: 300,
    src: "/images/CategoriasVeiculos/Picapes/toro.png",
  },
  {
    id_carro: 17, fk_id_marca: 12, fk_categoria: 3, modelo: "Hilux",
    placa: "QRS7T89", quilometragem: 11000, ano_modelo: 2024, cor: "Branco",
    transmissao: "Automático", numero_portas: 4, tipo_combustivel: "Diesel",
    status_veiculo: "Disponível", preco_diaria: 450,
    src: "/images/CategoriasVeiculos/Picapes/Hilux.png",
  },
  {
    id_carro: 18, fk_id_marca: 13, fk_categoria: 3, modelo: "Ranger",
    placa: "RST8U90", quilometragem: 8000, ano_modelo: 2024, cor: "Preto",
    transmissao: "Automático", numero_portas: 4, tipo_combustivel: "Diesel",
    status_veiculo: "Disponível", preco_diaria: 480,
    src: "/images/CategoriasVeiculos/Picapes/Ranger.png",
  },

  // ---------- Sedãs (categoria 4) ----------
  {
    id_carro: 19, fk_id_marca: 3, fk_categoria: 4, modelo: "Onix Plus",
    placa: "STU9V01", quilometragem: 10000, ano_modelo: 2024, cor: "Branco",
    transmissao: "Manual", numero_portas: 4, tipo_combustivel: "Flex",
    status_veiculo: "Disponível", preco_diaria: 170,
    src: "/images/CategoriasVeiculos/Sedans/OnixPlus.png",
  },
  {
    id_carro: 20, fk_id_marca: 1, fk_categoria: 4, modelo: "Cronos",
    placa: "TUV0W12", quilometragem: 12000, ano_modelo: 2024, cor: "Prata",
    transmissao: "Manual", numero_portas: 4, tipo_combustivel: "Flex",
    status_veiculo: "Disponível", preco_diaria: 165,
    src: "/images/CategoriasVeiculos/Sedans/cronos.png",
  },
  {
    id_carro: 21, fk_id_marca: 4, fk_categoria: 4, modelo: "Virtus",
    placa: "UVW1X23", quilometragem: 9000, ano_modelo: 2024, cor: "Cinza",
    transmissao: "Automático", numero_portas: 4, tipo_combustivel: "Flex",
    status_veiculo: "Disponível", preco_diaria: 190,
    src: "/images/CategoriasVeiculos/Sedans/virtus.png",
  },
  {
    id_carro: 22, fk_id_marca: 2, fk_categoria: 4, modelo: "HB20S",
    placa: "VWX2Y34", quilometragem: 11000, ano_modelo: 2024, cor: "Preto",
    transmissao: "Manual", numero_portas: 4, tipo_combustivel: "Flex",
    status_veiculo: "Disponível", preco_diaria: 180,
    src: "/images/CategoriasVeiculos/Sedans/Hb20s.png",
  },
  {
    id_carro: 23, fk_id_marca: 12, fk_categoria: 4, modelo: "Corolla",
    placa: "WXY3Z45", quilometragem: 7000, ano_modelo: 2024, cor: "Prata",
    transmissao: "Automático", numero_portas: 4, tipo_combustivel: "Flex",
    status_veiculo: "Disponível", preco_diaria: 300,
    src: "/images/CategoriasVeiculos/Sedans/corolla.png",
  },
  {
    id_carro: 24, fk_id_marca: 14, fk_categoria: 4, modelo: "King",
    placa: "XYZ4A56", quilometragem: 5000, ano_modelo: 2025, cor: "Azul",
    transmissao: "Automático", numero_portas: 4, tipo_combustivel: "Híbrido",
    status_veiculo: "Disponível", preco_diaria: 350,
    src: "/images/CategoriasVeiculos/Sedans/BYDKing.png",
  },

  // ---------- SUVs (categoria 5) ----------
  {
    id_carro: 25, fk_id_marca: 4, fk_categoria: 5, modelo: "T-Cross",
    placa: "YZA5B67", quilometragem: 10000, ano_modelo: 2024, cor: "Branco",
    transmissao: "Automático", numero_portas: 5, tipo_combustivel: "Flex",
    status_veiculo: "Disponível", preco_diaria: 250,
    src: "/images/CategoriasVeiculos/SUVs/VolkswagenT-Cross.png",
  },
  {
    id_carro: 26, fk_id_marca: 2, fk_categoria: 5, modelo: "Creta",
    placa: "ZAB6C78", quilometragem: 9000, ano_modelo: 2024, cor: "Branco",
    transmissao: "Automático", numero_portas: 5, tipo_combustivel: "Flex",
    status_veiculo: "Disponível", preco_diaria: 260,
    src: "/images/CategoriasVeiculos/SUVs/creta_comfort_7-8_branco-atlas (1).webp",
  },
  {
    id_carro: 27, fk_id_marca: 7, fk_categoria: 5, modelo: "Compass",
    placa: "ABD7E89", quilometragem: 8000, ano_modelo: 2024, cor: "Cinza",
    transmissao: "Automático", numero_portas: 5, tipo_combustivel: "Flex",
    status_veiculo: "Disponível", preco_diaria: 350,
    src: "/images/CategoriasVeiculos/SUVs/compass.png",
  },
  {
    id_carro: 28, fk_id_marca: 15, fk_categoria: 5, modelo: "HR-V",
    placa: "BCE8F90", quilometragem: 11000, ano_modelo: 2024, cor: "Prata",
    transmissao: "Automático", numero_portas: 5, tipo_combustivel: "Flex",
    status_veiculo: "Disponível", preco_diaria: 280,
    src: "/images/CategoriasVeiculos/SUVs/HondaHR-V.png",
  },
  {
    id_carro: 29, fk_id_marca: 12, fk_categoria: 5, modelo: "Corolla Cross",
    placa: "CDF9G01", quilometragem: 7000, ano_modelo: 2024, cor: "Preto",
    transmissao: "Automático", numero_portas: 5, tipo_combustivel: "Flex",
    status_veiculo: "Disponível", preco_diaria: 380,
    src: "/images/CategoriasVeiculos/SUVs/cross.png",
  },
  {
    id_carro: 30, fk_id_marca: 7, fk_categoria: 5, modelo: "Commander",
    placa: "DEG0H12", quilometragem: 6000, ano_modelo: 2024, cor: "Branco",
    transmissao: "Automático", numero_portas: 5, tipo_combustivel: "Diesel",
    status_veiculo: "Disponível", preco_diaria: 450,
    src: "/images/CategoriasVeiculos/SUVs/commander.png",
  },
];

// ============================================================
// LOCAÇÕES (dados fictícios para testar conflitos de datas)
// Em produção, essas informações virão do banco de dados.
// ============================================================

export const locacoes: LocacaoVeiculo[] = [
  // Kwid: alugado agora, devolve em 09/11 às 10:00
  { id: 1, veiculoId: 6, dataRetirada: "2026-11-06", horaRetirada: "10:00", dataDevolucao: "2026-11-09", horaDevolucao: "10:00", status: "Ativa" },

  // T-Cross: 09/11 a 13/11
  { id: 2, veiculoId: 25, dataRetirada: "2026-11-09", horaRetirada: "10:00", dataDevolucao: "2026-11-13", horaDevolucao: "10:00", status: "Reservada" },

  // Polo: duas locações (10/11 a 15/11 e 28/11 a 02/12)
  { id: 3, veiculoId: 5, dataRetirada: "2026-11-10", horaRetirada: "10:00", dataDevolucao: "2026-11-15", horaDevolucao: "10:00", status: "Reservada" },
  { id: 4, veiculoId: 5, dataRetirada: "2026-11-28", horaRetirada: "10:00", dataDevolucao: "2026-12-02", horaDevolucao: "10:00", status: "Reservada" },

  // Corolla Cross: 10/11 a 14/11
  { id: 5, veiculoId: 29, dataRetirada: "2026-11-10", horaRetirada: "10:00", dataDevolucao: "2026-11-14", horaDevolucao: "10:00", status: "Reservada" },

  // Macan: 12/11 a 18/11
  { id: 6, veiculoId: 12, dataRetirada: "2026-11-12", horaRetirada: "08:00", dataDevolucao: "2026-11-18", horaDevolucao: "18:00", status: "Reservada" },

  // BMW: 14/11 a 17/11
  { id: 7, veiculoId: 7, dataRetirada: "2026-11-14", horaRetirada: "10:00", dataDevolucao: "2026-11-17", horaDevolucao: "10:00", status: "Reservada" },

  // Argo: 20/11 a 25/11 | HB20: 20/11 a 22/11
  { id: 8, veiculoId: 1, dataRetirada: "2026-11-20", horaRetirada: "10:00", dataDevolucao: "2026-11-25", horaDevolucao: "10:00", status: "Reservada" },
  { id: 9, veiculoId: 2, dataRetirada: "2026-11-20", horaRetirada: "10:00", dataDevolucao: "2026-11-22", horaDevolucao: "10:00", status: "Reservada" },

  // Hilux: 22/11 a 30/11
  { id: 10, veiculoId: 17, dataRetirada: "2026-11-22", horaRetirada: "08:00", dataDevolucao: "2026-11-30", horaDevolucao: "18:00", status: "Reservada" },

  // Compass: 01/12 a 05/12
  { id: 11, veiculoId: 27, dataRetirada: "2026-12-01", horaRetirada: "10:00", dataDevolucao: "2026-12-05", horaDevolucao: "10:00", status: "Reservada" },

  // Não bloqueiam datas (finalizada / cancelada):
  // Cronos (finalizada) e C300 (cancelada, seria 16/11 a 19/11)
  { id: 12, veiculoId: 20, dataRetirada: "2026-11-05", horaRetirada: "09:00", dataDevolucao: "2026-11-08", horaDevolucao: "09:00", status: "Finalizada" },
  { id: 13, veiculoId: 10, dataRetirada: "2026-11-16", horaRetirada: "10:00", dataDevolucao: "2026-11-19", horaDevolucao: "10:00", status: "Cancelada" },
];

// ============================================================
// FUNÇÕES
// ============================================================

// Converte data e horário em uma data comparável.
function converterData(data: string, hora: string) {
  return new Date(`${data}T${hora}:00`).getTime();
}

// Verifica se o veículo está livre no período solicitado.
export function verificarDisponibilidade(
  veiculo: Veiculo,
  reserva: ReservaPesquisa
): boolean {
  // Veículo em manutenção nunca pode ser locado.
  // "Alugado" não bloqueia aqui: um carro alugado hoje pode estar livre
  // em outras datas, e isso é decidido pelos conflitos de locação abaixo.
  if (veiculo.status_veiculo === "Em manutenção") {
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
    if (locacao.veiculoId !== veiculo.id_carro) {
      return false;
    }

    // Reservas canceladas e locações finalizadas não bloqueiam datas.
    if (locacao.status === "Cancelada" || locacao.status === "Finalizada") {
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
    return inicioPesquisa < fimLocacao && fimPesquisa > inicioLocacao;
  });

  return !possuiConflito;
}