import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  discogsId: { type: Number, required: true },
  title: String,
  artist: String,
  coverImage: String,
  year: Number,
  genres: [String],
  songsListened: [{ title: String, liked: Boolean }],
}, { timestamps: true });

export default mongoose.model('Album', albumSchema);
