import React, { useState } from 'react'

export default function ProfileModal({ profile, onClose }) {
  const [recommends, setRecommends] = useState(profile.recommendations || 0)
  const [showMsgForm, setShowMsgForm] = useState(false)
  const [message, setMessage] = useState('')

  function handleRecommend() {
    setRecommends(prev => prev + 1)
    // aqui você pode gravar em localStorage ou em backend (não implementado)
  }

  function handleSendMessage(e) {
    e.preventDefault()
    // simulação: guardar no localStorage
    const thread = { to: profile.Id, message, date: new Date().toISOString() }
    const key = `messages_to_${profile.Id}`
    const prev = JSON.parse(localStorage.getItem(key) || '[]')
    localStorage.setItem(key, JSON.stringify([thread, ...prev]))
    setMessage('')
    setShowMsgForm(false)
    alert('Mensagem enviada (simulada).')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-3xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 dark:text-gray-200">Fechar ✕</button>
        <div className="flex gap-6">
          <img src={profile.foto} alt={profile.nome} className="w-28 h-28 rounded-full object-cover" />
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{profile.nome}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-300">{profile.cargo} • {profile.localizacao}</p>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{profile.resumo}</p>

            <div className="mt-4 flex gap-2">
              <button onClick={handleRecommend} className="px-3 py-2 bg-blue-600 text-white rounded-md">Recomendar ({recommends})</button>
              <button onClick={() => setShowMsgForm(s=>!s)} className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md">Enviar mensagem</button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Formação</h3>
            <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {(profile.formacao || []).map((f, i) => (
                <li key={i}><strong>{f.curso}</strong> — {f.instituicao} ({f.ano})</li>
              ))}
            </ul>

            <h3 className="mt-4 font-semibold text-gray-800 dark:text-gray-100">Experiências</h3>
            <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {(profile.experiencias || []).map((e, i) => (
                <li key={i}><strong>{e.cargo}</strong> @ {e.empresa} ({e.inicio} — {e.fim})<div className="text-xs text-gray-500">{e.descricao}</div></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Habilidades Técnicas</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {(profile.habilidadesTecnicas || []).map((h, i) => <span key={i} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">{h}</span>)}
            </div>

            <h3 className="mt-4 font-semibold text-gray-800 dark:text-gray-100">Soft skills & Hobbies</h3>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {(profile.softSkills || []).join(', ')}
              <div className="mt-2"><strong>Hobbies:</strong> {(profile.hobbies || []).join(', ')}</div>
            </div>

            <h3 className="mt-4 font-semibold text-gray-800 dark:text-gray-100">Projetos</h3>
            <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {(profile.projetos || []).map((p, i) => (
                <li key={i}><a href={p.link} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400">{p.titulo}</a> — {p.descricao}</li>
              ))}
            </ul>
          </div>
        </div>

        {showMsgForm && (
          <form onSubmit={handleSendMessage} className="mt-4">
            <textarea required value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700" placeholder="Escreva sua mensagem..."/>
            <div className="mt-2 flex gap-2">
              <button type="submit" className="px-3 py-2 bg-green-600 text-white rounded-md">Enviar</button>
              <button type="button" onClick={() => setShowMsgForm(false)} className="px-3 py-2 bg-gray-200 rounded-md">Cancelar</button>
            </div>
          </form>
        )}

      </div>
    </div>
  )
}
