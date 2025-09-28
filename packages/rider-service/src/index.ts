import express from 'express';
import userRoutes from './components/user/user.routes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());


app.get('/health', (req, res) => {
  res.status(200).send('Rider service is healthy and running!');
});

app.use('/api/v1/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Rider service listening on port ${PORT}`);
});