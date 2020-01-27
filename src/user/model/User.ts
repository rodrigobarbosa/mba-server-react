import {Document, model, Schema} from 'mongoose';

export class User extends Document {
    username?: string;
    password?: string;
}

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true}
});

export const UserModel = model<User>('User', userSchema);
