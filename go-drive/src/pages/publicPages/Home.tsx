import Header from "../../componentes/Header/Header"
import Hero from "../../componentes/Hero/Hero"
import CarCards from '../../componentes/CarCards/CarCards'
import Footer from "../../componentes/Footer/Footer"
import '../../index.css'
function Home() {
  return (
    <div className="pagina">
      <section>
        <Header />
        <Hero />
      </section>

      <main className="conteudo">
        <section id="veiculos">
          <CarCards />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Home