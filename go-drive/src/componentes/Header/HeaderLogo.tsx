
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import logoBranca from '../../assets/goDrive_logoBranca.png';
import logoPreta from '../../assets/goDrive_logoPreta.svg';

interface HeaderLogoProps {
  isHovered: boolean;
}

const LogoImage = styled.img`
  width: 130px;
  height: auto;
  object-fit: contain;
  cursor: pointer;
  transition: opacity 0.3s ease;



@media (max-width: 360px) {
  width: 95px;
}

`;

function HeaderLogo({ isHovered }: HeaderLogoProps) {
  return (
    <Link to="/">
      <LogoImage
        src={isHovered ? logoPreta : logoBranca}
        alt="Logo GoDrive"
      />
    </Link>
  );
}

export default HeaderLogo;
