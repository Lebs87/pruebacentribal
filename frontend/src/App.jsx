import { BrowserRouter, Routes, Route } from 'react-router-dom';
import publicRoutes from './services/routes/index.js';
import PublicLayout from './components/layout/PublicLayout.jsx'
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route, idx) => (
            <Route path={route.path} element={<PublicLayout><route.component /></PublicLayout>} key={idx} />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
