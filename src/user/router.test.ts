import req from "supertest";
import mockingoose from 'mockingoose';

import server from "../server";
import {UserModel} from "./model/User";

test("[GET] /users", async () => {
    const mock = [{
        _id: '507f191e810c19729de860ea',
        username: "anderson"
    }];

    mockingoose(UserModel).toReturn(mock, 'find');
    const res = await req(server).get("/users");
    expect(res.text).toBe(JSON.stringify(mock));
});


