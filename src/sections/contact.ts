import { showToast } from "../utils/toast";
export function initContact() {

  const emailLink = document.getElementById('copyEmail');
  if (!emailLink) return;
  emailLink.addEventListener('click', (e) => {
    e.preventDefault();
    const email = emailLink.dataset.email || '';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        showToast && showToast('📋 已复制，但我不保证会回');
      });
    } else {
      const ta = document.createElement('textarea');
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast && showToast('📋 已复制，但我不保证会回');
    }
  });

}
