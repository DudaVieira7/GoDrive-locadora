import { useState } from 'react'
import { MdChevronRight } from 'react-icons/md'
import './Categorias.css'
import '@fontsource-variable/science-gothic'
import grayCar from '../../../../public/images/PorscheBoxster.png'
import blackCar from '../../../../public/images/Porsche992Carrera4GTSMkI.png'
import greenCar from '../../../../public/images/ferrarif8verde.png'

interface Estatistica {
  valor: string
  legenda: string
}

interface Categoria {
  nome: string
  imagem: string
  estatisticas: Estatistica[]
  beneficios: string[]
}

const categorias: Categoria[] = [
  {
    nome: 'Street',
    imagem: grayCar,
    estatisticas: [
      { valor: '0', legenda: 'pontos para chegar a este nível' },
      { valor: '1h', legenda: 'de tolerância na devolução' },
      { valor: '0%', legenda: 'de pontos bônus' },
    ],
    beneficios: ['Pontos desde a primeira reserva'],
  },
  {
    nome: 'Sport',
    imagem: blackCar,
    estatisticas: [
      { valor: '4.000', legenda: 'pontos para chegar a este nível' },
      { valor: '2h', legenda: 'de tolerância na devolução' },
      { valor: '5%', legenda: 'de pontos bônus' },
    ],
    beneficios: ['1 upgrade de carro por ano', '1 condutor adicional grátis'],
  },
  {
    nome: 'Race',
    imagem: greenCar,
    estatisticas: [
      { valor: '7.000', legenda: 'pontos para chegar a este nível' },
      { valor: '3h', legenda: 'de tolerância na devolução' },
      { valor: '15%', legenda: 'de pontos bônus' },
    ],
    beneficios: [
      '3 upgrades de carro por ano',
      '1 condutor adicional grátis',
      'Atendimento prioritário',
    ],
  },
]

function Categorias() {
  // índice do nível selecionado
  const [atual, setAtual] = useState(0)
  const categoria = categorias[atual]

  return (
    <section className="categorias">
      <div className="categoriasCabecalho">
        <h2 className="categoriasTitulo">Evolua de nível e desbloqueie vantagens</h2>
        <p className="categoriasTexto">
          Os pontos dos últimos 12 meses definem o seu nível.
        </p>
      </div>

      <div className="categoriaPalco">
        <div className="categoriaLado">
          {/* key faz o bloco recarregar e repetir a animação ao trocar de nível */}
          <div className="categoriaDetalhe" key={categoria.nome}>
            <h3 className="categoriaNome">{categoria.nome}</h3>

            <div className="categoriaStats">
              {categoria.estatisticas.map((stat) => (
                <p className="categoriaStat" key={stat.legenda}>
                  <span className="categoriaValor">{stat.valor}</span>
                  <span className="categoriaLegenda">{stat.legenda}</span>
                </p>
              ))}
            </div>

            <ul className="categoriaBeneficios">
              {categoria.beneficios.map((beneficio) => (
                <li key={beneficio}>{beneficio}</li>
              ))}
            </ul>

            <a className="categoriaLink" href="/frota">
              <MdChevronRight size={18} />
              Ver carros da frota
            </a>
          </div>

          <div className="categoriaSeletor">
            {categorias.map((item, index) => (
              <button
                key={item.nome}
                className={`seletorItem ${index === atual ? 'seletorItem--ativo' : ''}`}
                onClick={() => setAtual(index)}
                aria-pressed={index === atual}
              >
                <img className="seletorImg" src={item.imagem} alt="" />
                <span className="seletorNome">{item.nome}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="categoriaImagem">
          <img key={categoria.imagem} src={categoria.imagem} alt={`Carro do nível ${categoria.nome}`} />
        </div>
      </div>
    </section>
  )
}

export default Categorias