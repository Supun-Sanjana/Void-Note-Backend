import express from 'express';
import dotenv from 'dotenv'
import userRouter from './src/Router/UserRouter.js';
import noteRouter from './src/Router/NoteRouter.js';
import taskRouter from './src/Router/TaskRouter.js';

dotenv.config()

const app = express(); 


// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/note', noteRouter);
app.use('/api/v1/task', taskRouter);

// Root
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.SERVER_PORT ;

app.listen(PORT, () => {
  console.log(`Server is up & running on port ${PORT} `);
});