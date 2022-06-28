import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import AuthorsModel from "../models/AuthorsModel";

const createAuthor = (req: Request, res: Response, next: NextFunction) => {
    const { name, age, address, contact_number, email_address } = req.body;

    const author = new AuthorsModel({
        _id: new mongoose.Types.ObjectId(),
        name,
        age,
        address,
        contact_number,
        email_address
    });

    return author
        .save()
        .then(authors => res.status(200).json({ authors }))
        .catch(err => res.status(500).json({ err }));
};
const readSpecificAuthor = (req: Request, res: Response, next: NextFunction) => {
    const author_id = req.params.author_id;

    return AuthorsModel
        .findById(author_id)
        .then(authors => authors ? res.status(200).json({ authors }) : res.status(404).json({ message: "Not Found." }))
        .catch(err => res.status(500).json({ err }));
};
const readAllAuthor = (req: Request, res: Response, next: NextFunction) => {
    return AuthorsModel
        .find()
        .then(authors => res.status(200).json({ authors }))
        .catch(err => res.status(500).json({ err }));
};
const updateAuthor = (req: Request, res: Response, next: NextFunction) => {
    const author_id = req.params.author_id;

    return AuthorsModel
        .findById(author_id)
        .then(authors => {
            if (authors) {
                authors.set(req.body);
                return authors
                    .save()
                    .then(author => author ? res.status(200).json({ author }) : res.status(404).json({ message: "Not Found." }))
                    .catch(err => res.status(500).json({ err }));
            }
        })
};
const deleteAuthor = (req: Request, res: Response, next: NextFunction) => {
    const author_id = req.params.author_id;
    return AuthorsModel
        .findByIdAndDelete(author_id)
        .then(authors => authors ? res.status(200).json({ authors }) : res.status(404).json({ message: "Not Found." }))
        .catch(err => res.status(500).json({ err }));
};

export default { createAuthor, readSpecificAuthor, readAllAuthor, updateAuthor, deleteAuthor };