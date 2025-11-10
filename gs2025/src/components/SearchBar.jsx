import React from 'react'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="flex">
      <input value={value} onChange={e => onChange(e.target.value)} placeholder="Buscar por nome, cargo ou resumo..." className="w-full px-4 py-3 rounded-md border focus:outline-none" />
    </div>
  )
}
