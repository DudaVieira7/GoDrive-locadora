import styled from 'styled-components';
import Header from '../Header/Header';
import videoHero from '../../../public/hero-locadora-site.mp4';

const HeroContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;
  z-index: 0;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;

  background: rgba(0, 0, 0, 0.45);
  z-index: 1;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;

  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 100%;
  padding: 0 9%;
  color: white;
`;

const HeroTitle = styled.h1`
  max-width: 550px;
  font-size: 2.5rem;
  font-weight: 700;
`;

const HeroButton = styled.button`
  width: fit-content;
  padding: 20px 30px;

  border: none;
  border-radius: 50px;

  background-color: #84ff00;
  color: black;

  font-weight: 700;
  cursor: pointer;
`;

function Hero() {
  return (
    <HeroContainer>
      <VideoBackground
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={videoHero} type="video/mp4" />
      </VideoBackground>

      <Overlay />

      <Header />

      <HeroContent>
        <HeroTitle>
          Encontre o seu próximo veículo
        </HeroTitle>

        <HeroButton>
          Encontre seu próximo caminho.
        </HeroButton>
      </HeroContent>
    </HeroContainer>
  );
}

export default Hero;