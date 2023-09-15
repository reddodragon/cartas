"use client"
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { deck } from '../utils/deck';
import './styles.css'

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const shuffleDeck = (deck: CardProps[]) => {
  return [...deck].sort(() => Math.random() - 0.5);
};

const IndexPage: React.FC = () => {
  const [shuffledDeck, setShuffledDeck] = useState<CardProps[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [discardPile, setDiscardPile] = useState<CardProps[]>([]);
  const [isDeckEmpty, setIsDeckEmpty] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setShuffledDeck(shuffleDeck(deck));
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNextCard = () => {
    if (currentCardIndex < shuffledDeck.length - 1) {
      setDiscardPile([...discardPile, shuffledDeck[currentCardIndex]]);
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setDiscardPile([...discardPile, ...shuffledDeck.slice(currentCardIndex)]);
      setIsDeckEmpty(true);
    }
  };

  const resetGame = () => {
    setShuffledDeck(shuffleDeck(deck));
    setCurrentCardIndex(0);
    setDiscardPile([]);
    setIsDeckEmpty(false);
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center gap-10">
      <div className="deck">
        <button
          className="w-40 h-60 rounded-lg bg-teal-500"
          onClick={isDeckEmpty ? resetGame : handleNextCard}
        >
          {isDeckEmpty ? 'Reiniciar Juego' : 'Mazo'}
        </button>
      </div>
      <div className="card-container">
        <Card
          title={
            isDeckEmpty
              ? 'Mazo Vacío'
              : shuffledDeck[currentCardIndex]
              ? shuffledDeck[currentCardIndex].title
              : ''
          }
          description={
            isDeckEmpty
              ? ''
              : shuffledDeck[currentCardIndex]
              ? shuffledDeck[currentCardIndex].description
              : ''
          }
          imageUrl={
            isDeckEmpty
              ? 'https://pm1.aminoapps.com/6588/9741882c1194c1bc619a60840a3b829c4ea2128d_hq.jpg'
              : shuffledDeck[currentCardIndex]
              ? shuffledDeck[currentCardIndex].imageUrl
              : ''
          }
        />
      </div>
      <div className="discard-pile">
        <div
          className="w-16 h-16 rounded-full bg-yellow-300 flex items-center justify-center cursor-pointer"
          onClick={openModal}
        >
          <svg
            className="w-8 h-8 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        {isModalOpen && (
          <div className="modal-container">
            <div className="modal">
              <button className="close-button" onClick={closeModal}>
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <div className="modal-content">
                <h2 className='mb-4 text-2xl uppercase'>Discard deck</h2>
                <div className="grid grid-cols-3 gap-5">
                  {discardPile.map((card, index) => (
                    <Card
                      key={index}
                      title={card.title}
                      description={card.description}
                      imageUrl={card.imageUrl}
                      isModalOpen={isModalOpen}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndexPage;