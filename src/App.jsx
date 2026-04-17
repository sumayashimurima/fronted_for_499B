import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import WritingModule from './pages/WritingModule'
import StartWriting from './pages/StartWriting'
import SpeakingModule from './pages/SpeakingModule'
import StartSpeaking from './pages/StartSpeaking'
import SpeakingHistory from './pages/SpeakingHistory'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/writing-module" element={<WritingModule />} />
        <Route path="/start-writing" element={<StartWriting />} />
        <Route path="/speaking-module" element={<SpeakingModule />} />
        <Route path="/start-speaking" element={<StartSpeaking />} />
        <Route path="/speaking-history" element={<SpeakingHistory />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
