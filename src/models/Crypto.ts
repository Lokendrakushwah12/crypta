import { Document, Schema, model } from 'mongoose';

export interface ICrypto extends Document {
  id: string;
  price_in_usd: number;
  market_cap_in_usd: number;
  change_24h: number;
  timestamp: Date;
}

const cryptoSchema = new Schema<ICrypto>({
  id: { type: String, required: true },
  price_in_usd: { type: Number, required: true },
  market_cap_in_usd: { type: Number, required: true },
  change_24h: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Crypto = model<ICrypto>('Crypto', cryptoSchema);

export default Crypto;
