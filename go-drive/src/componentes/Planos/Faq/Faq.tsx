import { useState } from 'react'
import { MdAdd } from 'react-icons/md'
import './Faq.css'
import '@fontsource-variable/science-gothic'

interface Pergunta {
  pergunta: string
  resposta: string
}

const perguntas: Pergunta[] = [
  {
    pergunta: 'Como faço para participar?',
    resposta:
      'É só criar a sua conta no site da goDrive. Você já entra no nível Street e começa a pontuar na primeira reserva.',
  },
  {
    pergunta: 'Como acumulo pontos?',
    resposta:
      'Você ganha 1 ponto a cada R$ 1,00 gasto no valor do aluguel. Combustível, limpeza e multas não geram pontos.',
  },
  {
    pergunta: 'Como troco os pontos por diárias grátis?',
    resposta:
      'Na hora da reserva, marque a opção "Usar meus pontos". Cada carro da frota tem um valor em pontos por diária.',
  },
  {
    pergunta: 'Como subo de nível?',
    resposta:
      'Ao chegar a 4.000 pontos em 12 meses, você vira Sport. Com 7.000 pontos, vira Race.',
  },
  {
    pergunta: 'Os pontos têm validade?',
    resposta:
      'Sim. Os pontos valem por 24 meses para troca. Para definir o seu nível, contam só os pontos dos últimos 12 meses.',
  },
  {
    pergunta: 'Como consulto meu saldo?',
    resposta:
      'No seu perfil, em "Extrato de pontos", você vê o saldo, o nível atual e quanto falta para o próximo.',
  },
]

function Faq() {
  
  const [aberta, setAberta] = useState<number | null>(null)

  const alternar = (index: number) => {
    setAberta((atual) => (atual === index ? null : index))
  }

  return (
    <section className="faq">
      <h2 className="faqTitulo">Perguntas frequentes</h2>

      <div className="faqLista">
        {perguntas.map((item, index) => {
          const estaAberta = aberta === index

          return (
            <div
              key={item.pergunta}
              className={`faqItem ${estaAberta ? 'faqItem--aberto' : ''}`}
            >
              <button
                className="faqPergunta"
                onClick={() => alternar(index)}
                aria-expanded={estaAberta}
              >
                <span>{item.pergunta}</span>
                <MdAdd className="faqIcone" size={24} />
              </button>

              <div className="faqResposta">
                <p>{item.resposta}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Faq