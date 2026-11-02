import '../index.css'
import Header from '../componentes/Header/Header'
import ComoFunciona from '../componentes/Planos/ComoFunciona/ComoFunciona'
import PlanosHero  from '../componentes/Planos/PlanosHero/PlanosHero'
import Categorias from '../componentes/Planos/Categorias/Categorias'
import Faq from '../componentes/Planos/Faq/Faq'
import Footer from '../componentes/Footer/Footer'


function Planos() {
  return (
    <div>
      <Header/>
      <PlanosHero/>
      <ComoFunciona/>
      <Categorias/>
      <Faq/>
      <Footer/>
    </div>
  )
}

export default Planos
