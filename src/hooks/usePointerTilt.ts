import { useEffect, useRef } from 'react';

const MAX_T = 6;
const MAX_Y = 8;
const EASE = 0.12;

export function usePointerTilt<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const state = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0, raf: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isReduced = media.matches || !window.matchMedia('(pointer: fine)').matches;
    if (isReduced) return;

    const onMove = (e: PointerEvent) => {
      state.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      state.current.targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const tick = () => {
      const s = state.current;
      s.currentX += (s.targetX - s.currentX) * EASE;
      s.currentY += (s.targetY - s.currentY) * EASE;

      const rotateY = s.currentX * MAX_Y;
      const rotateX = -s.currentY * MAX_T;

      el.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
      s.raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    state.current.raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(state.current.raf);
    };
  }, []);

  return ref;
}