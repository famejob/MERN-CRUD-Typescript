import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    updated_at: { type: Date, default: Date.now }
})


const Book = mongoose.model("Book", BookSchema);

export default Book;
