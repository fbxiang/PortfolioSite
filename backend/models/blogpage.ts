import { Schema, Document } from 'mongoose';
import { db } from './db';

const BlogPageSchema = new Schema({
  title: {type: String, required: true},
  author: {type: String, required: true},
  body: {type: String, required: true},
  description: String,
  date: {type:Date, default: Date.now},
})

BlogPageSchema.index({author: 1, title: 1}, {unique: true})

export const BlogPageModel = db.model('blogpages', BlogPageSchema);

export interface BlogPage extends Document {
  title: string,
  author: string,
  body: string,
  description: string,
  date: Date
}
