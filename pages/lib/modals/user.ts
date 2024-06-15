import mongoose, { Schema, Document, Model } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema: Schema<IUser> = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>('User', userSchema);

export default User;