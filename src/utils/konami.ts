import { showToast } from "./toast";
export function initKonami() {

  const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let idx = 0;
  document.addEventListener('keydown', (e) => {
    if (e.key === code[idx]) {
      idx++;
      if (idx === code.length) {
        idx = 0;
        document.body.style.transition = 'transform 0.5s';
        document.body.style.transform = 'rotate(360deg)';
        setTimeout(() => {
          document.body.style.transform = '';
          showToast && showToast('🎉 彩蛋触发！你才是真正的玩家！');
        }, 500);
      }
    } else {
      idx = 0;
    }
  });

}
