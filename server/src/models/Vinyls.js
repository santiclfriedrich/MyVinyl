import mongoose from 'mongoose';

const vinylSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  artista: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  imagenUrl: { type: String, required: true },
  descripcion: { type: String }
}, { timestamps: true });

export default mongoose.model('Vinyl', vinylSchema);
