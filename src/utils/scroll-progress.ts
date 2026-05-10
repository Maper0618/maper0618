export function initScrollProgress() {

  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const st = window.pageYOffset;
    const sh = document.documentElement.scrollHeight - window.innerHeight;
    const pct = sh > 0 ? (st / sh) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });

}
