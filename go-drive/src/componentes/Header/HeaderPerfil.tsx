import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import iconeBranco from '../../assets/iconePerfilBranco.png';
import iconePreto from '../../assets/iconePerfilPreto.svg';

interface HeaderPerfilProps {
  isHovered: boolean;
}

/* Pino: haste vertical com cabeça redonda, igual ao print */
function IconePino({ cor }: { cor: string }) {
  return (
    <svg width="14" height="22" viewBox="0 0 14 22" aria-hidden="true">
      <circle cx="7" cy="5" r="4" fill={cor} />
      <rect x="6" y="8" width="2" height="13" rx="1" fill={cor} />
    </svg>
  );
}

const Wrapper = styled.div`
  position: relative; /* o dropdown se posiciona em relação a ele */
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
    /* branca no topo; preta quando o header fica branco */
    background: ${({ $isHovered }) => ($isHovered ? '#000000' : '#FFFFFF')};
    transition: background 0.3s ease;
  }
`;

/* Ícone de perfil: só no desktop */
const ImagemPerfil = styled.img`
  width: 27px;
  height: auto;
  object-fit: contain;

  @media (max-width: 900px) {
    display: none;
  }
`;

/* Pino: só no celular */
const PinoWrapper = styled.span`
  display: none;

  @media (max-width: 900px) {
    display: flex;
  }
`;

const TextoEntrar = styled.button<{ $isHovered: boolean }>`
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  color: ${({ $isHovered }) => ($isHovered ? '#000000' : '#FFFFFF')};
  transition: color 0.3s ease;

  @media (max-width: 900px) {
    display: none; /* no celular só aparece a bolinha */
  }
`;

/* Cartão branco que cai embaixo da bolinha */
const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 14px);
  right: 0;
  min-width: 220px;
  padding: 8px 24px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  z-index: 1100;
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 16px 0;
  color: #1b1d20;
  text-decoration: none;
  font-size: 1rem;
  border-bottom: 1px solid #ececec;
  transition: opacity 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    opacity: 0.6;
  }
`;

function HeaderPerfil({ isHovered }: HeaderPerfilProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fecha ao clicar fora do dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggle = () => setIsOpen((open) => !open);

  return (
    <Wrapper ref={wrapperRef}>
      <EntrarPerfil>
        <CirculoPerfil
          $isHovered={isHovered}
          onClick={toggle}
          aria-label="Abrir menu da conta"
          aria-expanded={isOpen}
        >
          {/* Desktop */}
          <ImagemPerfil
            src={isHovered ? iconePreto : iconeBranco}
            alt=""
          />

          {/* Celular: pino com cor oposta à da bolinha */}
          <PinoWrapper>
            <IconePino cor={isHovered ? '#FFFFFF' : '#000000'} />
          </PinoWrapper>
        </CirculoPerfil>

        <TextoEntrar $isHovered={isHovered} onClick={toggle}>
          Entrar
        </TextoEntrar>
      </EntrarPerfil>

      {isOpen && (
        <Dropdown>
          <DropdownItem to="/login" onClick={() => setIsOpen(false)}>
            Entrar
          </DropdownItem>
          <DropdownItem to="/cadastro" onClick={() => setIsOpen(false)}>
            Criar conta
          </DropdownItem>
        </Dropdown>
      )}
    </Wrapper>
  );
}

export default HeaderPerfil;