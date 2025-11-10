import React from 'react'

export default function Filters({ areas = [], cidades = [], techs = [], filters, setFilters }) {
  return (
    <div className="flex gap-3 flex-wrap">
      <select value={filters.area} onChange={e => setFilters(f => ({ ...f, area: e.target.value }))} className="p-2 rounded-md border">
        {areas.map(a => <option key={a} value={a}>{a}</option>)}
      </select>

      <select value={filters.cidade} onChange={e => setFilters(f => ({ ...f, cidade: e.target.value }))} className="p-2 rounded-md border">
        {cidades.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <select value={filters.tech} onChange={e => setFilters(f => ({ ...f, tech: e.target.value }))} className="p-2 rounded-md border">
        {techs.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
    </div>
  )
}
