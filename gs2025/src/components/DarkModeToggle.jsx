import React, { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('dark')
    if (saved) return saved === 'true'
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const html = document.documentElement
    if (isDark) html.classList.add('dark')
    else html.classList.remove('dark')
    localStorage.setItem('dark', isDark.toString())
  }, [isDark])

  return (
    <button onClick={() => setIsDark(s => !s)} className="px-3 py-2 rounded-md border">
      {isDark ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}
