import express from 'express';
import dotenv from 'dotenv'

dotenv.config()

const app = express(); 


app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.SERVER_PORT ;

app.listen(PORT, () => {
  console.log(`Server is up & running on port ${PORT} `);
});