import express from 'express';
import { importVinylFromDiscogs } from '../controllers/discogsController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import axios from 'axios';

const router = express.Router();

router.post('/import/:id', authenticateToken, isAdmin, importVinylFromDiscogs);

//Buscar en discogs
router.get('/search', async (req, res) => {
  const search = req.query.search;

  if (!search) {
    return res.status(400).json({ error: 'Falta el parámetro de búsqueda (search)' });
  }

  console.log('Token usado para Discogs:', process.env.DISCOGS_API_TOKEN);


  try {
    const response = await axios.get('https://api.discogs.com/database/search', {
      params: {
        q: search,
        type: 'release',
        token: process.env.DISCOGS_API_TOKEN,
      },
      headers: {
    'User-Agent': 'MiApp/1.0' // obligatorio para Discogs API
  }
    });

    const filteredResults = response.data.results.map(item => ({
      id: item.id,                // Este es el release ID
      title: item.title,
      year: item.year,
      country: item.country,
      format: item.format,
      label: item.label,
      cover_image: item.cover_image
    }));

    res.json(filteredResults);

  } catch (error) {
    console.error('Error al consultar Discogs:', error.message);
    res.status(500).json({ error: 'Error al consultar la API de Discogs' });
  }
});

// Obtener detalles por release ID
router.get('/release/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`https://api.discogs.com/releases/${id}`, {
      headers: {
        'User-Agent': 'MiApp/1.0'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error al consultar release de Discogs:', error.message);
    res.status(500).json({ error: 'Error al consultar el release de Discogs' });
  }
});

export default router;

