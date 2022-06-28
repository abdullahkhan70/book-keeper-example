import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import BookModel from '../models/BookModel';

const createBook = (req: Request, res: Response, next: NextFunction) => {
    const { title, author, pages } = req.body;

    return new BookModel({
        _id: new mongoose.Types.ObjectId(),
        title,
        author,
        pages
    })
        .save()
        .then(book => res.status(201).json({ book, message: "Successfully, Book Created." }))
        .catch(err => res.status(500).json({ message: err }));

}

const readSpecificBook = (req: Request, res: Response, next: NextFunction) => {
    const book_id = req.params.book_id;

    return BookModel
        .findById(book_id)
        .populate('author')
        .select('-__v')
        .then(book => book ? res.status(200).json({ book }) : res.status(404).json({ message: "Not Found." })).
        catch(err => res.status(500).json({ err }));
}

const readAllBooks = (req: Request, res: Response, next: NextFunction) => {
    return BookModel
        .find()
        .populate('author')
        .select('-__v')
        .then(book => res.status(200).json({ book }))
        .catch(err => res.status(500).json({ err }));
}

const updateBook = (req: Request, res: Response, next: NextFunction) => {
    const book_id = req.params.book_id;

    return BookModel
        .findByIdAndUpdate(book_id, req.body)
        .then(book => book ? res.status(201).json({ book }) : res.status(404).json({ message: "Not Found." }))
        .catch(err => res.status(500).json({ err }));
}

const deleteBook = (req: Request, res: Response, next: NextFunction) => {
    const book_id = req.params.book_id;

    return BookModel
        .findByIdAndDelete(book_id)
        .then(book => book ? res.status(200).json({ message: "Successfully, deleted a book." }) : res.status(404).json({ message: "Not Found." }))
        .catch(err => res.status(500).json({ err }));
}

export default { createBook, readSpecificBook, readAllBooks, updateBook, deleteBook };