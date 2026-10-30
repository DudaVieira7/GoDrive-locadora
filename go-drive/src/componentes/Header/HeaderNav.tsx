
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface HeaderNavProps {
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
}

const HeaderLinks = styled.nav`
  display: flex;
  max-width: 600px;
  width: 100%;
  justify-content: space-between;
`;

const HeaderItens = styled(Link)<{ $isHovered: boolean }>`
  text-decoration: none;
  color: ${({ $isHovered }) =>
    $isHovered ? '#000000' : '#FFFFFF'};
  font-weight: 300;
  font-size: 1rem;

  transition: color 0.3s ease;
`;

function HeaderNav({ isHovered, onHoverChange }: HeaderNavProps) {
  const headerLinks = [
    'Frota',
    'Planos',
    'Sobre',
    'Contato'
  ];

  return (
    <HeaderLinks
      onMouseEnter={() => onHoverChange(true)}
    >
      {headerLinks.map((link) => (
        <HeaderItens
          key={link}
          to={`/${link.toLowerCase()}`}
          $isHovered={isHovered}
        >
          {link}
        </HeaderItens>
      ))}
    </HeaderLinks>
  );
}

export default HeaderNav;
