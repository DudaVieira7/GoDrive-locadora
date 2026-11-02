import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface HeaderNavProps {
  isHovered: boolean;
  isOpen: boolean;
  onHoverChange: (hovered: boolean) => void;
  onLinkClick: () => void;
}

const HeaderItens = styled(Link)<{ $isHovered: boolean }>`
  text-decoration: none;
  color: ${({ $isHovered }) =>
    $isHovered ? '#000000' : '#FFFFFF'};
  font-weight: 300;
  font-size: 1rem;

  transition: color 0.3s ease;
`;

function HeaderNav({ isHovered, isOpen, onHoverChange, onLinkClick }: HeaderNavProps) {
  const headerLinks = ['Frota', 'Planos', 'Sobre', 'Contato'];

  return (
    <nav
      className={`headerNav ${isOpen ? 'open' : ''}`}
      onMouseEnter={() => onHoverChange(true)}
    >
      {headerLinks.map((link) => (
        <HeaderItens
          key={link}
          to={`/${link.toLowerCase()}`}
          $isHovered={isHovered}
          onClick={onLinkClick}
        >
          {link}
        </HeaderItens>
      ))}
    </nav>
  );
}

export default HeaderNav;