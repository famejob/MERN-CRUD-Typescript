import express from "express";
import mongoose from "mongoose";
import Book from "../models/books";
const router = express.Router();

router.get("/books", async (req: express.Request, res: express.Response) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).send(err);
    }
})

router.get("/books/:id", async (req: express.Request, res: express.Response) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).send("Book not found");
        }
        res.json(book);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post("/books", async (req: express.Request, res: express.Response) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json({ message: "Created Book Succesfully!!", data: book });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.put("/books/:id", async (req: express.Request, res: express.Response) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!book) {
            return res.status(404).send("Book not found");
        }
        res.json({ message: "Update Book Succesfully!!", data: book });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete("/books/:id", async (req: express.Request, res: express.Response) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).send("Book not found");
        }
        res.json({ message: "Delete Book Succesfully!!", data: book });
    } catch (err) {
        res.status(500).send(err);
    }
});
export default router;