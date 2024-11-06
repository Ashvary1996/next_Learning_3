import mongoose, { Document, Schema } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  message: Message[];
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is Required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
    match: [
      /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
      "Please use Valid Email",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
  verifyCode: {
    type: String,
    required: [true, "verifyCode is Required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "verifyCode Expiry is Required"],
  },
  isVerified: {
    type: Boolean,
    required: [true, "isVerified  is Required"],
  },
  isAcceptingMessage: {
    type: Boolean,
    required: [true, "isAcceptingMessage  is Required"],
  },
  message: {
    type: [MessageSchema],
  },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
