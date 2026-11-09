// ============================================================
// TIPOS
// ============================================================

export type StatusVeiculo = "Disponível" | "Alugado" | "Em manutenção";

export type Transmissao = "Manual" | "Automático";

export type TipoCombustivel = "Flex" | "Gasolina" | "Diesel" | "Híbrido";

export type StatusLocacao = "Reservada" | "Ativa" | "Finalizada" | "Cancelada";

export type Cargo = "Atendente" | "Gerente";

export type StatusFuncionario = "Ativo" | "Inativo";

export type TipoCarteira = "A" | "B" | "AB";

export type TipoCartao = "Padrão" | "Secundário";

export type TipoAdicional = "Equipamento" | "Serviço" | "Seguro";

export type StatusPagamento = "Pago" | "Pendente" | "Reembolsado";

export type StatusReserva = "Confirmada" | "Em andamento" | "Concluída" | "Cancelada";

// Tabela: marca
export interface Marca {
  id_marca: number;
  nome: string;
}

// Tabela: categoria
export interface Categoria {
  id_categoria: number;
  nome: string;
  preco_diaria: number; // preço base de referência da categoria
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

// Tabela: agencia
export interface Agencia {
  id_agencia: number;
  nome_agencia: string;
  cidade: string;
  bairro: string;
  logradouro: string;
  numero: string;
  estado: string;
  cep: string;
  horario_funcionamento: string;
}

// Relacionamento "Esta_em" (N:N entre carro e agencia)
export interface CarroAgencia {
  id_carro: number;
  id_agencia: number;
}

// Tabela: funcionario
export interface Funcionario {
  id_funcionario: number;
  id_agencia: number;
  nome: string;
  cpf: string;
  cargo: Cargo;
  status: StatusFuncionario;
  email: string;
  senha_usuario: string;
}

// Tabela: cliente
export interface Cliente {
  id_cliente: number;
  nome: string;
  cpf: string;
  cnh: string;
  tipo_carteira: TipoCarteira;
  email: string;
  telefone: string;
  data_nasc: string;
  senha_usuario: string;
  endereco: string;
}

// Tabela: assinatura (planos)
export interface Assinatura {
  id_plano: number;
  nome_plano: string;
  descricao_plano: string;
  preco_plano: number;
}

// Relacionamento "Contrata" (N:N entre cliente e assinatura)
export interface ClienteAssinatura {
  id_cliente: number;
  id_plano: number;
  data_inicio: string;
  data_fim: string | null;
}

// Tabela de apoio para fk_id_bandeira (cartão)
export interface Bandeira {
  id_bandeira: number;
  nome: string;
}

// Tabela: cartao
export interface Cartao {
  id_cartao: number;
  numero_cartao: string; // mascarado
  fk_titular: number; // referencia Cliente.id_cliente
  fk_id_bandeira: number;
  tipo: TipoCartao;
}

// Tabela: adicional
export interface Adicional {
  id_adicional: number;
  nome_adicional: string;
  tipo_adicional: TipoAdicional;
  preco_adicional: number; // valor fixo por locação
}

// Tabela: reserva
// Obs.: data_fim e hora_fim não aparecem no diagrama, mas são necessários
// para bater com as locações abaixo (reserva.id_reserva === locacao.id).
export interface Reserva {
  id_reserva: number;
  codigo_reserva: string;
  id_cliente: number;
  id_funcionario: number;
  id_concessionaria_retirada: number; // referencia Agencia.id_agencia
  id_concessionaria_devolucao: number; // referencia Agencia.id_agencia
  data_inicio: string;
  hora_inicio: string;
  data_fim: string;
  hora_fim: string;
  status_pagamento: StatusPagamento;
  status_reserva: StatusReserva;
  valor_subtotal: number;
  valor_caucao: number;
}

// Tabela: itens_reserva (1 linha com o carro + 0..n linhas de adicionais)
export interface ItemReserva {
  id_itens_reserva: number;
  id_reserva: number;
  fk_id_carro: number | null;
  fk_id_adicional: number | null;
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
  { id_categoria: 1, nome: "Econômico", preco_diaria: 110 },
  { id_categoria: 2, nome: "Luxo", preco_diaria: 500 },
  { id_categoria: 3, nome: "Picape", preco_diaria: 250 },
  { id_categoria: 4, nome: "Sedã", preco_diaria: 200 },
  { id_categoria: 5, nome: "SUV", preco_diaria: 300 },
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
// DADOS: AGÊNCIAS E ONDE CADA CARRO ESTÁ (Esta_em)
// ============================================================

export const agencias: Agencia[] = [
  {
    id_agencia: 1, nome_agencia: "BRMW Franca Centro", cidade: "Franca",
    bairro: "Centro", logradouro: "Rua do Comércio", numero: "450",
    estado: "SP", cep: "14400-100", horario_funcionamento: "Seg-Sáb 08:00-18:00",
  },
  {
    id_agencia: 2, nome_agencia: "BRMW Aeroporto Ribeirão", cidade: "Ribeirão Preto",
    bairro: "Bonfim Paulista", logradouro: "Rodovia Abrão Assed", numero: "s/n",
    estado: "SP", cep: "14110-000", horario_funcionamento: "Todos os dias 06:00-23:00",
  },
  {
    id_agencia: 3, nome_agencia: "BRMW São Paulo Paulista", cidade: "São Paulo",
    bairro: "Bela Vista", logradouro: "Avenida Paulista", numero: "1578",
    estado: "SP", cep: "01310-200", horario_funcionamento: "Seg-Dom 07:00-22:00",
  },
  {
    id_agencia: 4, nome_agencia: "BRMW Campinas Cambuí", cidade: "Campinas",
    bairro: "Cambuí", logradouro: "Rua Coronel Quirino", numero: "890",
    estado: "SP", cep: "13025-001", horario_funcionamento: "Seg-Sáb 08:00-19:00",
  },
  {
    id_agencia: 5, nome_agencia: "BRMW Belo Horizonte Savassi", cidade: "Belo Horizonte",
    bairro: "Savassi", logradouro: "Rua Pernambuco", numero: "1200",
    estado: "MG", cep: "30130-151", horario_funcionamento: "Seg-Sáb 08:00-18:00",
  },
];

export const carrosAgencias: CarroAgencia[] = [
  // Econômicos
  { id_carro: 1, id_agencia: 1 },
  { id_carro: 2, id_agencia: 1 },
  { id_carro: 3, id_agencia: 2 },
  { id_carro: 4, id_agencia: 3 },
  { id_carro: 5, id_agencia: 1 },
  { id_carro: 5, id_agencia: 2 },
  { id_carro: 6, id_agencia: 4 },
  // Luxo
  { id_carro: 7, id_agencia: 3 },
  { id_carro: 8, id_agencia: 3 },
  { id_carro: 9, id_agencia: 5 },
  { id_carro: 10, id_agencia: 3 },
  { id_carro: 10, id_agencia: 4 },
  { id_carro: 11, id_agencia: 3 },
  { id_carro: 12, id_agencia: 3 },
  // Picapes
  { id_carro: 13, id_agencia: 1 },
  { id_carro: 14, id_agencia: 2 },
  { id_carro: 15, id_agencia: 4 },
  { id_carro: 16, id_agencia: 1 },
  { id_carro: 17, id_agencia: 2 },
  { id_carro: 18, id_agencia: 5 },
  // Sedãs
  { id_carro: 19, id_agencia: 1 },
  { id_carro: 20, id_agencia: 2 },
  { id_carro: 21, id_agencia: 3 },
  { id_carro: 22, id_agencia: 4 },
  { id_carro: 23, id_agencia: 1 },
  { id_carro: 24, id_agencia: 3 },
  // SUVs
  { id_carro: 25, id_agencia: 1 },
  { id_carro: 26, id_agencia: 5 },
  { id_carro: 27, id_agencia: 2 },
  { id_carro: 28, id_agencia: 4 },
  { id_carro: 29, id_agencia: 3 },
  { id_carro: 29, id_agencia: 1 },
  { id_carro: 30, id_agencia: 2 },
];

// ============================================================
// DADOS: FUNCIONÁRIOS
// (senhas fictícias; em produção, guardar apenas hash)
// ============================================================

export const funcionarios: Funcionario[] = [
  { id_funcionario: 1, id_agencia: 1, nome: "Marcos Vinícius Almeida", cpf: "111.222.333-01", cargo: "Gerente", status: "Ativo", email: "marcos.almeida@brmw.com.br", senha_usuario: "hash_fake_func_0001" },
  { id_funcionario: 2, id_agencia: 1, nome: "Juliana Prado Ferreira", cpf: "111.222.333-02", cargo: "Atendente", status: "Ativo", email: "juliana.ferreira@brmw.com.br", senha_usuario: "hash_fake_func_0002" },
  { id_funcionario: 3, id_agencia: 2, nome: "Ricardo Teixeira Lima", cpf: "111.222.333-03", cargo: "Gerente", status: "Ativo", email: "ricardo.lima@brmw.com.br", senha_usuario: "hash_fake_func_0003" },
  { id_funcionario: 4, id_agencia: 2, nome: "Patrícia Gomes Rocha", cpf: "111.222.333-04", cargo: "Atendente", status: "Ativo", email: "patricia.rocha@brmw.com.br", senha_usuario: "hash_fake_func_0004" },
  { id_funcionario: 5, id_agencia: 3, nome: "Fernando Azevedo Costa", cpf: "111.222.333-05", cargo: "Gerente", status: "Ativo", email: "fernando.costa@brmw.com.br", senha_usuario: "hash_fake_func_0005" },
  { id_funcionario: 6, id_agencia: 3, nome: "Camila Duarte Nunes", cpf: "111.222.333-06", cargo: "Atendente", status: "Ativo", email: "camila.nunes@brmw.com.br", senha_usuario: "hash_fake_func_0006" },
  { id_funcionario: 7, id_agencia: 4, nome: "Eduardo Martins Pires", cpf: "111.222.333-07", cargo: "Gerente", status: "Ativo", email: "eduardo.pires@brmw.com.br", senha_usuario: "hash_fake_func_0007" },
  { id_funcionario: 8, id_agencia: 4, nome: "Larissa Moreira Santos", cpf: "111.222.333-08", cargo: "Atendente", status: "Ativo", email: "larissa.santos@brmw.com.br", senha_usuario: "hash_fake_func_0008" },
  { id_funcionario: 9, id_agencia: 5, nome: "Gustavo Henrique Barros", cpf: "111.222.333-09", cargo: "Gerente", status: "Ativo", email: "gustavo.barros@brmw.com.br", senha_usuario: "hash_fake_func_0009" },
  { id_funcionario: 10, id_agencia: 5, nome: "Beatriz Cardoso Melo", cpf: "111.222.333-10", cargo: "Atendente", status: "Inativo", email: "beatriz.melo@brmw.com.br", senha_usuario: "hash_fake_func_0010" },
];

// ============================================================
// DADOS: CLIENTES, ASSINATURAS E CARTÕES
// ============================================================

export const clientes: Cliente[] = [
  { id_cliente: 1, nome: "Ana Beatriz Souza", cpf: "222.333.444-01", cnh: "12345678901", tipo_carteira: "B", email: "ana.souza@email.com", telefone: "(16) 99111-0001", data_nasc: "1990-03-14", senha_usuario: "hash_fake_cli_0001", endereco: "Rua Voluntários da Franca, 120 - Franca/SP" },
  { id_cliente: 2, nome: "Bruno Carvalho Dias", cpf: "222.333.444-02", cnh: "12345678902", tipo_carteira: "B", email: "bruno.dias@email.com", telefone: "(16) 99111-0002", data_nasc: "1985-07-22", senha_usuario: "hash_fake_cli_0002", endereco: "Av. Champagnat, 800 - Franca/SP" },
  { id_cliente: 3, nome: "Carla Mendes Ribeiro", cpf: "222.333.444-03", cnh: "12345678903", tipo_carteira: "AB", email: "carla.ribeiro@email.com", telefone: "(16) 99111-0003", data_nasc: "1992-11-05", senha_usuario: "hash_fake_cli_0003", endereco: "Rua Frederico Moura, 55 - Franca/SP" },
  { id_cliente: 4, nome: "Daniel Oliveira Rocha", cpf: "222.333.444-04", cnh: "12345678904", tipo_carteira: "B", email: "daniel.rocha@email.com", telefone: "(16) 99111-0004", data_nasc: "1978-01-30", senha_usuario: "hash_fake_cli_0004", endereco: "Rua Major Claudiano, 310 - Franca/SP" },
  { id_cliente: 5, nome: "Elisa Fernandes Lopes", cpf: "222.333.444-05", cnh: "12345678905", tipo_carteira: "B", email: "elisa.lopes@email.com", telefone: "(11) 99111-0005", data_nasc: "1995-09-18", senha_usuario: "hash_fake_cli_0005", endereco: "Rua Augusta, 1500 - São Paulo/SP" },
  { id_cliente: 6, nome: "Felipe Andrade Gomes", cpf: "222.333.444-06", cnh: "12345678906", tipo_carteira: "AB", email: "felipe.gomes@email.com", telefone: "(11) 99111-0006", data_nasc: "1988-05-09", senha_usuario: "hash_fake_cli_0006", endereco: "Rua Oscar Freire, 220 - São Paulo/SP" },
  { id_cliente: 7, nome: "Giovana Pires Martins", cpf: "222.333.444-07", cnh: "12345678907", tipo_carteira: "B", email: "giovana.martins@email.com", telefone: "(19) 99111-0007", data_nasc: "1999-12-25", senha_usuario: "hash_fake_cli_0007", endereco: "Rua Barão de Jaguara, 410 - Campinas/SP" },
  { id_cliente: 8, nome: "Henrique Batista Costa", cpf: "222.333.444-08", cnh: "12345678908", tipo_carteira: "B", email: "henrique.costa@email.com", telefone: "(19) 99111-0008", data_nasc: "1983-04-02", senha_usuario: "hash_fake_cli_0008", endereco: "Av. Norte-Sul, 900 - Campinas/SP" },
  { id_cliente: 9, nome: "Isabela Nascimento Luz", cpf: "222.333.444-09", cnh: "12345678909", tipo_carteira: "B", email: "isabela.luz@email.com", telefone: "(31) 99111-0009", data_nasc: "1993-08-17", senha_usuario: "hash_fake_cli_0009", endereco: "Rua da Bahia, 1100 - Belo Horizonte/MG" },
  { id_cliente: 10, nome: "João Pedro Cavalcanti", cpf: "222.333.444-10", cnh: "12345678910", tipo_carteira: "AB", email: "joao.cavalcanti@email.com", telefone: "(31) 99111-0010", data_nasc: "1980-02-11", senha_usuario: "hash_fake_cli_0010", endereco: "Av. Afonso Pena, 2300 - Belo Horizonte/MG" },
  { id_cliente: 11, nome: "Karina Lima Tavares", cpf: "222.333.444-11", cnh: "12345678911", tipo_carteira: "B", email: "karina.tavares@email.com", telefone: "(16) 99111-0011", data_nasc: "1997-06-29", senha_usuario: "hash_fake_cli_0011", endereco: "Rua Rui Barbosa, 75 - Franca/SP" },
  { id_cliente: 12, nome: "Lucas Monteiro Pinto", cpf: "222.333.444-12", cnh: "12345678912", tipo_carteira: "B", email: "lucas.pinto@email.com", telefone: "(16) 99111-0012", data_nasc: "1991-10-08", senha_usuario: "hash_fake_cli_0012", endereco: "Av. Brasil, 1900 - Franca/SP" },
  { id_cliente: 13, nome: "Mariana Araújo Freitas", cpf: "222.333.444-13", cnh: "12345678913", tipo_carteira: "B", email: "mariana.freitas@email.com", telefone: "(16) 99111-0013", data_nasc: "1987-12-03", senha_usuario: "hash_fake_cli_0013", endereco: "Rua Duque de Caxias, 640 - Ribeirão Preto/SP" },
  { id_cliente: 14, nome: "Nicolas Barros Vieira", cpf: "222.333.444-14", cnh: "12345678914", tipo_carteira: "AB", email: "nicolas.vieira@email.com", telefone: "(16) 99111-0014", data_nasc: "1994-03-21", senha_usuario: "hash_fake_cli_0014", endereco: "Av. Pres. Vargas, 3000 - Ribeirão Preto/SP" },
  { id_cliente: 15, nome: "Olívia Campos Teixeira", cpf: "222.333.444-15", cnh: "12345678915", tipo_carteira: "B", email: "olivia.teixeira@email.com", telefone: "(11) 99111-0015", data_nasc: "2000-07-13", senha_usuario: "hash_fake_cli_0015", endereco: "Rua Haddock Lobo, 360 - São Paulo/SP" },
];

export const assinaturas: Assinatura[] = [
  { id_plano: 1, nome_plano: "Básico", descricao_plano: "10% de desconto na diária e cancelamento gratuito até 24h antes", preco_plano: 49.9 },
  { id_plano: 2, nome_plano: "Plus", descricao_plano: "15% de desconto e upgrade de categoria sujeito a disponibilidade", preco_plano: 99.9 },
  { id_plano: 3, nome_plano: "Premium", descricao_plano: "20% de desconto, seguro total incluso e retirada prioritária", preco_plano: 199.9 },
];

export const clientesAssinaturas: ClienteAssinatura[] = [
  { id_cliente: 1, id_plano: 2, data_inicio: "2026-01-10", data_fim: null },
  { id_cliente: 2, id_plano: 1, data_inicio: "2026-02-15", data_fim: null },
  { id_cliente: 4, id_plano: 3, data_inicio: "2025-11-01", data_fim: null },
  { id_cliente: 6, id_plano: 2, data_inicio: "2026-03-20", data_fim: "2026-09-20" },
  { id_cliente: 8, id_plano: 1, data_inicio: "2026-05-05", data_fim: null },
  { id_cliente: 10, id_plano: 3, data_inicio: "2026-06-01", data_fim: null },
  { id_cliente: 12, id_plano: 2, data_inicio: "2026-07-12", data_fim: null },
  { id_cliente: 14, id_plano: 1, data_inicio: "2026-08-30", data_fim: null },
];

export const bandeiras: Bandeira[] = [
  { id_bandeira: 1, nome: "Visa" },
  { id_bandeira: 2, nome: "Mastercard" },
  { id_bandeira: 3, nome: "Elo" },
  { id_bandeira: 4, nome: "American Express" },
];

// Números mascarados (nunca guardar o número completo do cartão)
export const cartoes: Cartao[] = [
  { id_cartao: 1, numero_cartao: "**** **** **** 1001", fk_titular: 1, fk_id_bandeira: 1, tipo: "Padrão" },
  { id_cartao: 2, numero_cartao: "**** **** **** 1002", fk_titular: 2, fk_id_bandeira: 2, tipo: "Padrão" },
  { id_cartao: 3, numero_cartao: "**** **** **** 1003", fk_titular: 3, fk_id_bandeira: 3, tipo: "Padrão" },
  { id_cartao: 4, numero_cartao: "**** **** **** 1004", fk_titular: 4, fk_id_bandeira: 1, tipo: "Padrão" },
  { id_cartao: 5, numero_cartao: "**** **** **** 1005", fk_titular: 5, fk_id_bandeira: 2, tipo: "Padrão" },
  { id_cartao: 6, numero_cartao: "**** **** **** 1006", fk_titular: 6, fk_id_bandeira: 4, tipo: "Padrão" },
  { id_cartao: 7, numero_cartao: "**** **** **** 1007", fk_titular: 7, fk_id_bandeira: 1, tipo: "Padrão" },
  { id_cartao: 8, numero_cartao: "**** **** **** 1008", fk_titular: 8, fk_id_bandeira: 2, tipo: "Padrão" },
  { id_cartao: 9, numero_cartao: "**** **** **** 1009", fk_titular: 9, fk_id_bandeira: 3, tipo: "Padrão" },
  { id_cartao: 10, numero_cartao: "**** **** **** 1010", fk_titular: 10, fk_id_bandeira: 4, tipo: "Padrão" },
  { id_cartao: 11, numero_cartao: "**** **** **** 1011", fk_titular: 11, fk_id_bandeira: 1, tipo: "Padrão" },
  { id_cartao: 12, numero_cartao: "**** **** **** 1012", fk_titular: 12, fk_id_bandeira: 2, tipo: "Padrão" },
  { id_cartao: 13, numero_cartao: "**** **** **** 1013", fk_titular: 13, fk_id_bandeira: 1, tipo: "Padrão" },
  { id_cartao: 14, numero_cartao: "**** **** **** 1014", fk_titular: 14, fk_id_bandeira: 3, tipo: "Padrão" },
  { id_cartao: 15, numero_cartao: "**** **** **** 1015", fk_titular: 15, fk_id_bandeira: 2, tipo: "Padrão" },
  { id_cartao: 16, numero_cartao: "**** **** **** 2001", fk_titular: 1, fk_id_bandeira: 2, tipo: "Secundário" },
  { id_cartao: 17, numero_cartao: "**** **** **** 2003", fk_titular: 3, fk_id_bandeira: 1, tipo: "Secundário" },
  { id_cartao: 18, numero_cartao: "**** **** **** 2005", fk_titular: 5, fk_id_bandeira: 3, tipo: "Secundário" },
  { id_cartao: 19, numero_cartao: "**** **** **** 2008", fk_titular: 8, fk_id_bandeira: 1, tipo: "Secundário" },
  { id_cartao: 20, numero_cartao: "**** **** **** 2012", fk_titular: 12, fk_id_bandeira: 3, tipo: "Secundário" },
];

// ============================================================
// DADOS: ADICIONAIS
// ============================================================

export const adicionais: Adicional[] = [
  { id_adicional: 1, nome_adicional: "GPS Portátil", tipo_adicional: "Equipamento", preco_adicional: 25 },
  { id_adicional: 2, nome_adicional: "Cadeirinha Infantil", tipo_adicional: "Equipamento", preco_adicional: 30 },
  { id_adicional: 3, nome_adicional: "Motorista Adicional", tipo_adicional: "Serviço", preco_adicional: 40 },
  { id_adicional: 4, nome_adicional: "Seguro Total", tipo_adicional: "Seguro", preco_adicional: 60 },
  { id_adicional: 5, nome_adicional: "Wi-Fi Portátil", tipo_adicional: "Equipamento", preco_adicional: 20 },
  { id_adicional: 6, nome_adicional: "Tanque Cheio", tipo_adicional: "Serviço", preco_adicional: 90 },
  { id_adicional: 7, nome_adicional: "Bebê Conforto", tipo_adicional: "Equipamento", preco_adicional: 30 },
  { id_adicional: 8, nome_adicional: "Rack de Teto", tipo_adicional: "Equipamento", preco_adicional: 35 },
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
// DADOS: RESERVAS E ITENS DA RESERVA
// Cada reserva corresponde à locação de mesmo id (reserva 1 = locação 1).
// valor_subtotal = diárias (arredondadas para cima) x preco_diaria do carro
//                  + soma dos adicionais.
// ============================================================

export const reservas: Reserva[] = [
  { id_reserva: 1, codigo_reserva: "RES-2026-0001", id_cliente: 1, id_funcionario: 8, id_concessionaria_retirada: 4, id_concessionaria_devolucao: 4, data_inicio: "2026-11-06", hora_inicio: "10:00", data_fim: "2026-11-09", hora_fim: "10:00", status_pagamento: "Pago", status_reserva: "Em andamento", valor_subtotal: 295, valor_caucao: 500 },
  { id_reserva: 2, codigo_reserva: "RES-2026-0002", id_cliente: 3, id_funcionario: 2, id_concessionaria_retirada: 1, id_concessionaria_devolucao: 1, data_inicio: "2026-11-09", hora_inicio: "10:00", data_fim: "2026-11-13", hora_fim: "10:00", status_pagamento: "Pago", status_reserva: "Confirmada", valor_subtotal: 1080, valor_caucao: 1000 },
  { id_reserva: 3, codigo_reserva: "RES-2026-0003", id_cliente: 5, id_funcionario: 1, id_concessionaria_retirada: 1, id_concessionaria_devolucao: 2, data_inicio: "2026-11-10", hora_inicio: "10:00", data_fim: "2026-11-15", hora_fim: "10:00", status_pagamento: "Pago", status_reserva: "Confirmada", valor_subtotal: 650, valor_caucao: 500 },
  { id_reserva: 4, codigo_reserva: "RES-2026-0004", id_cliente: 2, id_funcionario: 4, id_concessionaria_retirada: 2, id_concessionaria_devolucao: 2, data_inicio: "2026-11-28", hora_inicio: "10:00", data_fim: "2026-12-02", hora_fim: "10:00", status_pagamento: "Pendente", status_reserva: "Confirmada", valor_subtotal: 550, valor_caucao: 500 },
  { id_reserva: 5, codigo_reserva: "RES-2026-0005", id_cliente: 10, id_funcionario: 5, id_concessionaria_retirada: 3, id_concessionaria_devolucao: 3, data_inicio: "2026-11-10", hora_inicio: "10:00", data_fim: "2026-11-14", hora_fim: "10:00", status_pagamento: "Pago", status_reserva: "Confirmada", valor_subtotal: 1620, valor_caucao: 1000 },
  { id_reserva: 6, codigo_reserva: "RES-2026-0006", id_cliente: 7, id_funcionario: 5, id_concessionaria_retirada: 3, id_concessionaria_devolucao: 3, data_inicio: "2026-11-12", hora_inicio: "08:00", data_fim: "2026-11-18", hora_fim: "18:00", status_pagamento: "Pago", status_reserva: "Confirmada", valor_subtotal: 7150, valor_caucao: 3000 },
  { id_reserva: 7, codigo_reserva: "RES-2026-0007", id_cliente: 4, id_funcionario: 6, id_concessionaria_retirada: 3, id_concessionaria_devolucao: 1, data_inicio: "2026-11-14", hora_inicio: "10:00", data_fim: "2026-11-17", hora_fim: "10:00", status_pagamento: "Pago", status_reserva: "Confirmada", valor_subtotal: 1410, valor_caucao: 2000 },
  { id_reserva: 8, codigo_reserva: "RES-2026-0008", id_cliente: 8, id_funcionario: 2, id_concessionaria_retirada: 1, id_concessionaria_devolucao: 1, data_inicio: "2026-11-20", hora_inicio: "10:00", data_fim: "2026-11-25", hora_fim: "10:00", status_pagamento: "Pago", status_reserva: "Confirmada", valor_subtotal: 575, valor_caucao: 500 },
  { id_reserva: 9, codigo_reserva: "RES-2026-0009", id_cliente: 11, id_funcionario: 2, id_concessionaria_retirada: 1, id_concessionaria_devolucao: 1, data_inicio: "2026-11-20", hora_inicio: "10:00", data_fim: "2026-11-22", hora_fim: "10:00", status_pagamento: "Pago", status_reserva: "Confirmada", valor_subtotal: 230, valor_caucao: 500 },
  { id_reserva: 10, codigo_reserva: "RES-2026-0010", id_cliente: 14, id_funcionario: 4, id_concessionaria_retirada: 2, id_concessionaria_devolucao: 2, data_inicio: "2026-11-22", hora_inicio: "08:00", data_fim: "2026-11-30", hora_fim: "18:00", status_pagamento: "Pago", status_reserva: "Confirmada", valor_subtotal: 4125, valor_caucao: 1500 },
  { id_reserva: 11, codigo_reserva: "RES-2026-0011", id_cliente: 6, id_funcionario: 3, id_concessionaria_retirada: 2, id_concessionaria_devolucao: 3, data_inicio: "2026-12-01", hora_inicio: "10:00", data_fim: "2026-12-05", hora_fim: "10:00", status_pagamento: "Pendente", status_reserva: "Confirmada", valor_subtotal: 1460, valor_caucao: 1000 },
  { id_reserva: 12, codigo_reserva: "RES-2026-0012", id_cliente: 12, id_funcionario: 4, id_concessionaria_retirada: 2, id_concessionaria_devolucao: 2, data_inicio: "2026-11-05", hora_inicio: "09:00", data_fim: "2026-11-08", hora_fim: "09:00", status_pagamento: "Pago", status_reserva: "Concluída", valor_subtotal: 515, valor_caucao: 500 },
  { id_reserva: 13, codigo_reserva: "RES-2026-0013", id_cliente: 9, id_funcionario: 6, id_concessionaria_retirada: 3, id_concessionaria_devolucao: 3, data_inicio: "2026-11-16", hora_inicio: "10:00", data_fim: "2026-11-19", hora_fim: "10:00", status_pagamento: "Reembolsado", status_reserva: "Cancelada", valor_subtotal: 1860, valor_caucao: 2000 },
];

// Cada reserva tem 1 linha com o carro (fk_id_adicional = null)
// e 0..n linhas de adicionais (fk_id_carro = null).
export const itensReserva: ItemReserva[] = [
  { id_itens_reserva: 1, id_reserva: 1, fk_id_carro: 6, fk_id_adicional: null },
  { id_itens_reserva: 2, id_reserva: 1, fk_id_carro: null, fk_id_adicional: 1 },

  { id_itens_reserva: 3, id_reserva: 2, fk_id_carro: 25, fk_id_adicional: null },
  { id_itens_reserva: 4, id_reserva: 2, fk_id_carro: null, fk_id_adicional: 4 },
  { id_itens_reserva: 5, id_reserva: 2, fk_id_carro: null, fk_id_adicional: 5 },

  { id_itens_reserva: 6, id_reserva: 3, fk_id_carro: 5, fk_id_adicional: null },

  { id_itens_reserva: 7, id_reserva: 4, fk_id_carro: 5, fk_id_adicional: null },
  { id_itens_reserva: 8, id_reserva: 4, fk_id_carro: null, fk_id_adicional: 2 },

  { id_itens_reserva: 9, id_reserva: 5, fk_id_carro: 29, fk_id_adicional: null },
  { id_itens_reserva: 10, id_reserva: 5, fk_id_carro: null, fk_id_adicional: 4 },
  { id_itens_reserva: 11, id_reserva: 5, fk_id_carro: null, fk_id_adicional: 3 },

  { id_itens_reserva: 12, id_reserva: 6, fk_id_carro: 12, fk_id_adicional: null },
  { id_itens_reserva: 13, id_reserva: 6, fk_id_carro: null, fk_id_adicional: 4 },
  { id_itens_reserva: 14, id_reserva: 6, fk_id_carro: null, fk_id_adicional: 6 },

  { id_itens_reserva: 15, id_reserva: 7, fk_id_carro: 7, fk_id_adicional: null },
  { id_itens_reserva: 16, id_reserva: 7, fk_id_carro: null, fk_id_adicional: 4 },

  { id_itens_reserva: 17, id_reserva: 8, fk_id_carro: 1, fk_id_adicional: null },
  { id_itens_reserva: 18, id_reserva: 8, fk_id_carro: null, fk_id_adicional: 1 },

  { id_itens_reserva: 19, id_reserva: 9, fk_id_carro: 2, fk_id_adicional: null },

  { id_itens_reserva: 20, id_reserva: 10, fk_id_carro: 17, fk_id_adicional: null },
  { id_itens_reserva: 21, id_reserva: 10, fk_id_carro: null, fk_id_adicional: 8 },
  { id_itens_reserva: 22, id_reserva: 10, fk_id_carro: null, fk_id_adicional: 3 },

  { id_itens_reserva: 23, id_reserva: 11, fk_id_carro: 27, fk_id_adicional: null },
  { id_itens_reserva: 24, id_reserva: 11, fk_id_carro: null, fk_id_adicional: 4 },

  { id_itens_reserva: 25, id_reserva: 12, fk_id_carro: 20, fk_id_adicional: null },
  { id_itens_reserva: 26, id_reserva: 12, fk_id_carro: null, fk_id_adicional: 5 },

  { id_itens_reserva: 27, id_reserva: 13, fk_id_carro: 10, fk_id_adicional: null },
  { id_itens_reserva: 28, id_reserva: 13, fk_id_carro: null, fk_id_adicional: 4 },
];

// ============================================================
// FUNÇÕES AUXILIARES DE CONSULTA
// ============================================================

export function getAgenciasDoCarro(id_carro: number): Agencia[] {
  const ids = carrosAgencias
    .filter((ca) => ca.id_carro === id_carro)
    .map((ca) => ca.id_agencia);
  return agencias.filter((a) => ids.includes(a.id_agencia));
}

export function getCarrosDaAgencia(id_agencia: number): Veiculo[] {
  const ids = carrosAgencias
    .filter((ca) => ca.id_agencia === id_agencia)
    .map((ca) => ca.id_carro);
  return veiculos.filter((v) => ids.includes(v.id_carro));
}

export function getItensDaReserva(id_reserva: number): ItemReserva[] {
  return itensReserva.filter((i) => i.id_reserva === id_reserva);
}

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