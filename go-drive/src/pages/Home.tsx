
import Header from "../componentes/Header/Header"
import Hero from "../componentes/Hero/Hero"

import CarCards from '../componentes/CarCards/CarCards';
import Footer from "../componentes/Footer/Footer"



function Home() {
 

  return (
    <div>
      <section>
          <Header />
          <Hero />
      </section>
      <section id="veiculos">
        <CarCards />
      </section>

      <Footer />
    </div>
  )
}

export default Home