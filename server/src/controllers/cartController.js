import Cart from '../models/Cart.js'
import Vinyl from '../models/Vinyls.js'

//Obtener carrito del user
export const getCart = async (req, res) => {

    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.vinyl');
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado'});
        res.json(cart)
        
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

//agregar vinilo al carrito
export const addToCart = async (req, res) => {
    const { vinylId, quantity } = req.body;
    try {
         let cart = await Cart.findOne({ user: req.user.id });
         const vinyl = await Vinyl.findById(vinylId);

         if (!vinyl) return res.status(404).json({ message: "Vinilo no encontrado" });

         if (!cart) {
            cart = new Cart({
                user: req.user.id,
                items: [{ vinyl: vinylId, quantity }]
            });

         } else {
            const existingItem = cart.items.find( item => item.vinyl.equals(vinylId));
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ vinyl: vinylId, quantity });
            }
         }

         await cart.save();
         res.status(200).json(cart);

    } catch (error) {
            res.status(500).json({ error: error.message });
    }
}

//eliminar vinilo del carrito
export const removeFromCart = async (req, res) => {
    const { vinylId } = req.body;
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

        cart.items = cart.items.filter(item => !item.vinyl.equals(vinylId));
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//vaciar carrito
export const clearCart = async (req, res) => {
    try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

    cart.items = [];
    await cart.save();
    res.json({ message: "Carrito vaciado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}