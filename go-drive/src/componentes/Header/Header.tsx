
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import HeaderLogo from './HeaderLogo';
import HeaderNav from './HeaderNav';
import HeaderPerfil from './HeaderPerfil';

const HeaderContainer = styled.header<{ $isActive: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 30px;
  height: 90px;
  align-items: center;

  position: sticky;
  top: 0;
  z-index: 1000;


  // Altera o fundo dependendo do estado recebido.
  // Se $isActive for true, o fundo será branco.
  // Se for false, será transparente.


  background-color: ${({ $isActive }) =>
    $isActive ? '#FFFFFF' : 'transparent'};

  transition: background-color 0.3s ease;

  box-shadow: ${({ $isActive }) =>
    $isActive ? '0 2px 10px rgba(0,0,0,0.05)' : 'none'};
`;

function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);


      // window.scrollY informa quantos pixels a página foi rolada.
      // Se for maior que 20, o estado será true.
      // Caso contrário, será false.

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Adiciona um ouvinte para detectar a rolagem da página.

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

      // Limpa o evento quando o componente é desmontado.
    // Evita manter um listener desnecessário.

    // [] significa que esse efeito é configurado
    // apenas na montagem do componente.

    // Verifica se o efeito deve estar ativo.
    // Se isHovered OU isScrolled forem true,
    // isActive também será true.
    
  const isActive = isHovered || isScrolled;

  return (
    <HeaderContainer
      $isActive={isActive}
      onMouseLeave={() => setIsHovered(false)}
    >
      <HeaderLogo isHovered={isActive} />

      <HeaderNav
        isHovered={isActive}
        onHoverChange={setIsHovered}
      />

      <HeaderPerfil isHovered={isActive} />
    </HeaderContainer>
  );
}

export default Header;
