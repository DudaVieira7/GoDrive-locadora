import { useRef } from 'react';
import styled from 'styled-components';
import HeroContent from './HeroContent';
import HeroScroll from './HeroScroll';
import videoHero from '../../../public/hero-locadora-site.mp4';

const HeroContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;   /* fallback para navegadores antigos */
  height: 100dvh;  /* altura real da tela no celular */
  min-height: 560px;
  overflow: hidden;
  flex: 1;

  @media (max-width: 600px) {
    min-height: 520px;
  }
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

function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <HeroContainer ref={heroRef}>
      <VideoBackground autoPlay muted loop playsInline>
        <source src={videoHero} type="video/mp4" />
      </VideoBackground>

      <Overlay />

      <HeroContent />

      <HeroScroll containerRef={heroRef} scrollTargetId="veiculos" />
    </HeroContainer>
  );
}

export default Hero;