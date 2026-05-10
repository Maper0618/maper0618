interface TerminalLine {
  type: 'cmd' | 'output' | 'blank'
  text?: string
  html?: string
}

export function initTerminal() {
  const body = document.getElementById('terminalBody') as HTMLElement
  const soundToggle = document.getElementById('terminalSoundToggle')

  let audioCtx: AudioContext | null = null
  let soundEnabled = false

  function ensureAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume()
    }
  }

  function playTick() {
    if (!soundEnabled || !audioCtx) return
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    const now = audioCtx.currentTime
    const freq = 800 + Math.random() * 400
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, now)
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + 0.02)
    gain.gain.setValueAtTime(0.03, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02)
    osc.connect(gain)
    gain.connect(audioCtx.destination)
    osc.start(now)
    osc.stop(now + 0.025)
  }

  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      ensureAudio()
      soundEnabled = !soundEnabled
      soundToggle.textContent = soundEnabled ? '🔊' : '🔇'
      soundToggle.classList.toggle('is-on', soundEnabled)
    })
  }

  const lines: TerminalLine[] = [
    { type: 'cmd',    text: '$ whoami' },
    { type: 'output', html: '<span class="output">Maper0618</span>' },
    { type: 'blank' },
    { type: 'cmd',    text: '$ cat about.md' },
    { type: 'output', html: '<span class="output">一个试图用代码解释世界的人类</span>' },
    { type: 'output', html: '<span class="output">和AI同居的室友，不付房租的那种</span>' },
    { type: 'output', html: '<span class="output">擅长写bug然后debug，循环往复</span>' },
    { type: 'output', html: '<span class="link">💕 点击查看这个人类的出厂设置</span>' },
    { type: 'blank' },
    { type: 'cmd',    text: '$ echo "一个人+AI=一个团队，但加班只算一个人"' },
    { type: 'output', html: '<span class="highlight">✨（以及数不清的咖啡杯）</span>' },
  ]

  let lineEls: Array<{ el: HTMLElement; data: TerminalLine }> = []
  let cursorLine: HTMLElement | null = null
  let replayBtn: HTMLButtonElement | null = null
  let lineIdx = 0
  let timeouts: number[] = []

  function clearTimeouts() {
    timeouts.forEach((t) => clearTimeout(t))
    timeouts = []
  }

  function buildDOM() {
    body.innerHTML = ''
    lineEls = []
    lines.forEach((line) => {
      const div = document.createElement('div')
      div.className = 'terminal-line'
      if (line.type === 'blank') {
        div.innerHTML = '&nbsp;'
      }
      lineEls.push({ el: div, data: line })
      body.appendChild(div)
    })

    cursorLine = document.createElement('div')
    cursorLine.className = 'terminal-line visible'
    cursorLine.innerHTML = '<span class="terminal-cursor"></span>'
    cursorLine.style.opacity = '0'
    body.appendChild(cursorLine)

    if (!replayBtn) {
      replayBtn = document.createElement('button')
      replayBtn.className = 'terminal-replay-btn'
      replayBtn.textContent = '↻ 重播'
      replayBtn.addEventListener('click', startTyping)
    }
    replayBtn.style.display = 'none'
    body.appendChild(replayBtn)
  }

  function schedule(fn: () => void, delay: number) {
    timeouts.push(setTimeout(fn, delay))
  }

  function typeNextLine() {
    if (lineIdx >= lineEls.length) {
      if (cursorLine) cursorLine.style.opacity = '1'
      if (replayBtn) replayBtn.style.display = 'inline-block'
      return
    }

    const { el, data } = lineEls[lineIdx]
    el.classList.add('visible')
    lineIdx++

    if (data.type === 'blank') {
      schedule(typeNextLine, 150)
      return
    }

    if (data.type === 'cmd' && data.text) {
      typeText(el, data.text, 45, () => {
        schedule(typeNextLine, 300)
      })
    } else if (data.html) {
      const prefix = '<span class="cmd">&gt; </span>'
      el.innerHTML = prefix
      schedule(() => {
        el.innerHTML = prefix + data.html
        schedule(typeNextLine, 200)
      }, 120)
    }
  }

  function typeText(el: HTMLElement, text: string, speed: number, callback?: () => void) {
    const parts = text.match(/^(\$ )(.*)/)
    if (parts) {
      el.innerHTML = '<span class="cmd">$ </span>'
      const restText = parts[2]
      let charIdx = 0

      function typeChar() {
        if (charIdx < restText.length) {
          el.innerHTML = '<span class="cmd">$ </span><span class="cmd-text">' + restText.substring(0, charIdx + 1) + '</span>'
          charIdx++
          playTick()
          schedule(typeChar, speed + Math.random() * 30)
        } else {
          if (callback) callback()
        }
      }
      typeChar()
    } else {
      let charIdx = 0
      el.textContent = ''
      function typeChar() {
        if (charIdx < text.length) {
          el.textContent += text[charIdx]
          charIdx++
          playTick()
          schedule(typeChar, speed)
        } else {
          if (callback) callback()
        }
      }
      typeChar()
    }
  }

  function startTyping() {
    clearTimeouts()
    lineIdx = 0
    buildDOM()
    schedule(typeNextLine, 600)
  }

  startTyping()
}
