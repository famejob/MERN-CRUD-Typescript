import express from "express";
import mongoose from "mongoose";
import books from "./routes/book";
import cors from "cors"
const app = express()
const port = 8080
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost:27017/mean_crud')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
app.use('/api', books);
app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World!')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})