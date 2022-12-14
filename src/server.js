import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./configs/viewEngine";
import initWebRoutes from "./router/web";
import ConnectDB from "./configs/connectDB";

require('dotenv').config()

let app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app)
initWebRoutes(app)

ConnectDB()

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("run successfully: " + port);
})