const express = require('express');
const app = express();

app.use(express.json());

const mainRouter = require('./routes/index');

app.use('/api/v1', mainRouter);

export default app;
