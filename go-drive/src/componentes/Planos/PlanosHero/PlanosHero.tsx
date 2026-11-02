import { useNavigate } from 'react-router-dom'
import './PlanosHero.css'
import '@fontsource-variable/science-gothic'
import Button from '../../Button/Button'
import fundo from '../../../../public/images/blackCarBackgound.jpg'

interface Estatistica {
  valor: string
  legenda: string
}

const estatisticas: Estatistica[] = [
  { valor: '1', legenda: 'ponto a cada R$ 1,00' },
  { valor: '3', legenda: 'níveis de vantagens' },
  { valor: '24', legenda: 'meses de validade' },
  { valor: '15%', legenda: 'bônus máximo de pontos' },
]

function PlanosHero() {
  const navigate = useNavigate()

  // rola a página até a seção "Como funciona"
  const irParaComoFunciona = () => {
    document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="planosHero">
      <div className="planosHeroCapa">
        <img className="planosHeroFundo" src={fundo} alt="" />

        <div className="planosHeroConteudo">
          <p className="planosHeroEyebrow">goDrive Club</p>

          <h1 className="planosHeroTitulo">
            Alugue.
            <br />
            Acumule.
            <br />
            Evolua.
          </h1>

          <p className="planosHeroTexto">
            Quanto mais você aluga, mais você ganha. Troque pontos por diárias
            grátis e benefícios.
          </p>

          <div className="planosHeroBotoes">
            <Button
              background="#84ff00"
              color="#000"
              fontFamily="Science Gothic Variable"
              fontWeight="700"
              fontSize="14px"
              padding="14px 24px"
              borderRadius="15px"
              hoverBackground="#a3ff3d"
              onClick={irParaComoFunciona}
            >
              Conheça o programa
            </Button>

            <Button
              background="transparent"
              color="#1b1d20"
              fontFamily="Science Gothic Variable"
              fontWeight="600"
              fontSize="14px"
              padding="14px 24px"
              borderRadius="15px"
              borderWidth="1px"
              borderColor="#1b1d20"
              hoverBackground="#1b1d20"
              hoverColor="#fff"
              onClick={() => navigate('/frota')}
            >
              Ver a frota
            </Button>
          </div>
        </div>
      </div>

      <div className="planosHeroStats">
        {estatisticas.map((stat) => (
          <p className="planosHeroStat" key={stat.legenda}>
            <span className="planosHeroValor">{stat.valor}</span>
            <span className="planosHeroLegenda">{stat.legenda}</span>
          </p>
        ))}
      </div>
    </section>
  )
}

export default PlanosHero