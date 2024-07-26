import "reflect-metadata"
import connectDB from "./startup/db";
const express = require("express");
import routes from './startup/routes'
import { ErrorHandler } from "./middleware/ErrorHandler";
const app = express();
const cors = require('cors');   //  configure Cross-Origin Resource Sharing


export async function start() {
    await connectDB();
    await app.use(cors());
    routes(app);
    app.use(ErrorHandler.handle);

    const port = process.env.PORT || 3000;

    app.listen(port, () => console.log(`Listening on port ${port}...`));
}

start();