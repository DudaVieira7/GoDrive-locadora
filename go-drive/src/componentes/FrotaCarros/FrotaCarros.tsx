import styled from "styled-components";
import type { Veiculo } from "../Pesquisa/DadosPesquisa";

interface FrotaCarrosProps {
  veiculos: Veiculo[];
}

const FrotaContainer = styled.section`
  width: 100%;
  padding: 60px 8%;
  background-color: #f8f8f8;
`;

const FrotaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 25px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

const CarroCard = styled.article`
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
`;

const CarroImagem = styled.div`
  width: 100%;
  height: 210px;
  padding: 15px;
  background: #f5f5f5;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const CarroConteudo = styled.div`
  padding: 22px;
`;

const CarroTitulo = styled.div`
  span {
    color: #777;
    font-size: 13px;
  }

  h3 {
    margin: 5px 0 18px;
    font-size: 21px;
    color: #171717;
  }
`;

const CarroInformacoes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;

  span {
    color: #666;
    font-size: 12px;
  }
`;

const CarroRodape = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const CarroPreco = styled.div`
  strong {
    display: block;
    color: #171717;
    font-size: 20px;
  }

  span {
    color: #777;
    font-size: 12px;
  }
`;

const BotaoDetalhes = styled.button`
  border: none;
  border-radius: 8px;
  padding: 12px 16px;
  background: #84ff00;
  color: #111;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: #70db00;
  }
`;

function FrotaCarros({ veiculos }: FrotaCarrosProps) {
  return (
    <FrotaContainer>
      <FrotaGrid>
        {veiculos.map((veiculo) => (
          <CarroCard key={veiculo.id}>
            <CarroImagem>
              <img
                src={veiculo.src}
                alt={`${veiculo.marca} ${veiculo.modelo}`}
              />
            </CarroImagem>

            <CarroConteudo>
              <CarroTitulo>
                <span>{veiculo.marca}</span>
                <h3>{veiculo.modelo}</h3>
              </CarroTitulo>

              <CarroInformacoes>
                <span>{veiculo.ano}</span>
                <span>{veiculo.combustivel}</span>
                <span>
                  {veiculo.quilometragem.toLocaleString("pt-BR")} km
                </span>
              </CarroInformacoes>

              <CarroRodape>
                <CarroPreco>
                  <strong>
                    {veiculo.precoDiaria.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </strong>
                  <span>/ diária</span>
                </CarroPreco>

                <BotaoDetalhes type="button">
                  Ver detalhes
                </BotaoDetalhes>
              </CarroRodape>
            </CarroConteudo>
          </CarroCard>
        ))}
      </FrotaGrid>
    </FrotaContainer>
  );
}

export default FrotaCarros;