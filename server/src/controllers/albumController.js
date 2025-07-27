import Album from '../models/Albums.js';

// Crear un álbum (guardarlo en la DB)
export const createAlbum = async (req, res) => {
  const { discogsId, title, artist, coverImage, year, genres, songsListened } = req.body;
  const userId = req.user.id; // Vamos a necesitar autenticación para obtener esto

  try {
    const album = new Album({
      user: userId,
      discogsId,
      title,
      artist,
      coverImage,
      year,
      genres,
      songsListened
    });

    const savedAlbum = await album.save();
    res.status(201).json(savedAlbum);
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar el álbum', error: error.message });
  }
};

// Obtener todos los álbumes del usuario
export const getAlbums = async (req, res) => {
  const userId = req.user.id;

  try {
    const albums = await Album.find({ user: userId });
    res.json(albums);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener álbumes', error: error.message });
  }
};
