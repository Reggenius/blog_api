import "reflect-metadata"
import { DataSource } from "typeorm"
import Comment from "./entity/Comment";
import Post from "./entity/Post";
import User from "./entity/User";
const config = require('config');
import { ICredentials } from "./types";

const dbConfig: ICredentials = config.get('database');

export const AppDataSource = new DataSource({
    type: "mysql",
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.name,
    synchronize: true,
    logging: false,
    entities: [ Comment, Post, User ],
    migrations: [],
    subscribers: [],
})
