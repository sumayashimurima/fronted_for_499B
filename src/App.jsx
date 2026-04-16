import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import WritingModule from './pages/WritingModule'
import StartWriting from './pages/StartWriting'
import SpeakingModule from './pages/SpeakingModule'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/writing-module" element={<WritingModule />} />
        <Route path="/start-writing" element={<StartWriting />} />
        <Route path="/speaking-module" element={<SpeakingModule />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
