import React, { useState, useEffect } from 'react'

export default function ProfileModal({ profile, onClose }) {
  const [recommends, setRecommends] = useState(profile.recommendations || 0)
  const [showMsgForm, setShowMsgForm] = useState(false)
  const [message, setMessage] = useState('')

  // Impede rolagem e interação com o fundo
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  function handleRecommend() {
    setRecommends(prev => prev + 1)
  }

  function handleSendMessage(e) {
    e.preventDefault()
    const thread = { to: profile.Id, message, date: new Date().toISOString() }
    const key = `messages_to_${profile.Id}`
    const prev = JSON.parse(localStorage.getItem(key) || '[]')
    localStorage.setItem(key, JSON.stringify([thread, ...prev]))
    setMessage('')
    setShowMsgForm(false)
    alert('Mensagem enviada (simulada).')
  }

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-md animate-fadeIn"
      style={{ pointerEvents: 'auto' }}
    >
      {/* Camada de bloqueio total */}
      <div
        className="absolute inset-0"
        style={{ pointerEvents: 'none' }}
      />

      {/* Modal centralizado */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-700 animate-zoomIn overflow-y-auto max-h-[90vh] focus:outline-none">
        
        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-red-500 transition text-lg font-semibold"
        >
          ✕
        </button>

        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-8 border-b border-gray-100 dark:border-slate-800">
          <img
            src={profile.foto}
            alt={profile.nome}
            className="w-28 h-28 rounded-full object-cover ring-4 ring-primary/40 shadow-lg"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{profile.nome}</h2>
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              {profile.cargo} • {profile.localizacao}
            </p>
            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed max-w-prose">
              {profile.resumo}
            </p>

            <div className="mt-5 flex flex-wrap justify-center md:justify-start gap-3">
              <button
                onClick={handleRecommend}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                Recomendar ({recommends})
              </button>
              <button
                onClick={() => setShowMsgForm(s => !s)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              >
                Enviar mensagem
              </button>
            </div>
          </div>
        </div>

        {/* Corpo */}
        <div className="grid md:grid-cols-2 gap-6 p-8 text-sm">
          {/* Coluna esquerda */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-blue-500 pl-2">
              Formação
            </h3>
            <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300">
              {(profile.formacao || []).map((f, i) => (
                <li key={i}>
                  <strong>{f.curso}</strong> — {f.instituicao} ({f.ano})
                </li>
              ))}
            </ul>

            <h3 className="mt-6 text-lg font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-blue-500 pl-2">
              Experiências
            </h3>
            <ul className="mt-3 space-y-3 text-gray-700 dark:text-gray-300">
              {(profile.experiencias || []).map((e, i) => (
                <li key={i}>
                  <strong>{e.cargo}</strong> @ {e.empresa}{' '}
                  <span className="text-xs text-gray-500">
                    ({e.inicio} — {e.fim})
                  </span>
                  <div className="text-xs text-gray-500 mt-1">{e.descricao}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna direita */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-blue-500 pl-2">
              Habilidades Técnicas
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {(profile.habilidadesTecnicas || []).map((h, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-medium rounded-full"
                >
                  {h}
                </span>
              ))}
            </div>

            <h3 className="mt-6 text-lg font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-blue-500 pl-2">
              Soft Skills & Hobbies
            </h3>
            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Soft Skills:</strong> {(profile.softSkills || []).join(', ')}
              <br />
              <strong>Hobbies:</strong> {(profile.hobbies || []).join(', ')}
            </p>

            <h3 className="mt-6 text-lg font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-blue-500 pl-2">
              Projetos
            </h3>
            <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300">
              {(profile.projetos || []).map((p, i) => (
                <li key={i}>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {p.titulo}
                  </a>{' '}
                  — {p.descricao}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Formulário de mensagem */}
        {showMsgForm && (
          <form
            onSubmit={handleSendMessage}
            className="bg-gray-50 dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 p-6 rounded-b-3xl animate-fadeIn"
          >
            <textarea
              required
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows="3"
              placeholder="Escreva sua mensagem..."
            />
            <div className="mt-3 flex gap-2 justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Enviar
              </button>
              <button
                type="button"
                onClick={() => setShowMsgForm(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
