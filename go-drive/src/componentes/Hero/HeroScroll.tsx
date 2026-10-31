import { useCallback, useEffect, useRef, type RefObject } from 'react';
import styled, { css, keyframes } from 'styled-components';

// true  = respeita "reduzir movimento" do sistema (animação e snap desligados)
// false = sempre anima, mesmo com "reduzir movimento" ativado
const RESPECT_REDUCED_MOTION = false;

const SNAP_LOCK_MS = 1000;   // tempo em que ignora novos gestos após um snap
const TOUCH_THRESHOLD = 40;  // distância mínima do swipe (px)
const EDGE_TOLERANCE = 10;   // margem (px) para considerar "chegou no topo"

interface ScrollDownProps {
  /** seção (ex.: o hero) dentro da qual o indicador aparece e de onde o snap parte */
  containerRef: RefObject<HTMLElement | null>;
  /** id do elemento até onde descer; se omitido, usa a próxima seção da página */
  scrollTargetId?: string;
}

/* ---------- Estilos ---------- */

// A linha cresce a partir do topo até o tamanho total e depois
// "some" encolhendo em direção à base.
const scrollLine = keyframes`
  0% {
    transform: scaleY(0);
    transform-origin: top;
    animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
  }
  45% {
    transform: scaleY(1);
    transform-origin: top;
  }
  50% {
    transform: scaleY(1);
    transform-origin: bottom;
    animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
  }
  95%, 100% {
    transform: scaleY(0);
    transform-origin: bottom;
  }
`;

const Button = styled.button`
  position: absolute;
  right: 3%;
  bottom: 12%;
  z-index: 2;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;

  padding: 8px;
  border: none;
  background: transparent;

  color: white;

  opacity: 0.85;
  transition: opacity 0.2s ease;

  &:hover,
  &:focus-visible {
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid #84ff00;
    outline-offset: 4px;
    border-radius: 8px;
  }
`;

const Label = styled.span`
  writing-mode: vertical-rl;

  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

const Track = styled.span`
  position: relative;
  display: block;

  width: 1px;
  height: 140px;

  &::after {
    content: '';
    position: absolute;
    inset: 0;

    background: linear-gradient(to bottom, #84ff00 0%, #84ff00 70%, #ffffff 100%);
    animation: ${scrollLine} 2.8s infinite;
  }

  ${RESPECT_REDUCED_MOTION &&
  css`
    @media (prefers-reduced-motion: reduce) {
      &::after {
        animation: none;
        transform: scaleY(0.4);
      }
    }
  `}
`;

/* ---------- Componente ---------- */

function HeroScroll({ containerRef, scrollTargetId }: ScrollDownProps) {
  const isSnapping = useRef(false);

  const getTarget = useCallback((): HTMLElement | null => {
    if (scrollTargetId) return document.getElementById(scrollTargetId);
    return containerRef.current?.nextElementSibling as HTMLElement | null;
  }, [containerRef, scrollTargetId]);

  const lock = () => {
    isSnapping.current = true;
    window.setTimeout(() => {
      isSnapping.current = false;
    }, SNAP_LOCK_MS);
  };

  const goDown = useCallback(() => {
    lock();
    const target = getTarget();

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Sem seção seguinte: rola o equivalente ao que resta do hero
      const bottom = containerRef.current?.getBoundingClientRect().bottom;
      window.scrollBy({ top: bottom ?? window.innerHeight, behavior: 'smooth' });
    }
  }, [containerRef, getTarget]);

  const goUp = useCallback(() => {
    lock();
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [containerRef]);

  // Snap: ao rolar para baixo no hero, desce sozinho até a próxima seção
  useEffect(() => {
    if (
      RESPECT_REDUCED_MOTION &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let touchStartY = 0;
    let touchHandled = false;

    // O hero ainda aparece na tela (a seção seguinte não chegou ao topo)
    const inHero = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      return !!rect && rect.bottom > EDGE_TOLERANCE;
    };

    // A seção seguinte está encostada no topo da tela
    const atTarget = () => {
      const rect = getTarget()?.getBoundingClientRect();
      return !!rect && Math.abs(rect.top) <= EDGE_TOLERANCE;
    };

    const handleWheel = (e: WheelEvent) => {
      if (isSnapping.current) {
        e.preventDefault();
        return;
      }

      if (e.deltaY > 0 && inHero()) {
        e.preventDefault();
        goDown();
      } else if (e.deltaY < 0 && atTarget()) {
        e.preventDefault();
        goUp();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchHandled = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isSnapping.current) {
        e.preventDefault();
        return;
      }
      if (touchHandled) return;

      const diff = touchStartY - e.touches[0].clientY; // >0 = dedo subindo

      if (diff > TOUCH_THRESHOLD && inHero()) {
        e.preventDefault();
        touchHandled = true;
        goDown();
      } else if (diff < -TOUCH_THRESHOLD && atTarget()) {
        e.preventDefault();
        touchHandled = true;
        goUp();
      }
    };

    // passive: false é necessário para poder usar preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [containerRef, getTarget, goDown, goUp]);

  return (
    <Button
      type="button"
      onClick={goDown}
      aria-label="Rolar para a próxima seção"
    >
      <Track aria-hidden="true" />
      <Label>Rolar</Label>
    </Button>
  );
}

export default HeroScroll;