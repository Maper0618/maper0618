export function initNav() {

  const nav = document.getElementById('siteNav')!
  const sections = ['aboutSection', 'opinionsSection', 'projectsSection', 'worksSection', 'contactSection'];
  const navLinks = document.querySelectorAll('.nav-link');
  let lastSt = 0;

  window.addEventListener('scroll', () => {
    const st = window.pageYOffset;
    // Show nav after scrolling past hero
    if (st > window.innerHeight * 0.5) {
      nav.classList.add('is-visible');
    } else {
      nav.classList.remove('is-visible');
    }
    // Highlight active section
    sections.forEach((id, idx) => {
      const sec = document.getElementById(id);
      if (!sec) return;
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        navLinks.forEach(l => l.classList.remove('is-active'));
        if (navLinks[idx]) navLinks[idx].classList.add('is-active');
      }
    });
    lastSt = st;
  }, { passive: true });

}
