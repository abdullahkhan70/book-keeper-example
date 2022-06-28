import mongoose, { Document, Schema } from 'mongoose';

export interface BookModel {
    title: string;
    author: string;
    pages: number;
}

export interface BookSchemaModel extends BookModel, Document { };

const BookSchema = new Schema({
    title: { type: mongoose.Schema.Types.String, require: true },
    author: { type: Schema.Types.ObjectId, require: true, ref: 'Author' },
    pages: { type: mongoose.Schema.Types.Number, require: true }
}, { timestamps: true, });

export default mongoose.model<BookSchemaModel>("Book", BookSchema);