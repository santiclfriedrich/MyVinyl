import mongoose, { mongo } from "mongoose";

const cartItemSchema = new mongoose.Schema({
    vinyl: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vinyl',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: [cartItemSchema]
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;