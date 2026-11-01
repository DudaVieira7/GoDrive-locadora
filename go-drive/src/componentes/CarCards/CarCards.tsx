import greenCar from '../../../public/images/ferrarif8verde.png';
import grayCar from '../../../public/images/PorscheBoxster.png';
import blackCar from '../../../public/images/Porsche992Carrera4GTSMkI.png';
import { useNavigate } from 'react-router-dom';
import './CarCards.css';
import Button from '../Button/Button';
import '@fontsource-variable/science-gothic';

interface Car {
  name: string;
  description: string;
  image: string;
}

const cars: Car[] = [
  {
    name: 'Ferrari F8 Tributo',
    description: 'Motor V8 biturbo com 720 cv. Esportivo para quem quer emoção em cada curva.',
    image: greenCar,
  },
  {
    name: 'Porsche Boxster',
    description: 'Conversível de motor central, leve e ágil. Ideal para curtir o céu aberto.',
    image: grayCar,
  },
  {
    name: 'Porsche 992 Carrera 4 GTS',
    description: 'Tração integral e desempenho de pista com conforto para o dia a dia.',
    image: blackCar,
  },
];

function CarCards() {
  
  const navigate = useNavigate();
   const handleNavigate = () => {
    navigate('/frota'); // Rota para onde você quer ir
  };
  return (
    <div className="carContainer">
      <div>
        <h2 className="titulo">Carros em destaque</h2>
      </div>

      <div className="cards">
        {cars.map((car) => (
          <figure className="carCard" key={car.name}>
            <img className="carImage" src={car.image} alt={car.name} />
            <figcaption className="carInfo">
              <h3 className="carName">{car.name}</h3>
              <p className="carDescription">{car.description}</p>
            </figcaption>
          </figure>
        ))}
        
      </div>
      <Button
        background="#fff"
        color="#43501C"
        fontFamily="Science Gothic Variable"
        fontWeight="600"
        fontSize="20px"
        padding="23px"
        width="510px"
        borderRadius="15px"
        borderWidth="2px"
        borderColor="#84ff00"
        hoverBackground="#84ff00"
        onClick={handleNavigate}
      >
        Todos os carros
      </Button>
    </div>
  );
}

export default CarCards;