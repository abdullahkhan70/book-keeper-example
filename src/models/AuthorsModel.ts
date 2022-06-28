import mongoose, { Document, Schema } from "mongoose";

export interface AuthorInterface {
    name: string;
    age: number;
    address: string;
    contact_number: string;
    email_address: string;
}

export interface AuthorModalInterface extends AuthorInterface, Document { }

const AuthorSchema: Schema = new Schema({
    name: { type: mongoose.Schema.Types.String, require: true },
    age: { type: mongoose.Schema.Types.Number, require: true },
    address: { type: mongoose.Schema.Types.String, require: true },
    contact_number: { type: mongoose.Schema.Types.String, require: false },
    email_address: { type: mongoose.Schema.Types.String, require: true }
})

export default mongoose.model<AuthorModalInterface>('Author', AuthorSchema);