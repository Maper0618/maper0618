export function initStarfield() {

  const canvas = document.getElementById('starfield') as HTMLCanvasElement;
  if (!canvas) return;
  const parent = canvas.parentElement!
  if (!parent) return
  const ctx = canvas.getContext('2d')!
  let stars: Array<{ x: number; y: number; r: number; speed: number; alpha: number; twinkleSpeed: number; twinkleOffset: number }> = []
  let animId: number | null = null
  const STAR_COUNT = 80;

  function resize() {
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.3,
        speed: Math.random() * 0.15 + 0.05,
        alpha: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }
  }
  createStars();

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const time = Date.now() * 0.001;
    stars.forEach(s => {
      const alpha = s.alpha + Math.sin(time * s.twinkleSpeed * 10 + s.twinkleOffset) * 0.2;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,210,230,${Math.max(0, Math.min(1, alpha))})`;
      ctx.fill();
      s.y += s.speed;
      if (s.y > canvas.height) {
        s.y = 0;
        s.x = Math.random() * canvas.width;
      }
    });
    animId = requestAnimationFrame(draw);
  }

  // Only animate when dark mode is active
  function checkDark() {
    const isDark = document.documentElement.classList.contains('dark') ||
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark && !animId) {
      draw();
    } else if (!isDark && animId) {
      cancelAnimationFrame(animId);
      animId = null;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  const darkObserver = new MutationObserver(checkDark);
  darkObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  checkDark();

}
