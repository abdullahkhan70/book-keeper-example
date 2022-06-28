import { NextFunction, Request, Response } from 'express';
import Joi, { ObjectSchema } from 'joi';
import Logging from '../library/Logging';
import { AuthorInterface } from '../models/AuthorsModel';
import { BookModel } from '../models/BookModel';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (err) {
            Logging.error(err);
            return res.status(422).json({ err });
        }
    }
}

export const Schemas = {
    author: {
        createAuthor: Joi.object<AuthorInterface>({
            name: Joi.string().required(),
            age: Joi.number().required(),
            address: Joi.string().required(),
            contact_number: Joi.string(),
            email_address: Joi.string().required()
        }),
        updateAuthor: Joi.object<AuthorInterface>({
            name: Joi.string(),
            age: Joi.number(),
            address: Joi.string(),
            contact_number: Joi.string(),
            email_address: Joi.string()
        })
    },
    book: {
        createBook: Joi.object<BookModel>({
            title: Joi.string().required(),
            author: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            pages: Joi.number().required()
        }),
        updateBook: Joi.object<BookModel>({
            title: Joi.string(),
            author: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            pages: Joi.number()
        })
    }
}