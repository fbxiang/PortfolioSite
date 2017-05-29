import { Schema, Document } from 'mongoose';
import { db } from './db';
import * as bcrypt from 'bcrypt-nodejs';

const UserSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  admin: {type: Boolean},
  state: {type: Number, default: 1}
})
UserSchema.methods.setPassword = function(password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync());
}

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

UserSchema.methods.refreshState = async function() {
  this.state += 1;
  await this.save();
}

export const UserModel = db.model('users', UserSchema);

export interface User extends Document {
  username: string;
  password: string;
  admin: boolean;
  state: Number;
  validPassword: (password: string) => boolean;
  setPassword: (password: string) => void;
  refreshState: () => Promise<void>;
}
