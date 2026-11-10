import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FaBars, FaXmark } from 'react-icons/fa6';
import './Header.css';

import HeaderLogo from './HeaderLogo';
import HeaderNav from './HeaderNav';
import HeaderPerfil from './HeaderPerfil';

/* Só o que depende de estado fica no styled */
const HeaderContainer = styled.header<{ $isActive: boolean }>`
  background-color: ${({ $isActive }) =>
    $isActive ? '#FFFFFF' : 'transparent'};
  transition: background-color 0.3s ease;
  box-shadow: ${({ $isActive }) =>
    $isActive ? '0 2px 10px rgba(0,0,0,0.05)' : 'none'};
`;

const MenuButton = styled.button<{ $isActive: boolean }>`
  color: ${({ $isActive }) => ($isActive ? '#000000' : '#FFFFFF')};
  transition: color 0.3s ease;
`;

function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPerfilOpen, setIsPerfilOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Com qualquer painel aberto o header também fica branco,
  // senão os links brancos sumiriam no painel branco
  const isActive = isHovered || isScrolled || isMenuOpen || isPerfilOpen;

  const closeAll = useCallback(() => {
    setIsMenuOpen(false);
    setIsPerfilOpen(false);
  }, []);

  const closePerfil = useCallback(() => setIsPerfilOpen(false), []);

  const togglePerfil = () => {
    setIsPerfilOpen((open) => !open);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((open) => !open);
    setIsPerfilOpen(false);
  };

  return (
    <HeaderContainer
      className="header"
      $isActive={isActive}
      onMouseLeave={() => setIsHovered(false)}
    >
      <HeaderLogo isHovered={isActive} />

      <HeaderNav
        isHovered={isActive}
        isOpen={isMenuOpen}
        onHoverChange={setIsHovered}
        onLinkClick={closeAll}
      />

      <div className="headerRight">
        <HeaderPerfil
          isHovered={isActive}
          isOpen={isPerfilOpen}
          onHoverChange={setIsHovered}
          onToggle={togglePerfil}
          onClose={closePerfil}
          onLinkClick={closeAll}
        />

        <MenuButton
          className="menuButton"
          $isActive={isActive}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FaXmark /> : <FaBars />}
        </MenuButton>
      </div>
    </HeaderContainer>
  );
}

export default Header;