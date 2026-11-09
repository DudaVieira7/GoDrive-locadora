import styled from 'styled-components'
import type { ReactNode } from 'react'


const CardContainer = styled.section<{ $maxWidth: string; $padding: string }>`
  background:
    radial-gradient(
      ellipse 55% 150% at 8% 70%,
      #84ff0019 7%,
      #84ff003a 25%,
      rgba(0, 0, 0, 0) 75%
    ),
    rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(20px) saturate(200%);
  -webkit-backdrop-filter: blur(20px) saturate(200%);

  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    inset 0 0.3px 0 #84ff00,
    0 20px 60px rgba(0, 0, 0, 0.6);

  width: 90%;
  max-width: ${({ $maxWidth }) => $maxWidth};
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ $padding }) => $padding};
  gap: 20px;
  border-radius: 30px;
  box-sizing: border-box;

  /* Organiza os elementos filhos */
  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;





interface CardPopUpProps {
  children: ReactNode;
  maxWidth?: string;
  padding?: string;
}

function CardPopUp({ children, maxWidth = '700px', padding = '40px' }: CardPopUpProps) {
  return (
    <CardContainer $maxWidth={maxWidth} $padding={padding}>
      
      <div>{children}</div>
    </CardContainer>
  );
}

export default CardPopUp;