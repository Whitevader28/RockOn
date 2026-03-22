import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import LandingPage from './pages/LandingPage/LandingPage'

function Home() {
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL + '/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
  }, [])

  return (
    <>
      <Header />
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>RockOn</h1>
        <p>{message || 'Loading...'}</p>
      </div>
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default App