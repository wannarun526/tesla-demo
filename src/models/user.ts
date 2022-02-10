import { Schema } from 'mongoose';

// Document interface
interface User {
  name: string;
  email: string;
  avatar?: string;
}

// Schema
const schema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String
});


export default schema;
