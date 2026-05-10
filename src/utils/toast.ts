export function showToast(message: string) {
  let container = document.getElementById('toastContainer')
  if (!container) {
    container = document.createElement('div')
    container.id = 'toastContainer'
    container.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);z-index:9999;display:flex;flex-direction:column;gap:0.5rem;pointer-events:none;'
    document.body.appendChild(container)
  }
  const el = document.createElement('div')
  el.textContent = message
  el.style.cssText = 'background:#1a1a1a;color:#fff;padding:0.75rem 1.5rem;border-radius:8px;font-size:0.9rem;opacity:0;transform:translateY(10px);transition:all 0.3s;box-shadow:0 4px 20px rgba(0,0,0,0.2);'
  container.appendChild(el)
  requestAnimationFrame(() => {
    el.style.opacity = '1'
    el.style.transform = 'translateY(0)'
  })
  setTimeout(() => {
    el.style.opacity = '0'
    el.style.transform = 'translateY(-10px)'
    setTimeout(() => el.remove(), 300)
  }, 2500)
}

export function initToast() {
  // Handle placeholder links with data-toast message
  document.querySelectorAll('a[data-toast]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault()
      const msg = (a as HTMLElement).dataset.toast || '🚧 这里还在施工，下次一定更新！'
      showToast(msg)
    })
  })

  // Handle generic # links
  document.querySelectorAll('a[href="#"]:not([data-toast])').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault()
      showToast('🚧 这里还在施工，下次一定更新！')
    })
  })
}
