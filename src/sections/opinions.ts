export function initOpinions() {

  const slides = document.querySelectorAll<HTMLElement>('[data-opinion]')
  const dots = document.querySelectorAll<HTMLElement>('.opinion-dot')
  if (!slides.length) return;
  let current = 0;

  function show(idx: number) {
    slides.forEach((s, i) => {
      s.style.display = i === idx ? 'flex' : 'none';
      if (i === idx) {
        s.querySelector('.opinion-text')?.classList.remove('is-visible');
        requestAnimationFrame(() => {
          s.querySelector('.opinion-text')?.classList.add('is-visible');
        });
      }
    });
    dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
    current = idx;
  }

  dots.forEach((dot, idx: number) => {
    dot.addEventListener('click', () => show(idx));
  });

  setInterval(() => {
    show((current + 1) % slides.length);
  }, 6000);

}
