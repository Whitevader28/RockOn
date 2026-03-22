import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL + '/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>RockOn</h1>
      <p>{message || 'Loading...'}</p>
    </div>
  )
}

export default App
