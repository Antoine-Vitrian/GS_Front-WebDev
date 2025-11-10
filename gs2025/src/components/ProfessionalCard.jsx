import React from 'react'

export default function ProfessionalCard({ profile, onClick }) {
  return (
    <div onClick={onClick} className="cursor-pointer bg-white dark:bg-gray-800 rounded-xl shadow p-4 hover:shadow-lg transition">
      <div className="flex items-center gap-4">
        <img src={profile.foto} alt={profile.nome} className="w-16 h-16 rounded-full object-cover" />
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-100">{profile.nome}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-300">{profile.cargo}</p>
          <p className="text-xs mt-1 text-gray-400">{profile.localizacao}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {(profile.habilidadesTecnicas || []).slice(0,5).map((s, idx) => (
          <span key={idx} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">{s}</span>
        ))}
      </div>

      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{profile.resumo}</p>
    </div>
  )
}
