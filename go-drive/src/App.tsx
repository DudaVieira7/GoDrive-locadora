import './App.css'
import Home from './pages/publicPages/Home';
import Frota from './pages/publicPages/Frota';
import Planos from './pages/publicPages/Planos';
import Contato from './pages/publicPages/Contato';
import Cadastro from './pages/auth/Cadastro';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import DetalhesCarro from './pages/client/DetalhesCarro/DetalhesCarro';
import MinhaConta from './pages/client/MinhaConta/MinhaConta';
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
   return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/frota" element={<Frota />}/>
        <Route path='/planos' element={<Planos/>}/>
        <Route path='/contato' element={<Contato/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/cadastro' element={<Cadastro/>}/>
        <Route path='/detalhes-carro/:id' element={<DetalhesCarro/>}/>
        <Route path='/minha-conta' element={<MinhaConta/>}/>
        <Route path='/fgpassword' element={<ForgotPassword/>}/>
        <Route path='/resetpassword' element={<ResetPassword/>}/>
        <Route path='/alugar/:id' element={<Alugar/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
