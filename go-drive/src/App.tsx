import './App.css'
import Home from './pages/publicPages/Home';
import Frota from './pages/publicPages/Frota';
import Planos from './pages/publicPages/Planos';
import Contato from './pages/publicPages/Contato';
import Cadastro from './pages/auth/Cadastro';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

import MinhaConta from './pages/client/MinhaConta/MinhaConta'; // importação de  rotas de clientes

import VisaoGeral from './pages/admin/VisaoGeral/VisaoGeral'; 
import LogsAuditoria from './pages/admin/LogsAuditoria/LogsAuditoria'; // importação de  rotas de administradores do sistema
import AdminFuncionarios from './pages/admin/AdminFuncionarios/AdminFuncionarios';

import CadastrarVeiculos from './pages/employee/CadastrarVeiculos/CadastrarVeiculos';
import ConsultarLocacao from './pages/employee/ConsultarLocacao/ConsultarLocacao';    // importações de rotas de funcionarios do sistema
import StatusVeiculos from './pages/employee/StatusVeiculos/StatusVeiculos';


import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Alugar from './pages/client/Alugar/Alugar';

function App() {
   return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/frota" element={<Frota />}/>    {/* rotas publicas do sistema */}
        <Route path='/planos' element={<Planos/>}/>
        <Route path='/contato' element={<Contato/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/cadastro' element={<Cadastro/>}/>
        <Route path='/fgpassword' element={<ForgotPassword/>}/>
        <Route path='/resetpassword' element={<ResetPassword/>}/>

        <Route path='/minha-conta' element={<MinhaConta/>}/>    {/* rotas do cliente do sistema */}
        <Route path='/alugar/:id' element={<Alugar/>}/>

        <Route path='/admin/visao-geral' element={<VisaoGeral/>}/>
        <Route path='/admin/logs-auditoria' element={<LogsAuditoria/>}/>             {/* rotas do administrador do sietema */}
        <Route path='/admin/adminstrar-funcionarios' element={<AdminFuncionarios/>}/>


        <Route path='/funcionario/cadastrar-veiculo' element={<CadastrarVeiculos/>}/>
        <Route path='/funcionario/consultar-locacoes' element={<ConsultarLocacao/>}/>   {/*rotas do funcionario do sistema  */}
        <Route path ='/funcionario/status-veiculos' element={<StatusVeiculos/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
