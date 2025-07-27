import Vinyl from "../models/Vinyls.js";

export const getAllVinyls = async(req, res) => {

    try {
        const vinilos = await Vinyl.find();
        res.json(vinilos)
    } catch (error) {
            res.status(500).json({ error: err.message });

    }

}

export const getVinylById = async (req, res) => {
    try {
        const vinilo = await Vinyl.findById(req.params.id);
        if(!vinilo) return res.status(404).json({ message: 'Vinilo no encontrado' })
        
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}

export const createVinyl = async (req, res) => {
    try {
        const nuevoVinilo = new Vinyl(req.body);
        await nuevoVinilo.save();
        res.status(201).json(nuevoVinilo)
    } catch (error) {
        res.status(400).json({ error: err.message });

    }
}

export const updateVinyl = async (req, res) => {
    try {
        const actualizado = await Vinyl.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ error: err.message });

    }
}

export const deleteVinyl = async (req, res) => {
    try {
        await Vinyl.findByIdAndDelete(req.params.id);
        res.json({ message: 'Vinilo eliminado' })
    } catch (error) {
        res.status(500).json({ error: err.message });

    }
}

export const searchVinyls = async (req, res) => {
  try {
    const { title, artist, genre, year } = req.query;

    // Construimos un objeto de búsqueda dinámico
    const query = {};
    if (title) query.title = { $regex: title, $options: 'i' };
    if (artist) query.artist = { $regex: artist, $options: 'i' };
    if (genre) query.genre = { $regex: genre, $options: 'i' };
    if (year) query.year = year;

    const results = await Vinyl.find(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

