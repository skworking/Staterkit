// import mongoose, { Schema, Document } from 'mongoose';
import {model,models,Schema} from 'mongoose';

export interface UserDocument {
    role: string;
    email: string;
    varified: boolean;
}

const UserSchema = new Schema<UserDocument>({
    role: { type: String, required: true },
    email: { type: String, required: true },
    varified: { type: Boolean, default: false }
});

export const User = models.User || model('User', UserSchema);
