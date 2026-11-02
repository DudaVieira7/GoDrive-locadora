import type { ReactNode } from 'react'
import { MdDirectionsCar,  MdTrendingUp, } from 'react-icons/md'
import './ComoFunciona.css'
import '@fontsource-variable/science-gothic'
import { BsCoin, BsFillGiftFill } from 'react-icons/bs'

interface Passo {
  icone: ReactNode
  titulo: string
  descricao: string
}

const passos: Passo[] = [
  {
    icone: <MdDirectionsCar size={22} />,
    titulo: 'Alugue',
    descricao: 'Escolha um carro da frota e faça a sua reserva.',
  },
  {
    icone: <BsCoin  size={22} />,
    titulo: 'Acumule pontos',
    descricao: 'A cada R$ 1,00 gasto no aluguel, você ganha 1 ponto.',
  },
  {
    icone: <MdTrendingUp size={22} />,
    titulo: 'Suba de nível',
    descricao: 'Com mais pontos, você chega aos níveis Sport e Race.',
  },
  {
    icone: <BsFillGiftFill  size={22} />,
    titulo: 'Aproveite',
    descricao: 'Troque pontos por diárias grátis e libere benefícios exclusivos.',
  },
]

function ComoFunciona() {
  return (
    <section id="como-funciona" className="comoFunciona">
      <div className="comoFuncionaCabecalho">
        <h2 className="comoFuncionaTitulo">Como funciona</h2>
        <p className="comoFuncionaTexto">
          No goDrive Club, o caminho é simples: você aluga, acumula pontos e
          troca por benefícios.
        </p>
      </div>

      <div className="passos">
        {passos.map((passo) => (
          <div className="passo" key={passo.titulo}>
            <span className="passoIcone">{passo.icone}</span>
            <div className="passoTexto">
              <h3 className="passoTitulo">{passo.titulo}</h3>
              <p className="passoDescricao">{passo.descricao}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ComoFunciona