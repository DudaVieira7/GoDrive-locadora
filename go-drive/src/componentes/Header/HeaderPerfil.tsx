
import { useEffect, useRef, useState } from "react";
import {
  FaAddressCard,
  FaCarSide,
  FaChartPie,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import iconeBranco from "../../assets/iconePerfilBranco.png";
import iconePreto from "../../assets/iconePerfilPreto.svg";

import {
  getUsuarioAtual,
  sairDaConta,
  subscribeAuth,
} from "../../utils/auth";

import type { Usuario } from "../../utils/auth";

interface HeaderPerfilProps {
  isHovered: boolean;
}

function IconePino({ cor }: { cor: string }) {
  return (
    <svg width="14" height="22" viewBox="0 0 14 22" aria-hidden="true">
      <circle cx="7" cy="5" r="4" fill={cor} />
      <rect x="6" y="8" width="2" height="13" rx="1" fill={cor} />
    </svg>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

const EntrarPerfil = styled.div`
  height: 30px;
  display: flex;
  gap: 10px;
  align-items: center;

  @media (max-width: 900px) {
    height: auto;
  }
`;

const CirculoPerfil = styled.button<{ $isHovered: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  @media (max-width: 900px) {
    width: 40px;
    height: 40px;
    border-radius: 50%;

    background: ${({ $isHovered }) =>
      $isHovered ? "#000000" : "#FFFFFF"};

    transition: background 0.3s ease;
  }
`;

const ImagemPerfil = styled.img`
  width: 27px;
  height: auto;
  object-fit: contain;

  @media (max-width: 900px) {
    display: none;
  }
`;

const PinoWrapper = styled.span`
  display: none;

  @media (max-width: 900px) {
    display: flex;
  }
`;

const TextoEntrar = styled.button<{ $isHovered: boolean }>`
  max-width: 160px;
  overflow: hidden;

  background: none;
  border: none;
  padding: 0;

  color: ${({ $isHovered }) =>
    $isHovered ? "#000000" : "#FFFFFF"};

  font: inherit;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;

  transition: color 0.3s ease;

  @media (max-width: 900px) {
    display: none;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 14px);
  right: 0;

  width: min(340px, calc(100vw - 32px));
  padding: 18px;

  box-sizing: border-box;
  background: #ffffff;
  border-radius: 18px;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
  z-index: 1100;
`;

const DropdownTitle = styled.h2`
  margin: 0 0 12px;
  color: #171717;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 500;
  font-family: "Science Gothic Variable";
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 12px;
  margin-top: 10px;
  padding: 16px 18px;

  min-height: 76px;
  box-sizing: border-box;

  border: 1px solid #e5e5e5;
  border-radius: 12px;

  color: #1b1d20;
  text-decoration: none;

  transition: border-color 0.2s, background 0.2s;

  &:hover {
    border-color: #bdbdbd;
    background: #fafafa;
  }

  svg {
    flex: 0 0 auto;
    color: #999999;
    font-size: 22px;
  }
`;

const ItemText = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;

  strong {
    font-size: 0.95rem;
    font-weight: 400;
  }

  small {
    color: #aba4a4;
    font-size: 0.7rem;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;

  width: 100%;
  margin-top: 14px;
  padding: 10px 4px;

  border: 0;
  background: transparent;

  color: #c00018;
  font: inherit;
  font-weight: 600;
  text-align: left;
  cursor: pointer;

  svg {
    font-size: 20px;
  }

  &:hover {
    color: #a32121;
  }
`;

function HeaderPerfil({ isHovered }: HeaderPerfilProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [usuario, setUsuario] = useState<Usuario | null>(
    getUsuarioAtual
  );

  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    return subscribeAuth(() => setUsuario(getUsuarioAtual()));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  function handleLogout() {
    sairDaConta();
    closeMenu();
    navigate("/");
  }

  return (
    <Wrapper ref={wrapperRef}>
      <EntrarPerfil>
        <CirculoPerfil
          type="button"
          $isHovered={isHovered}
          onClick={() => setIsOpen((open) => !open)}
          aria-label="Abrir menu da conta"
          aria-expanded={isOpen}
        >
          <ImagemPerfil
            src={isHovered ? iconePreto : iconeBranco}
            alt=""
          />

          <PinoWrapper>
            <IconePino cor={isHovered ? "#FFFFFF" : "#000000"} />
          </PinoWrapper>
        </CirculoPerfil>

        <TextoEntrar
          type="button"
          $isHovered={isHovered}
          onClick={() => setIsOpen((open) => !open)}
        >
          {usuario?.nomeUsuario ?? "Entrar"}
        </TextoEntrar>
      </EntrarPerfil>

      {isOpen && (
        <Dropdown>
          <DropdownTitle>Minha conta</DropdownTitle>

          {usuario ? (
            <>
              <DropdownItem
                to="/minha-conta?secao=reservas"
                onClick={closeMenu}
              >
                <ItemText>
                  <strong>Minhas reservas</strong>
                  <small>Consulte seus alugueres</small>
                </ItemText>
                <FaCarSide />
              </DropdownItem>

              <DropdownItem
                to="/minha-conta?secao=dados"
                onClick={closeMenu}
              >
                <ItemText>
                  <strong>Meus dados</strong>
                  <small>Atualize suas informações</small>
                </ItemText>
                <FaAddressCard />
              </DropdownItem>

              <DropdownItem
                to="/minha-conta?secao=visao-geral"
                onClick={closeMenu}
              >
                <ItemText>
                  <strong>Visão geral</strong>
                  <small>Resumo da sua conta</small>
                </ItemText>
                <FaChartPie />
              </DropdownItem>

              <LogoutButton
                type="button"
                onClick={handleLogout}
              >
                <FaSignOutAlt />
                Sair da conta
              </LogoutButton>
            </>
          ) : (
            <>
              <DropdownItem to="/login" onClick={closeMenu}>
                <ItemText>
                  <strong>Entrar</strong>
                </ItemText>
              </DropdownItem>

              <DropdownItem to="/cadastro" onClick={closeMenu}>
                <ItemText>
                  <strong>Criar conta</strong>
                </ItemText>
              </DropdownItem>
            </>
          )}
        </Dropdown>
      )}
    </Wrapper>
  );
}

export default HeaderPerfil;
