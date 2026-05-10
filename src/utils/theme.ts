export function initTheme() {

  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') root.classList.add('dark');
  btn.textContent = root.classList.contains('dark') ? '☀️' : '🌙';
  btn.addEventListener('click', () => {
    root.classList.toggle('dark');
    const isDark = root.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    btn.textContent = isDark ? '☀️' : '🌙';
  });

}
