'use client';
import React, { useState } from 'react';
import { CardType } from '@prisma/client'; // Import the CardType enum
import { RouletteCard } from '@prisma/client';

interface CardFormProps {}

const CardForm: React.FC<CardFormProps> = () => {
  const [cards, setCards] = useState<Omit<RouletteCard, 'id'>[]>([]);
  const [newCardName, setNewCardName] = useState('');
  const [newCardCombo, setNewCardCombo] = useState(false);
  const [newCardType, setNewCardType] = useState<CardType>(CardType.TRICK);

  const handleAddCard = () => {
    if (!newCardName) return;
    const newCard = {
      name: newCardName,
      type: newCardType,
      combo: newCardCombo,
    };
    setCards([...cards, newCard]);
    setNewCardName('');
    setNewCardCombo(false);
    setNewCardType(CardType.TRICK);
  };

  const handleSubmit = async () => {
    try {
      await fetch('/api/create-cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cards }),
      });
      setCards([]);
    } catch (error) {
      console.error('Error creating cards:', error);
    }
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Combo</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card, index) => (
            <tr key={index}>
              <td>{card.name}</td>
              <td>{card.type}</td>
              <td>{card.combo ? 'combo' : ''}</td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                placeholder="Card Name"
                value={newCardName}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setNewCardName(e.target.value)}
              />
            </td>
            <td>
              <select
                className="select select-bordered w-full max-w-xs"
                onChange={(e) => {
                  setNewCardType(e.target.value as CardType);
                }}
                value={newCardType}
              >
                <option>TRICK</option>
                <option>STYLE</option>
                <option>FINISH</option>
                <option>WEIRD</option>
              </select>
            </td>
            <td>
              <input
                type="checkbox"
                className="checkbox"
                onChange={(e) => {
                  setNewCardCombo(e.target.checked);
                }}
                checked={newCardCombo}
              />
            </td>
            <td>
              <button
                className="btn btn-accent"
                onClick={handleAddCard}
                disabled={!newCardName}
              >
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        className="btn btn-primary btn-border"
        onClick={handleSubmit}
        disabled={cards.length === 0}
      >
        Submit
      </button>
    </div>
  );
};

export default CardForm;
