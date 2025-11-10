import React, { useMemo, useState } from 'react'
import SearchBar from '../components/SearchBar'
import Filters from '../components/Filters'
import ProfessionalCard from '../components/ProfessionalCard'
import ProfileModal from '../components/ProfileModal'

export default function Home({ profiles = [] }) {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState({ area: 'Todos', cidade: 'Todos', tech: 'Todos' })
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    let arr = profiles
    if (query) {
      const q = query.toLowerCase()
      arr = arr.filter(p => p.nome.toLowerCase().includes(q) || (p.resumo || '').toLowerCase().includes(q))
    }
    if (filters.area && filters.area !== 'Todos') {
      arr = arr.filter(p => p.area === filters.area)
    }
    if (filters.cidade && filters.cidade !== 'Todos') {
      arr = arr.filter(p => p.localizacao && p.localizacao.includes(filters.cidade))
    }
    if (filters.tech && filters.tech !== 'Todos') {
      arr = arr.filter(p => (p.habilidadesTecnicas || []).includes(filters.tech))
    }
    return arr
  }, [profiles, query, filters])

  // extrair opções para filtros
  const areas = ['Todos', ...Array.from(new Set(profiles.map(p => p.area).filter(Boolean)))]
  const cidades = ['Todos', ...Array.from(new Set(profiles.map(p => p.localizacao).filter(Boolean).map(l => l.split('/')[0])))]
  // techs simples: unificar todas as skills
  const techs = ['Todos', ...Array.from(new Set(profiles.flatMap(p => p.habilidadesTecnicas || [])))]

  return (
    <>
      <div className="mb-4 space-y-4">
        <SearchBar value={query} onChange={setQuery} />
        <Filters areas={areas} cidades={cidades} techs={techs} filters={filters} setFilters={setFilters} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(p => (
          <ProfessionalCard key={p.Id} profile={p} onClick={() => setSelected(p)} />
        ))}
      </div>

      {selected && (
        <ProfileModal profile={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
