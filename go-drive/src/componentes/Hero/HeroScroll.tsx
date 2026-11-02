import { useCallback, useEffect, useRef, type RefObject } from 'react';
import styled, { css, keyframes } from 'styled-components';

const RESPECT_REDUCED_MOTION = false;

const SNAP_DURATION = 1300;   // duração da descida (ms) - aumente para ficar mais lento
const WHEEL_THRESHOLD = 60;   // quanto o usuário precisa rolar antes do snap disparar
const TOUCH_THRESHOLD = 60;   // distância mínima do swipe (px)
const EDGE_TOLERANCE = 10;    // margem (px) para considerar "chegou no topo"

interface ScrollDownProps {
  containerRef: RefObject<HTMLElement | null>;
  scrollTargetId?: string;
}

/* ---------- Animação de scroll ---------- */

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function animateScrollTo(targetY: number, duration: number, onDone: () => void) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  const step = (now: number) => {
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      onDone();
    }
  };

  requestAnimationFrame(step);
}

/* ---------- Estilos ---------- */

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
  cursor: pointer;

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
  alin-items: flex-end;
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



function HeroScroll({ containerRef, scrollTargetId }: ScrollDownProps) {
  const isSnapping = useRef(false);

  const getTarget = useCallback((): HTMLElement | null => {
    if (scrollTargetId) return document.getElementById(scrollTargetId);
    return containerRef.current?.nextElementSibling as HTMLElement | null;
  }, [containerRef, scrollTargetId]);

  const snapTo = useCallback((y: number) => {
    isSnapping.current = true;
    animateScrollTo(y, SNAP_DURATION, () => {
      isSnapping.current = false;
    });
  }, []);

  const goDown = useCallback(() => {
    const target = getTarget();
    const y = target
      ? target.getBoundingClientRect().top + window.scrollY
      : (containerRef.current?.getBoundingClientRect().bottom ?? window.innerHeight) +
        window.scrollY;

    snapTo(y);
  }, [containerRef, getTarget, snapTo]);

  const goUp = useCallback(() => {
    const top = containerRef.current
      ? containerRef.current.getBoundingClientRect().top + window.scrollY
      : 0;

    snapTo(top);
  }, [containerRef, snapTo]);

  useEffect(() => {
    if (
      RESPECT_REDUCED_MOTION &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let wheelAcc = 0;
    let wheelTimer: number | undefined;
    let touchStartY = 0;
    let touchHandled = false;

    const inHero = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      return !!rect && rect.bottom > EDGE_TOLERANCE;
    };

    const atTarget = () => {
      const rect = getTarget()?.getBoundingClientRect();
      return !!rect && Math.abs(rect.top) <= EDGE_TOLERANCE;
    };

    const handleWheel = (e: WheelEvent) => {
      if (isSnapping.current) {
        e.preventDefault();
        return;
      }

      const goingDown = e.deltaY > 0 && inHero();
      const goingUp = e.deltaY < 0 && atTarget();
      if (!goingDown && !goingUp) return;

      e.preventDefault();

      
      wheelAcc += e.deltaY;
      window.clearTimeout(wheelTimer);
      wheelTimer = window.setTimeout(() => (wheelAcc = 0), 150);

      if (goingDown && wheelAcc >= WHEEL_THRESHOLD) {
        wheelAcc = 0;
        goDown();
      } else if (goingUp && wheelAcc <= -WHEEL_THRESHOLD) {
        wheelAcc = 0;
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

      const diff = touchStartY - e.touches[0].clientY;

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

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.clearTimeout(wheelTimer);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [containerRef, getTarget, goDown, goUp]);

  return (
    <Button type="button" onClick={goDown} aria-label="Rolar para a próxima seção">
      <Track aria-hidden="true" />
      <Label>Rolar</Label>
    </Button>
  );
}

export default HeroScroll;