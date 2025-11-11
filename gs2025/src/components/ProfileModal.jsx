import React, { useState } from 'react'

export default function ProfileModal({ profile, onClose }) {
  const [recommends, setRecommends] = useState(profile.recommendations || 0)
  const [showMsgForm, setShowMsgForm] = useState(false)
  const [message, setMessage] = useState('')

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
    <>
      {/* Fundo sem bloquear scroll */}
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Caixa flutuante */}
      <div
        className="fixed top-1/2 left-1/2 z-[10000] -translate-x-1/2 -translate-y-1/2
          bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 
          dark:border-slate-700 p-6 w-[90%] max-w-3xl animate-zoomIn"
      >
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 dark:text-gray-300 hover:text-red-500 transition text-lg font-semibold"
        >
          ✕
        </button>

        {/* Conteúdo */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={profile.foto}
            alt={profile.nome}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-primary/40 shadow-lg"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{profile.nome}</h2>
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              {profile.cargo} • {profile.localizacao}
            </p>
            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
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

        {/* Formulário de mensagem */}
        {showMsgForm && (
          <form
            onSubmit={handleSendMessage}
            className="mt-6 border-t border-gray-200 dark:border-slate-700 pt-4 animate-fadeIn"
          >
            <textarea
              required
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
    </>
  )
}
