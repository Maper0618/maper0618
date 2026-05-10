export function initParallax() {

  const terminalWin = document.querySelector<HTMLElement>('.terminal-window');
  if (!terminalWin) return;

  window.addEventListener('scroll', () => {
    const st = window.pageYOffset;
    if (st < window.innerHeight) {
      const ratio = st / window.innerHeight;
      terminalWin.style.transform = `translateY(${st * 0.15}px)`;
      terminalWin.style.opacity = String(1 - ratio * 0.6);
    }
  }, { passive: true });

}
