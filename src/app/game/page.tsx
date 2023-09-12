"use client"
import { useState, useEffect } from 'react';
import Card from '../components/Card'; // Importa el componente Card
import { deck } from '../utils/cards'; // Importa el mazo de cartas desde un archivo externo

// Define la estructura de las propiedades que se utilizarán en las cartas
interface CardProps {
  title: string;
  description: string;
}

// Función para mezclar el mazo de cartas usando el algoritmo Fisher-Yates Shuffle
const shuffleDeck = (deck: CardProps[]) => {
  return [...deck].sort(() => Math.random() - 0.5);
};

// Componente principal IndexPage
const IndexPage: React.FC = () => {
  // Declaración de estados utilizando useState
  const [shuffledDeck, setShuffledDeck] = useState<CardProps[]>([]); // Inicializa como un array vacío
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [discardPile, setDiscardPile] = useState<CardProps[]>([]);
  const [isDeckEmpty, setIsDeckEmpty] = useState<boolean>(false);

  // useEffect que se ejecuta solo una vez al cargar el componente (carga inicial)
  useEffect(() => {
    setShuffledDeck(shuffleDeck(deck)); // Mezcla el mazo en la carga inicial
  }, []);

  // Función para manejar el evento de pasar a la siguiente carta
  const handleNextCard = () => {
    if (currentCardIndex < shuffledDeck.length - 1) {
      // Mover la carta actual al mazo de descarte
      setDiscardPile([...discardPile, shuffledDeck[currentCardIndex]]);
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      // Mover todas las cartas restantes al mazo de descarte si se agota el mazo
      setDiscardPile([...discardPile, ...shuffledDeck.slice(currentCardIndex)]);
      setIsDeckEmpty(true);
    }
  };

  // Función para reiniciar el juego
  const resetGame = () => {
    setShuffledDeck(shuffleDeck(deck)); // Mezcla el mazo al reiniciar el juego
    setCurrentCardIndex(0);
    setDiscardPile([]);
    setIsDeckEmpty(false);
  };

  // Console.log para mostrar el mazo de descarte en la consola (para depuración)
  console.log(discardPile);

  // Renderización de elementos JSX
  return (
    <div className="container">
      <div className="deck">
        <h1>Deck de Cartas</h1>
        <button onClick={isDeckEmpty ? resetGame : handleNextCard}>
          {isDeckEmpty ? 'Reiniciar Juego' : 'Mazo'}
        </button>
        <div className="card-container">
          {/* Renderiza el componente Card con título y descripción de la carta actual */}
          <Card
            title={isDeckEmpty ? 'Mazo Vacío' : (shuffledDeck[currentCardIndex] ? shuffledDeck[currentCardIndex].title : '')}
            description={isDeckEmpty ? '' : (shuffledDeck[currentCardIndex] ? shuffledDeck[currentCardIndex].description : '')}
          />
        </div>
      </div>
      <div className="discard-pile">
        <h2>Mazo de Descarte</h2>
        <div className="discard-cards">
          {/* Mapea las cartas en el mazo de descarte y renderiza el componente Card para cada una */}
          {discardPile.map((card, index) => (
            <Card key={index} title={card.title} description={card.description} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Exporta el componente IndexPage
export default IndexPage;