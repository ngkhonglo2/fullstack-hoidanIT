import express from "express";
import homeControllers from "../controllers/homeController";

let router = express.Router()

let initWebRoutes = (app) => {
    router.get('/', homeControllers.getHomePage)
    router.get('/crud', homeControllers.getCRUD)

    router.post('/post-crud', homeControllers.postCRUD)
    router.get('/get-crud', homeControllers.displayGetCRUD)

    return app.use("/", router)
}

module.exports = initWebRoutes;