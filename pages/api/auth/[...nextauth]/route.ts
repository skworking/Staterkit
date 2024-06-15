// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '@/pages/lib/modals/user';
import { NextAuthOptions } from 'next-auth';

const options = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith@example.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
         
        if (!process.env.MONGO_URI) {
            throw new Error('MongoDB connection string is not defined in the environment variables.');
          }

        await mongoose.connect(process.env.MONGO_URI);

        const user = await User.findOne({ email: credentials?.email });
        if (!user) {
          throw new Error('No user found with the email');
        }

        const isValid = await bcrypt.compare(credentials?.password, user.password);
        if (!isValid) {
          throw new Error('Password doesn\'t match');
        }

        return { id: user._id, email: user.email };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.JWT_SECRET,
};

export default NextAuth(options);
