
import styled from 'styled-components';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

// Propriedades que o componente aceita
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode; // dentro do  botão pode entrar texto/ ícones etc...

  background?: string;
  color?: string;
  fontSize?: string;
  fontFamily?: string;
  fontWeight?: string;

  width?: string;
  height?: string;
  padding?: string;

  border?: string;
  borderColor?: string;
  borderWidth?: string;
  borderStyle?: string;
  borderRadius?: string;

  hoverBackground?: string;
  hoverColor?: string;
  cursor?: string;
}

// Propriedades utilizadas somente na estilização
interface StyledButtonProps {
  $background: string;
  $color: string;
  $fontSize: string;
  $fontWeight: string;
  $fontFamily: string;

  $width: string;
  $height: string;
  $padding: string;

  $border: string;
  $borderColor: string;
  $borderWidth: string;
  $borderStyle: string;
  $borderRadius: string;

  $hoverBackground: string;
  $hoverColor: string;
  $cursor: string;
}

// Estilização
const StyledButton = styled.button<StyledButtonProps>`
  background: ${({ $background }) => $background};
  color: ${({ $color }) => $color};
  font-family: ${({$fontFamily}) => $fontFamily};
  font-size: ${({ $fontSize }) => $fontSize};
  font-weight: ${({ $fontWeight }) => $fontWeight};

  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  padding: ${({ $padding }) => $padding};

  border: ${({ $border }) => $border};
  border-color: ${({ $borderColor }) => $borderColor};
  border-width: ${({ $borderWidth }) => $borderWidth};
  border-style: ${({ $borderStyle }) => $borderStyle};
  border-radius: ${({ $borderRadius }) => $borderRadius};

  cursor: ${({ $cursor }) => $cursor};

  transition: all 0.3s ease;

  &:hover {
    background: ${({ $hoverBackground }) => $hoverBackground};
    color: ${({ $hoverColor }) => $hoverColor};
  }
`;

// Componente
function Button({
  children = 'Clique aqui',

  background = '#84ff00',
  color = '#000000',
  fontSize = '16px',
  fontWeight = '400',
  fontFamily= 'Poppins',

  width = 'fit-content',
  height = 'auto',
  padding = '20px',

  border = 'none',
  borderColor = 'transparent',
  borderWidth = '0px',
  borderStyle = 'solid',
  borderRadius = '50px',

  hoverBackground = '#72df00',
  hoverColor = '#000000',
  cursor = 'pointer',

  ...buttonProps
}: ButtonProps) {

  return (
    <StyledButton
      $background={background}
      $color={color}
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      $fontFamily={fontFamily}
      $width={width}
      $height={height}
      $padding={padding}

      $border={border}
      $borderColor={borderColor}
      $borderWidth={borderWidth}
      $borderStyle={borderStyle}
      $borderRadius={borderRadius}

      $hoverBackground={hoverBackground}
      $hoverColor={hoverColor}
      $cursor={cursor}

      {...buttonProps}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
