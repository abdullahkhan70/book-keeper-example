import express from 'express';
import AuthorController from '../controller/AuthorController';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();
router.post('/create_author', ValidateSchema(Schemas.author.createAuthor), AuthorController.createAuthor);
router.get('/read_author/:author_id', AuthorController.readSpecificAuthor);
router.get('/read_author', AuthorController.readAllAuthor);
router.patch('/update_author/:author_id', ValidateSchema(Schemas.author.updateAuthor), AuthorController.updateAuthor);
router.delete('/delete_author/:author_id', AuthorController.deleteAuthor);

export = router;