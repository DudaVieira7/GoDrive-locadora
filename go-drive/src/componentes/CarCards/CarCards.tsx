import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import greenCar from '../../../public/images/ferrarif8verde.png';
import grayCar from '../../../public/images/PorscheBoxster.png';
import blackCar from '../../../public/images/Porsche992Carrera4GTSMkI.png';
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
  const [current, setCurrent] = useState(0);
  const total = cars.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  
  const visible = [(current - 1 + total) % total, current, (current + 1) % total];

  return (
    <div className="carContainer">
      <h2 className="titulo">Carros em destaque</h2>

<div className="carousel">
  <div className="track">
    {visible.map((index, pos) => {
      const car = cars[index];
      const isCenter = pos === 1;

      return (
        <figure
          key={car.name}
          className={`carCard ${isCenter ? 'carCard--center' : 'carCard--side'}`}
          onClick={() => !isCenter && setCurrent(index)}
        >
          <div className="imageWrapper">
            {isCenter && (
              <button className="arrow arrowLeft" onClick={prev} aria-label="Carro anterior">
                <MdChevronLeft size={18} />
              </button>
            )}

            <img className="carImage" src={car.image} alt={car.name} />

            {isCenter && (
              <button className="arrow arrowRight" onClick={next} aria-label="Próximo carro">
                <MdChevronRight size={18} />
              </button>
            )}
          </div>

          <figcaption className="carInfo">
            <h3 className="carName">{car.name}</h3>
            <p className="carDescription">{car.description}</p>
          </figcaption>
        </figure>
      );
    })}
  </div>
</div>

      <div className="carButton">
        <Button
          background="#F8F8F8"
          color="#3d4918"
          fontFamily="Science Gothic Variable"
          fontWeight="600"
          fontSize="20px"
          padding="23px"
          width="100%"
          borderRadius="15px"
          borderWidth="2px"
          borderColor="#84ff00"
          hoverBackground="#84ff00"
          onClick={() => navigate('/frota')}
        >
          Todos os carros
        </Button>
      </div>
    </div>
  );
}

export default CarCards;