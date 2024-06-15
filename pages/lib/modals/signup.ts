// models/User.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

interface IUser extends Document {
    name: string;
    username: string;
    password: string;
    imageUrl?: string;
    email: string;
    mobile?: string;
    isPriority?: boolean;
    code?: string;
    class?: string;
    profile?: string[];
    access?: string[];
    isActive?: boolean;
    createdDate?: Date;
    updatedDate?: Date;
    createdBy?: string;
    updatedBy?: string;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    imageUrl: { type: String },
    email: { type: String, required: true, unique: true },
    mobile: { type: String },
    isPriority: { type: Boolean, default: false },
    code: { type: String },
    class: { type: String },
    profile: { type: [String] },
    access: { type: [String] },
    isActive: { type: Boolean, default: true },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
    createdBy: { type: String },
    updatedBy: { type: String }
});

const SignUp = (mongoose.models.SignUp as Model<IUser>) || mongoose.model<IUser>('SignUp', UserSchema);

export default SignUp;