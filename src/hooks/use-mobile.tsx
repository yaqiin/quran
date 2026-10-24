import * as React from 'react';

const MOBILE_BREAKPOINT = 768;

const queryIsMobile = () => typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT;

export function useIsMobile() {
  // Read the viewport on first render: starting at `false` made phones briefly behave like desktop,
  // which snapped even pages back to the previous odd one before the real value arrived.
  const [isMobile, setIsMobile] = React.useState<boolean>(queryIsMobile);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(queryIsMobile());
    };
    mql.addEventListener('change', onChange);
    setIsMobile(queryIsMobile());
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return isMobile;
}
