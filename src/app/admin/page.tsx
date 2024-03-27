import React from 'react';
import CardForm from '@/components/CardForm';
import { prisma } from '@/lib/prisma';
import RouletteCard from '@/components/RouletteCard';

const Admin: React.FC = async () => {
  const cards = await prisma.rouletteCard.findMany();

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-3">
        {cards.map((card, index) => (
          <RouletteCard card={card} key={`card-${index}`} showDelete={true} />
        ))}
      </div>
      <div className="divider"></div>
      <CardForm />
    </div>
  );
};

export default Admin;
