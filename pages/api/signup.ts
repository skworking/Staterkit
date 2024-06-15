import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from "mongoose";
import SignUp from '../lib/modals/signup';
import bcrypt from 'bcryptjs';
import * as yup from 'yup';
import dotenv from 'dotenv';
dotenv.config(); 

const signupSchema = yup.object().shape({
    name: yup.string().required(),
    username: yup.string(),
    password: yup.string().required(),
    email: yup.string().email().required(),
    mobile: yup.string(),
    imageUrl: yup.string().required(),
    code: yup.string(),
    class: yup.string(),
    profile: yup.array().of(yup.string()),
    access: yup.array().of(yup.string()),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MongoDB connection string is not defined in the environment variables.');
        }
        await mongoose.connect(process.env.MONGO_URI);

        // Validate input
        await signupSchema.validate(req.body);

        const { name, password, email, mobile, imageUrl, class: userClass, profile, access } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new SignUp({
            name,
            username:email,
            password: hashedPassword,
            email,
            mobile,
            imageUrl,
            code:name,
            class: userClass,
            profile,
            access
        });

        await user.save();

        res.status(201).json({ message: 'User created successfully',success:true });
    } catch (error:any) {
        res.status(400).json({ error: error.message });
    }
}