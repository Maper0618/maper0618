export function initFooter() {

  const slogans = [
    '© 2026 Maper0618 · 用咖啡因和Ctrl+S搭建 · 如有bug，那是feature',
    '© 2026 Maper0618 · "It works on my machine"',
    '© 2026 Maper0618 · // 这段代码我也不懂，但别删',
    '© 2026 Maper0618 · git commit -m "fix"',
    '© 2026 Maper0618 · 404: 睡眠未找到',
    '© 2026 Maper0618 · console.log("Hello World")',
    '© 2026 Maper0618 · rm -rf /（已撤销）',
    '© 2026 Maper0618 · npm install 人生',
  ];
  const el = document.getElementById('footerSlogan');
  if (el) {
    el.textContent = slogans[Math.floor(Math.random() * slogans.length)];
  }

}
