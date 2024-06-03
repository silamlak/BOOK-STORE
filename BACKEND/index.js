import express from 'express'

import { PORT, mongoDBURL } from './config.js'

import mongoose from 'mongoose'

import { Book } from './models/bookModel.js'

import booksRout from './routes/booksRoute.js'

import cors from 'cors'

const app = express()
// middleware
app.use(express.json())

app.use(cors())
// app.use(
//     cors({
//         origin: 'http://localhost:5556',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['content-type']
// })
// )

app.get('/', (req, res) => {
    console.log("u get it")
    return res.status(234).send("hello manua")
})

app.use('/books', booksRout)

    mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("db connected successfully")
        app.listen(PORT, () => {
            console.log(`the server is opened from ${PORT} port number`)
        })
    })
    .catch((err) => {
        console.log(err)
    })