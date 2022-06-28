import express from 'express';
import BookController from '../controller/BookController';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const route = express.Router();

route.post('/create_book', ValidateSchema(Schemas.book.createBook), BookController.createBook)
route.get('/read_book', BookController.readAllBooks)
route.get('/read_book/:book_id', BookController.readSpecificBook)
route.patch('/update_book/:book_id', ValidateSchema(Schemas.book.updateBook), BookController.updateBook)
route.delete('/delete_book/:book_id', BookController.deleteBook)

export = route;