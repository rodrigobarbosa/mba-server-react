import {User, UserModel} from "../model/User";
import { HttpException } from "../../exceptions/HttpException";

export class UserService {
    static findAll(query: any): Promise<User[]> {
        return UserModel.find(query).exec();
    }

    static create(body: User): Promise<User> {
        const user = new UserModel(body);
        return user.save()
    }

    static async findOne(id: string): Promise<User> {
        const user: User = await UserModel.findById(id);
        if(user === null) {
            throw new HttpException(404, "Usuário não cadastrado")
        }
        return user
    }

    static async update(id: string, body: User): Promise<User> {
        const user: User = await this.findOne(id);
        await user.update(body);
        return user
    }

    static async remove(id: string): Promise<User> {
        const user: User = await this.findOne(id);
        await user.remove();
        return user
    }
}
