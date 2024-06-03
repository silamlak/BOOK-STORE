import express from 'express'
const router = express.Router()

import { Book } from '../models/bookModel.js'

router.post('/', async (req, res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){  
            return res.status(400).send({"message": 'send all required fields please'})
        }

        const newBook = {
            title: req.body.title,
            author : req.body.author,
            publishYear: /*parseInt*/req.body.publishYear
        }
        const book = await Book.create(newBook)
        res.status(201).send(book)
    } catch (err) {
        console.log(err)
        res.status(500).send({"message": err.message})
    }
})

router.get('/', async (req, res) => {
    try {
        const books = await Book.find({})

        if(!books) return res.send({"message" : "no book here"})

        res.status(200).send({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({"message": ErrorEvent.message})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id)
        res.status(200).send(book)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({"message": ErrorEvent.message})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const result = await Book.findByIdAndUpdate(id, req.body)
        if(!result) return res.status(404).send({message: "not found"})

        console.log("updated successfully")
        return res.status(200).send({"message": "updated successfully"})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({"message": ErrorEvent.message})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const deletedBook = await Book.findByIdAndDelete(id)

        if(!deletedBook) return res.status(404).send({message: "not found"})

        console.log("deleted successfully")
        return res.status(200).send({"message": "deleted successfully"})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({"message": ErrorEvent.message})
    }
})

export default router