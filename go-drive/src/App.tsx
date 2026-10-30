import './App.css'
import Home from './pages/Home';
import Frota from './pages/Frota';
import Planos from './pages/Planos';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
   return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/frota" element={<Frota />}/>
        <Route path='/planos' element={<Planos/>}/>
        <Route path='/sobre' element={<Sobre/>}/>
        <Route path='/contato' element={<Contato/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
