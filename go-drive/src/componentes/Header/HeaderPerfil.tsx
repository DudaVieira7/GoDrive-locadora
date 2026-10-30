
import styled from 'styled-components';

import iconeBranco from '../../assets/iconePerfilBranco.png';
import iconePreto from '../../assets/iconePerfilPreto.svg';

interface HeaderPerfilProps {
  isHovered: boolean;
}

const HeaderItens = styled.a<{ $isHovered: boolean }>`
  text-decoration: none;
  color: ${({ $isHovered }) =>
    $isHovered ? '#000000' : '#FFFFFF'};
  transition: color 0.3s ease;
`;

const ImagemPerfil = styled.img`
  width: 27px;
  height: auto;
  object-fit: contain;
`;

const EntrarPerfil = styled.nav`
  height: 30px;
  display: flex;
  gap: 10px;
  align-items: center;
`;

function HeaderPerfil({ isHovered }: HeaderPerfilProps) {
  return (
    <EntrarPerfil>
      <ImagemPerfil
        src={isHovered ? iconePreto : iconeBranco}
        alt="Ícone de perfil"
      />

      <HeaderItens href="#" $isHovered={isHovered}>
        Entrar
      </HeaderItens>
    </EntrarPerfil>
  );
}

export default HeaderPerfil;
