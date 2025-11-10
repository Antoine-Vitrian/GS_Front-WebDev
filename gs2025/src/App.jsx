import React, { useEffect, useState } from 'react'
import Home from './pages/Home'
import DarkModeToggle from './components/DarkModeToggle'

function App() {
  const [profiles, setProfiles] = useState([])
  useEffect(() => {
    // carregar JSON local colocado em public/data/profiles.json
    fetch('/data/usuarios.json')
      .then(r => r.json())
      .then(setProfiles)
      .catch(err => {
        console.error('Erro ao carregar profiles.json. Certifique-se de colocá-lo em public/data/', err)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="p-4 flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Futuro do Trabalho — Global Solution</h1>
        <div className="flex items-center gap-4">
          <DarkModeToggle />
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        <Home profiles={profiles}/>
      </main>
    </div>
  )
}

export default App
