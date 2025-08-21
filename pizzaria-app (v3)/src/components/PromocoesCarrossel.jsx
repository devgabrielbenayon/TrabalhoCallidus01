// src/components/PromocoesCarrossel.jsx
import React from 'react';
import Slider from 'react-slick';

// Importando os arquivos CSS necessários para o carrossel funcionar
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// --- OS ESTILOS ANTIGOS FORAM MOVIDOS PARA A PROP "sx" ABAIXO ---

const slideStyles = {
  position: 'relative',
  textAlign: 'center',
  color: 'white',
  borderRadius: '15px',
  overflow: 'hidden',
  border: '3px solid #e32d2d', 
};

const imageStyles = {
  width: '100%',
  height: '200px', 
  objectFit: 'cover',
  filter: 'brightness(0.6)',
};

const textStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
  padding: '1rem',
  width: '80%'
};

const PromocoesCarrossel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: true,
  };

  const promocoes = [
    {
      titulo: "Combo Família em Dobro!",
      descricao: "2 Pizzas Grandes + Refri 2L por um preço especial.",
      imagem: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&q=80&w=1024"
    },
    {
      titulo: "Terça da Pizza Doce",
      descricao: "Compre uma pizza salgada e leve uma doce pela metade do preço.",
      imagem: "/images/doce.png"
    },
    {
      titulo: "Bebidas em Dobro",
      descricao: "Peça uma cerveja artesanal e a segunda é por nossa conta.",
      imagem: "https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-4.0.3&q=80&w=1024"
    }
  ];

  return (
    <div 
      // Usando a prop "sx" do Material-UI para estilização
      style={{
        width: '90%',
        maxWidth: '1400px',
        margin: '2rem auto 4rem auto',

        // --- ESTILOS DAS BOLINHAS ADICIONADOS AQUI ---
        // Alvo: bolinhas inativas
        '.slick-dots li button:before': {
          fontSize: '10px',
          color: '#e32d2d', // Cor do tema MUI para cinza
          opacity: 1,
        },
        // Alvo: bolinha ativa
        '.slick-dots li.slick-active button:before': {
          color: '#e32d2d', // Sua cor primária
          opacity: 1,
        }
      }}
    >
      <Slider {...settings}>
        {promocoes.map((promo, index) => (
          <div key={index}>
            <div style={slideStyles}>
              <img src={promo.imagem} alt={promo.titulo} style={imageStyles} />
              <div style={textStyles}>
                <h2 style={{ fontSize: '2.2rem', margin: 0, fontWeight: 'bold' }}>{promo.titulo}</h2>
                <p style={{ fontSize: '1.1rem' }}>{promo.descricao}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PromocoesCarrossel;