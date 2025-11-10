import React from 'react'

export default function ProfessionalCard({ profile, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        group cursor-pointer bg-white dark:bg-slate-800 rounded-2xl 
        shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300
        border border-gray-100 dark:border-slate-700 overflow-hidden
      "
    >
      {/* Header com imagem e info */}
      <div className="flex items-center gap-4 p-5">
        <div className="relative">
          <img
            src={profile.foto}
            alt={profile.nome}
            className="
              w-16 h-16 rounded-full object-cover ring-2 ring-primary/30 
              group-hover:ring-primary transition-all duration-300
            "
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {profile.nome}
          </h3>
          <p className="text-sm text-primary font-medium">{profile.cargo}</p>
          <p className="text-xs mt-1 text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 12.414A5 5 0 1112.414 13.414l4.243 4.243z"
              />
            </svg>
            {profile.localizacao}
          </p>
        </div>
      </div>

      {/* Habilidades */}
      <div className="px-5 pb-4 flex flex-wrap gap-2">
        {(profile.habilidadesTecnicas || []).slice(0, 5).map((s, idx) => (
          <span
            key={idx}
            className="
              text-xs px-3 py-1 rounded-full 
              bg-primary/10 text-primary dark:bg-primary/20
              font-medium
            "
          >
            {s}
          </span>
        ))}
      </div>

      {/* Resumo */}
      <div className="px-5 pb-5">
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {profile.resumo}
        </p>
      </div>
    </div>
  )
}

