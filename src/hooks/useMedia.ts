'use client';

import { useSyncExternalStore } from 'react';

function createMediaQuery(query: string) {
  if (typeof window === 'undefined') return null;
  return window.matchMedia(query);
}

export function useIsMobile(query = '(max-width: 768px)') {
  const mql = createMediaQuery(query);

  function getSnapshot() {
    return mql?.matches ?? false;
  }

  function subscribe(callback: () => void) {
    mql?.addEventListener('change', callback);
    return () => mql?.removeEventListener('change', callback);
  }

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

const reducedMql = createMediaQuery('(prefers-reduced-motion: reduce)');

function getReducedSnapshot() {
  return reducedMql?.matches ?? false;
}

function subscribeReduced(callback: () => void) {
  reducedMql?.addEventListener('change', callback);
  return () => reducedMql?.removeEventListener('change', callback);
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeReduced, getReducedSnapshot, () => false);
}
