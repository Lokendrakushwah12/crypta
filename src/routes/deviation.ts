import { Request, Response, Router } from 'express';
import Crypto, { ICrypto } from '../models/Crypto';
const router = Router();

const calculateStandardDeviation = (numbers: number[]): number => {
  const mean = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
  const variance =
    numbers.reduce((sum, num) => sum + Math.pow(num - mean, 2), 0) /
    numbers.length;
  return Math.sqrt(variance);
};

router.get('/', async (req: Request, res: Response): Promise<void> => {
  const { coin } = req.query;
  if (!coin) {
    res.status(400).json({ error: 'Coin parameter is required.' });
  }

  try {
    const records = await Crypto.find({ id: coin })
      .sort({ timestamp: -1 })
      .limit(100);

    if (records.length === 0) {
      res.status(404).json({ error: `No records found for ${coin}.` });
    }

    const prices = records.map((record: ICrypto) => record.price_in_usd);

    const deviation = calculateStandardDeviation(prices);

    res.json({ deviation: parseFloat(deviation.toFixed(2)) });
  } catch (error) {
    console.error('Error fetching deviation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
