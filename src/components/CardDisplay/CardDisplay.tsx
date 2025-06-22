import React from 'react';
import PokerCard from 'react-pokercards';
import { Card, Suit } from '../../types';
import './CardDisplay.css';

interface CardDisplayProps {
  cards: Card[];
  size?: 'small' | 'medium' | 'large';
}

const CardDisplay: React.FC<CardDisplayProps> = ({ cards, size = 'medium' }) => {
  const getSuitShort = (suit: Suit): string => {
    switch (suit) {
      case 'hearts': return 'h';
      case 'diamonds': return 'd';
      case 'clubs': return 'c';
      case 'spades': return 's';
    }
  };

  const getCardShort = (card: Card): string => {
    return `${card.rank}${getSuitShort(card.suit)}`;
  };

  const getCardSize = (size: string): number => {
    switch (size) {
      case 'small': return 80;
      case 'medium': return 120;
      case 'large': return 160;
      default: return 120;
    }
  };

  return (
    <div className={`card-display ${size}`}>
      {cards.map((card, index) => (
        <PokerCard
          key={index}
          short={getCardShort(card)}
          size={getCardSize(size)}
          className="poker-card"
        />
      ))}
    </div>
  );
};

export default CardDisplay;