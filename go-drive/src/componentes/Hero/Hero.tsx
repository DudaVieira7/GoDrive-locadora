import { useRef } from 'react';
import styled from 'styled-components';
import HeroContent from './HeroContent';
import videoHero from '../../../public/hero-locadora-site.mp4';
import HeroScroll from './HeroScroll';

const HeroContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 700px;
  overflow: hidden;
  text-algin: center;
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



interface HeroProps {
  
  scrollTargetId?: string;
}

function Hero({ scrollTargetId }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <HeroContainer ref={heroRef}>
      <VideoBackground
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={videoHero} type="video/mp4" />
      </VideoBackground>

      <Overlay />
      
      <HeroContent/>

      <HeroScroll containerRef={heroRef} scrollTargetId={scrollTargetId} />
    </HeroContainer>
  );
}

export default Hero;