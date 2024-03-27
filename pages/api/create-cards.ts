// pages/api/create-cards.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, CardType } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { cards } = req.body;

    // check for duplicate names

    try {
      // Create cards in the database
      await Promise.all(
        cards.map(
          async (card: { name: string; type: CardType; combo: boolean }) => {
            await prisma.rouletteCard.create({
              data: {
                name: card.name,
                type: CardType[card.type],
                combo: card.combo,
              },
            });
          }
        )
      );

      res.status(200).json({ message: 'Cards created successfully' });
    } catch (error) {
      console.error('Error creating cards:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
