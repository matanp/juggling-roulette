import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const { id } = req.query;

    try {
      const existingCard = await prisma.rouletteCard.findUnique({
        where: {
          id: String(id),
        },
      });

      if (!existingCard) {
        return res.status(404).json({ message: 'Card not found' });
      }

      await prisma.rouletteCard.delete({
        where: {
          id: String(id),
        },
      });

      res.status(200).json({ message: 'Card deleted successfully' });
    } catch (error) {
      console.error('Error deleting card:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
