import User from '../models/Users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async(req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if(existingUser){
            return res.status(400).json({ message: 'Usuario o mail ya registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'user'  // asegurate de que la variable "role" exista
        });

        await user.save();
        
        res.status(201).json({ message: 'Usuario creado con éxito'});

    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Email no registrado' });

    // Comparar contraseñas
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Contraseña incorrecta' });

    // Crear token
    const token = jwt.sign({
      id: user._id,
      username: user.username,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '2h',
    });

    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: err.message });
  }
};