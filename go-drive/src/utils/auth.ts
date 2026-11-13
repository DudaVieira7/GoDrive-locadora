const USERS_STORAGE_KEY = "godrive:users";
const SESSION_STORAGE_KEY = "godrive:session";
const RESERVATIONS_STORAGE_KEY = "godrive:reservations";
const AUTH_CHANGE_EVENT = "godrive:auth-change";
const PASSWORD_ITERATIONS = 210_000;

export interface Usuario {
  nomeUsuario: string;
  email: string;
  telefone: string;
  endereco: string;
  cpf: string;
  cnh: string;
}

interface UsuarioArmazenado extends Usuario {
  salt: string;
  senhaHash: string;
  tipoConta?: "cliente" | "funcionario";
}

export interface Funcionario {
  nomeUsuario: string;
  email: string;
}

export interface ReservaUsuario {
  id: string;
  emailUsuario: string;
  idCarro: number;
  criadaEm: string;
  status: "Solicitada" | "Cancelada";
  localRetirada?: string;
  localDevolucao?: string;
  dataRetirada?: string;
  horaRetirada?: string;
  dataDevolucao?: string;
  horaDevolucao?: string;
  total?: number;
}

export interface DadosNovaReserva {
  idCarro: number;
  localRetirada: string;
  localDevolucao: string;
  dataRetirada: string;
  horaRetirada: string;
  dataDevolucao: string;
  horaDevolucao: string;
  total: number;
}

export type DadosPerfil = Pick<
  Usuario,
  "nomeUsuario" | "telefone" | "endereco" | "cpf" | "cnh"
>;

function isUsuarioArmazenado(value: unknown): value is UsuarioArmazenado {
  if (typeof value !== "object" || value === null) return false;
  const user = value as Record<string, unknown>;

  return (
    typeof user.nomeUsuario === "string" &&
    typeof user.email === "string" &&
    typeof user.telefone === "string" &&
    typeof user.endereco === "string" &&
    typeof user.cpf === "string" &&
    typeof user.cnh === "string" &&
    typeof user.salt === "string" &&
    typeof user.senhaHash === "string" &&
    (user.tipoConta === undefined ||
      user.tipoConta === "cliente" ||
      user.tipoConta === "funcionario")
  );
}

function lerUsuarios(): UsuarioArmazenado[] {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  if (!stored) return [];

  const parsed: unknown = JSON.parse(stored);
  if (!Array.isArray(parsed) || !parsed.every(isUsuarioArmazenado)) {
    throw new Error("Os dados locais das contas estão inválidos.");
  }
  return parsed;
}

function isReservaUsuario(value: unknown): value is ReservaUsuario {
  if (typeof value !== "object" || value === null) return false;
  const reservation = value as Record<string, unknown>;

  return (
    typeof reservation.id === "string" &&
    typeof reservation.emailUsuario === "string" &&
    typeof reservation.idCarro === "number" &&
    typeof reservation.criadaEm === "string" &&
    (reservation.status === "Solicitada" || reservation.status === "Cancelada") &&
    (reservation.localRetirada === undefined ||
      typeof reservation.localRetirada === "string") &&
    (reservation.localDevolucao === undefined ||
      typeof reservation.localDevolucao === "string") &&
    (reservation.dataRetirada === undefined ||
      typeof reservation.dataRetirada === "string") &&
    (reservation.horaRetirada === undefined ||
      typeof reservation.horaRetirada === "string") &&
    (reservation.dataDevolucao === undefined ||
      typeof reservation.dataDevolucao === "string") &&
    (reservation.horaDevolucao === undefined ||
      typeof reservation.horaDevolucao === "string") &&
    (reservation.total === undefined || typeof reservation.total === "number")
  );
}

function lerReservas(): ReservaUsuario[] {
  const stored = localStorage.getItem(RESERVATIONS_STORAGE_KEY);
  if (!stored) return [];

  const parsed: unknown = JSON.parse(stored);
  if (!Array.isArray(parsed) || !parsed.every(isReservaUsuario)) {
    throw new Error("Os dados locais das reservas estão inválidos.");
  }
  return parsed;
}

function salvarUsuarios(users: UsuarioArmazenado[]): void {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function notificarMudancaDeAutenticacao(): void {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

async function derivarHashSenha(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const hash = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: Uint8Array.from(atob(salt), (character) => character.charCodeAt(0)),
      iterations: PASSWORD_ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    256,
  );
  return toBase64(new Uint8Array(hash));
}

function usuarioPublico(user: UsuarioArmazenado): Usuario {
  const { nomeUsuario, email, telefone, endereco, cpf, cnh } = user;
  return { nomeUsuario, email, telefone, endereco, cpf, cnh };
}

export function getUsuarioAtual(): Usuario | null {
  const email = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!email) return null;

  const user = lerUsuarios().find((item) => item.email === email);
  return user ? usuarioPublico(user) : null;
}

export function usuarioEstaLogado(): boolean {
  return getUsuarioAtual() !== null;
}

export function subscribeAuth(callback: () => void): () => void {
  window.addEventListener(AUTH_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(AUTH_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export async function criarConta(
  nomeUsuario: string,
  email: string,
  password: string,
): Promise<void> {
  const normalizedEmail = email.trim().toLocaleLowerCase("pt-BR");
  const users = lerUsuarios();

  if (nomeUsuario.trim().length < 2) {
    throw new Error("Informe um nome com pelo menos 2 caracteres.");
  }
  if (password.length < 8) {
    throw new Error("A senha deve ter pelo menos 8 caracteres.");
  }
  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error("Já existe uma conta cadastrada com este e-mail.");
  }

  const salt = toBase64(crypto.getRandomValues(new Uint8Array(16)));
  const senhaHash = await derivarHashSenha(password, salt);
  const user: UsuarioArmazenado = {
    nomeUsuario: nomeUsuario.trim(),
    email: normalizedEmail,
    telefone: "",
    endereco: "",
    cpf: "",
    cnh: "",
    tipoConta: "cliente",
    salt,
    senhaHash,
  };

  salvarUsuarios([...users, user]);
  localStorage.setItem(SESSION_STORAGE_KEY, user.email);
  notificarMudancaDeAutenticacao();
}

export function listarFuncionarios(): Funcionario[] {
  return lerUsuarios()
    .filter((user) => user.tipoConta === "funcionario")
    .map(({ nomeUsuario, email }) => ({ nomeUsuario, email }));
}

export function excluirFuncionario(email: string): void {
  const normalizedEmail = email.trim().toLocaleLowerCase("pt-BR");
  const users = lerUsuarios();
  const funcionario = users.find(
    (user) =>
      user.email === normalizedEmail && user.tipoConta === "funcionario",
  );

  if (!funcionario) {
    throw new Error("Não foi possível encontrar esse funcionário.");
  }

  salvarUsuarios(users.filter((user) => user.email !== normalizedEmail));
  if (localStorage.getItem(SESSION_STORAGE_KEY) === normalizedEmail) {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }
  notificarMudancaDeAutenticacao();
}

export async function criarFuncionario(
  nomeUsuario: string,
  email: string,
  password: string,
): Promise<void> {
  const nome = nomeUsuario.trim();
  const normalizedEmail = email.trim().toLocaleLowerCase("pt-BR");
  const users = lerUsuarios();

  if (nome.length < 2) {
    throw new Error("Informe um nome com pelo menos 2 caracteres.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    throw new Error("Informe um e-mail válido.");
  }
  if (password.length < 8) {
    throw new Error("A senha deve ter pelo menos 8 caracteres.");
  }
  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error("Já existe uma conta cadastrada com este e-mail.");
  }

  const salt = toBase64(crypto.getRandomValues(new Uint8Array(16)));
  const senhaHash = await derivarHashSenha(password, salt);
  const user: UsuarioArmazenado = {
    nomeUsuario: nome,
    email: normalizedEmail,
    telefone: "",
    endereco: "",
    cpf: "",
    cnh: "",
    tipoConta: "funcionario",
    salt,
    senhaHash,
  };

  salvarUsuarios([...users, user]);
  notificarMudancaDeAutenticacao();
}

export async function atualizarFuncionario(
  emailAtual: string,
  nomeUsuario: string,
  email: string,
  password: string,
): Promise<void> {
  const nome = nomeUsuario.trim();
  const normalizedEmailAtual = emailAtual.trim().toLocaleLowerCase("pt-BR");
  const normalizedEmail = email.trim().toLocaleLowerCase("pt-BR");
  const users = lerUsuarios();
  const funcionario = users.find(
    (user) =>
      user.email === normalizedEmailAtual && user.tipoConta === "funcionario",
  );

  if (!funcionario) {
    throw new Error("Não foi possível encontrar esse funcionário.");
  }
  if (nome.length < 2) {
    throw new Error("Informe um nome com pelo menos 2 caracteres.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    throw new Error("Informe um e-mail válido.");
  }
  if (password && password.length < 8) {
    throw new Error("A senha deve ter pelo menos 8 caracteres.");
  }
  if (
    users.some(
      (user) => user.email === normalizedEmail && user.email !== normalizedEmailAtual,
    )
  ) {
    throw new Error("Já existe uma conta cadastrada com este e-mail.");
  }

  let salt = funcionario.salt;
  let senhaHash = funcionario.senhaHash;
  if (password) {
    salt = toBase64(crypto.getRandomValues(new Uint8Array(16)));
    senhaHash = await derivarHashSenha(password, salt);
  }

  salvarUsuarios(
    users.map((user) =>
      user.email === normalizedEmailAtual
        ? { ...user, nomeUsuario: nome, email: normalizedEmail, salt, senhaHash }
        : user,
    ),
  );
  notificarMudancaDeAutenticacao();
}

export async function entrarNaConta(
  email: string,
  password: string,
): Promise<void> {
  const normalizedEmail = email.trim().toLocaleLowerCase("pt-BR");
  const user = lerUsuarios().find((item) => item.email === normalizedEmail);

  if (!user || (await derivarHashSenha(password, user.salt)) !== user.senhaHash) {
    throw new Error("E-mail ou senha incorretos.");
  }

  localStorage.setItem(SESSION_STORAGE_KEY, user.email);
  notificarMudancaDeAutenticacao();
}

export function sairDaConta(): void {
  localStorage.removeItem(SESSION_STORAGE_KEY);
  notificarMudancaDeAutenticacao();
}

export function atualizarPerfil(profile: DadosPerfil): void {
  const currentUser = getUsuarioAtual();
  if (!currentUser) throw new Error("Entre na sua conta para atualizar seus dados.");
  if (profile.nomeUsuario.trim().length < 2) {
    throw new Error("Informe um nome com pelo menos 2 caracteres.");
  }

  const users = lerUsuarios();
  const updatedUsers = users.map((user) =>
    user.email === currentUser.email
      ? {
          ...user,
          nomeUsuario: profile.nomeUsuario.trim(),
          telefone: profile.telefone.trim(),
          endereco: profile.endereco.trim(),
          cpf: profile.cpf.trim(),
          cnh: profile.cnh.trim(),
        }
      : user,
  );
  salvarUsuarios(updatedUsers);
  notificarMudancaDeAutenticacao();
}

export function getReservasDoUsuario(): ReservaUsuario[] {
  const currentUser = getUsuarioAtual();
  if (!currentUser) return [];
  return lerReservas().filter(
    (reservation) => reservation.emailUsuario === currentUser.email,
  );
}

export function solicitarAluguel(dados: DadosNovaReserva): void {
  const currentUser = getUsuarioAtual();
  if (!currentUser) throw new Error("Entre na sua conta para solicitar um aluguel.");
  if (!Number.isInteger(dados.idCarro) || dados.idCarro < 1) {
    throw new Error("O veículo selecionado é inválido.");
  }
  if (
    !dados.localRetirada.trim() ||
    !dados.localDevolucao.trim() ||
    !dados.dataRetirada ||
    !dados.horaRetirada ||
    !dados.dataDevolucao ||
    !dados.horaDevolucao ||
    !Number.isFinite(dados.total) ||
    dados.total < 0
  ) {
    throw new Error("Confira os dados do período e dos locais da reserva.");
  }

  const inicio = new Date(
    `${dados.dataRetirada}T${dados.horaRetirada}:00`,
  ).getTime();
  const fim = new Date(
    `${dados.dataDevolucao}T${dados.horaDevolucao}:00`,
  ).getTime();
  if (Number.isNaN(inicio) || Number.isNaN(fim) || fim <= inicio) {
    throw new Error("O período da reserva é inválido.");
  }

  const reservations = lerReservas();
  reservations.push({
    id: crypto.randomUUID(),
    emailUsuario: currentUser.email,
    ...dados,
    localRetirada: dados.localRetirada.trim(),
    localDevolucao: dados.localDevolucao.trim(),
    criadaEm: new Date().toISOString(),
    status: "Solicitada",
  });
  localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(reservations));
}

export function cancelarReserva(id: string): void {
  const currentUser = getUsuarioAtual();
  if (!currentUser) throw new Error("Entre na sua conta para cancelar uma reserva.");

  const reservations = lerReservas();
  const reservationIndex = reservations.findIndex(
    (reservation) =>
      reservation.id === id && reservation.emailUsuario === currentUser.email,
  );
  if (reservationIndex === -1) {
    throw new Error("Não foi possível encontrar essa reserva.");
  }
  if (reservations[reservationIndex].status === "Cancelada") {
    throw new Error("Essa reserva já foi cancelada.");
  }

  reservations[reservationIndex] = {
    ...reservations[reservationIndex],
    status: "Cancelada",
  };
  localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(reservations));
}

export function getRedirectPath(search: string): string {
  const redirect = new URLSearchParams(search).get("redirect");
  return redirect?.startsWith("/") && !redirect.startsWith("//")
    ? redirect
    : "/minha-conta";
}
