import styled from "styled-components";
import '@fontsource-variable/science-gothic';
import Button from "../Button/Button";
import { useNavigate } from 'react-router-dom';

const ContentHero = styled.section`
  position: relative;
  z-index: 1;

  display: flex;
  flex-direction: column;
  gap: 50px;
  justify-content: center;

  box-sizing: border-box;
  height: 100vh;
  padding: 0 9%;
  color: white;

  @media (max-width: 600px) {
    gap: 32px;
    padding: 0 6%;
  }
`;

const HeroTitle = styled.h1`
  max-width: 700px;
  text-align: left;
  font-size: 2.5rem;
  font-weight: 700;

  @media (max-width: 600px) {
    font-size: 1.6rem;
    line-height: 1.8;
  }
`;

// faz o botão ocupar toda a largura do container, mas respeitando o tamanho máximo definido no próprio botão
const ButtonWrapper = styled.div` 
  width: 300px;
  height: 75px;

  @media (max-width: 600px) {
    width: 100%;
    max-width: 260px;
    height: 60px;
  }



`;

function HeroContent() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/contato');
  };

  return (
    <ContentHero>
      <HeroTitle>
        Sua próxima grande história começa ao volante.
      </HeroTitle>

      <ButtonWrapper>
        <Button
          background="#84ff00"
          color="#000000"
          fontSize="16px"
          fontWeight="700"
          width="100%"
          height="100%"
          padding="0"
          borderRadius="50px"
          onClick={handleNavigate}
        >
          Reservar Agora
        </Button>
      </ButtonWrapper>
    </ContentHero>
  );
}

export default HeroContent;