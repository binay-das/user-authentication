
import './App.css'
import HomePage from './pages/HomePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedPage from './pages/ProtectedPage';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/api/protected" element={<ProtectedPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
