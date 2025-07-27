// controllers/discogsController.js
import axios from 'axios';
import Vinyl from '../models/Vinyls.js';

const DISCOGS_TOKEN = process.env.DISCOGS_API_TOKEN;

export const importVinylFromDiscogs = async (req, res) => {
  const { id } = req.params;

  try {
    const { data } = await axios.get(`https://api.discogs.com/releases/${id}?token=${DISCOGS_TOKEN}`);

    const newVinyl = new Vinyl({
      titulo: data.title,
      artista: data.artists[0].name,
      precio: 0, // Podés pedir que el admin lo edite después
      stock: 1,  // Lo mismo, se puede editar luego
      imagenUrl: data.images?.[0]?.uri || '',
      descripcion: data.notes || 'Importado desde Discogs'
    });

    await newVinyl.save();
    res.status(201).json(newVinyl);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al importar el vinilo desde Discogs' });
  }
};
