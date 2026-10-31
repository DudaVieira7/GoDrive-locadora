import styled from "styled-components";
import '@fontsource-variable/science-gothic';
import Button from "../Button/Button";


const ContentHero = styled.div`
  position: relative;
  z-index: 1;

  display: flex;
  flex-direction: column;
  gap: 50px;
  justify-content: center;

  height: 100%;
  padding: 0 9%;
  color: white;
`;

const HeroTitle = styled.h1`
  max-width: 700px;
  font-size: 2.5rem;
  font-weight: 700;
  
`;



function HeroContent() {
  return (

      <ContentHero>
        <HeroTitle>
        Sua próxima grande história começa ao volante.
        </HeroTitle>
       
        <Button
            background="#84ff00"
            color="#000000"
            fontSize="16px"
            fontWeight="700"
            width="300px"
            height="75px"
            padding="0"
            borderRadius="50px"  
        >
       Reservar Agora
        </Button>
      </ContentHero>
  )
}

export default HeroContent
