export function initCursorGlow() {

  const glow = document.getElementById('cursorGlow')!
  let mx = 0, my = 0, gx = 0, gy = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animate() {
    gx += (mx - gx) * 0.08;
    gy += (my - gy) * 0.08;
    glow.style.left = gx + 'px';
    glow.style.top = gy + 'px';
    requestAnimationFrame(animate);
  }
  animate();

}
