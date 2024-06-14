import { User } from "@/pages/lib/modals/user";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from "next";
import dotenv from 'dotenv';
dotenv.config(); 
type Data = {
  message?: string;
  success?: boolean;
  token?: string;
  tokenObject?: any;
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  
  if (req.method !== 'POST') {
    return res.status(200).json({ message: 'Method Not Allowed' });
  }
  const payload = req.body;
  console.log(payload);
  
  try {
    if (!process.env.MONGODB) {
      throw new Error('MongoDB connection string is not defined in the environment variables.');
  }

    await mongoose.connect(process.env.MONGODB);
    const user = await User.findOne({ email: payload.email });
    console.log("user fetch",user);

    if (!user) {
      return res.status(401).json({ message: 'User Not Found', success: false });
    } else {

      if (!user.varified) {
        return res.status(401).json({ message: "Email hasn't been verified yet. Check your inbox.", success: false });
      } else {
        const tokenObject = {
          _id: user._id,
          varified: user.varified,
          email: user.email,
          role: user.role
        };
        const jwtToken = jwt.sign(tokenObject,'secret', { expiresIn: '4h' });
        return res.status(200).json({ token: jwtToken, tokenObject, success: true });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
}
