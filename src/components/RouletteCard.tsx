'use client';
import React, { startTransition } from 'react';
import { RouletteCard } from '@/lib/prisma'; // Import your Prisma model type
import { useRouter } from 'next/navigation';

interface Props {
  card: RouletteCard; // Define props with the RouletteCard type
  showDelete?: boolean;
}

const RouletteCard: React.FC<Props> = ({ card, showDelete }) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/delete-card/${card.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        startTransition(() => {
          router.refresh();
        });
      } else {
        const data = await response.json();
        console.error('Error deleting card:', data.message);
        // Handle error accordingly
      }
    } catch (error) {
      console.error('Error deleting card:', error);
      // Handle error accordingly
    }
  };

  return (
    <div className="card m-4 w-80 shadow">
      <figure>
        <img src="https://picsum.photos/id/103/500/250" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{card.name}</h2>
        <p>Type: {card.type}</p>
        {card.combo && <p>Combo</p>}
      </div>
      {showDelete && (
        <div className="card-footer">
          <button className="btn btn-secondary" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default RouletteCard;
