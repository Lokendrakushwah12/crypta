import express from 'express';
import { connectDB } from './db';
import mainRouter from './routes/index';
import './utils/CoinGeckoClient';
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/v1', mainRouter);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} http://localhost:${PORT}`);
});
