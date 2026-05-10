interface TimelineItem {
  era: string
  side: 'left' | 'right'
  chats: Array<{ name: string; msg: string; isMe?: boolean }>
}

const timelineData: TimelineItem[] = [
  {
    era: '求学时期',
    side: 'left',
    chats: [
      { name: '采访者', msg: '你先简单介绍一下自己？' },
      { name: 'Maper0618', msg: '一个试图用代码解释世界的人类，和AI同居的室友，不付房租的那种', isMe: true },
      { name: '采访者', msg: '为什么会选择编程这条路？' },
      { name: 'Maper0618', msg: '因为写代码不用看老板脸色，只需要看编译器脸色', isMe: true },
    ]
  },
  {
    era: '觉醒时期',
    side: 'right',
    chats: [
      { name: '采访者', msg: '你现在在做什么？' },
      { name: 'Maper0618', msg: '在bug和feature之间反复横跳', isMe: true },
      { name: '采访者', msg: '对未来有什么规划？' },
      { name: 'Maper0618', msg: '先让这个网站不报错，其他的再说', isMe: true },
    ]
  }
]

export function initJourney() {
  const container = document.querySelector('.journey-timeline')
  if (!container) return

  timelineData.forEach((item, index) => {
    const itemEl = document.createElement('div')
    itemEl.className = `timeline-item timeline-item--${item.side}`
    itemEl.style.animationDelay = `${index * 0.2}s`

    const eraEl = document.createElement('div')
    eraEl.className = 'timeline-era'
    eraEl.textContent = item.era

    const chatEl = document.createElement('div')
    chatEl.className = 'timeline-chats'

    item.chats.forEach(chat => {
      const bubble = document.createElement('div')
      bubble.className = `jchat jchat--${chat.isMe ? 'me' : 'other'}`
      bubble.innerHTML = `
        <div class="jchat-name">${chat.name}</div>
        <div class="jchat-msg">${chat.msg}</div>
      `
      chatEl.appendChild(bubble)
    })

    itemEl.appendChild(eraEl)
    itemEl.appendChild(chatEl)
    container.appendChild(itemEl)
  })
}
