import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import usersRoutes from './src/routes/users.js';
import albumRoutes from './src/routes/albums.js';
import vinylRoutes from './src/routes/vinylRoutes.js';
import cartRoutes from './src/routes/cartRoutes.js';
import discogsRoutes from './src/routes/discogRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

connectDB();

//RUTAS

app.use('/api/users', usersRoutes);

app.use('/api/albums', albumRoutes);

app.use('/api/vinyls', vinylRoutes);

app.use('/api/cart', cartRoutes);


app.get('/', (req, res) => {
  res.send('¡Backend funcionando!');
});

app.use('/api/discogs', discogsRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
