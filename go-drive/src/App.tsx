import './App.css'
import Home from './pages/publicPages/Home';
import Frota from './pages/publicPages/Frota';
import Planos from './pages/publicPages/Planos';
import Sobre from './pages/publicPages/Sobre';
import Contato from './pages/publicPages/Contato';
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
