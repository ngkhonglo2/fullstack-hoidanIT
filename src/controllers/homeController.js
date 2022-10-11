import db from "../models/index";
import CRUDService from "../services/CRUDServices";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        })
    } catch (e) {
        console.log(e);
    }
}

let getCRUD = async (req, res) => {
    res.render('crud.ejs')
}

let postCRUD = async (req, res) => {
    await CRUDService.createNewUser(req.body)
    res.send('post post')
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
}