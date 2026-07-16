import { useState, useEffect } from 'react'

// The VITE_API_URL env var will be set at build time for production
const API_BASE = import.meta.env.VITE_API_URL || ''

function App() {
  const [status, setStatus] = useState('Loading...')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch(`${API_BASE}/api/health`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status || 'OK')
        setMessage(data.message || '')
      })
      .catch(() => {
        setStatus('Error')
        setMessage('Could not connect to backend')
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">TerrainTelli Frontend</h1>
        <p className="text-gray-500 mb-6">React + Vite + Tailwind</p>
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-400 uppercase tracking-wide mb-1">Backend Status</p>
          <p
            className={`text-2xl font-semibold ${
              status === 'OK' ? 'text-green-500' : status === 'Error' ? 'text-red-500' : 'text-yellow-500'
            }`}
          >
            {status}
          </p>
          {message && <p className="text-gray-600 mt-2 text-sm">{message}</p>}
        </div>
      </div>
    </div>
  )
}

export default App
