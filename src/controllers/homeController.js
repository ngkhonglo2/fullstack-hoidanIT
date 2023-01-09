import db from "../models/index";
import CRUDService from "../services/CRUDServices";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homePage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

let getCRUD = async (req, res) => {
  res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  await CRUDService.createNewUser(req.body);
  res.send("post post");
};

let displayGetCRUD = async (req, res) => {
  let data = await CRUDService.getAllUser();
  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if(userId){
    let userData = await CRUDService.getUserInfoById(userId)
    return res.render("editCRUD.ejs", {
      dataUser: userData,
    })
  } else {
    return res.send('User not found!')
  }
}

let putCRUD = async (req, res) => {
  let data = req.body;
  let allUser = await CRUDService.updateUserData(data)
  return res.render("displayCRUD.ejs", {
    dataTable: allUser,
  });
}

module.exports = {
  getHomePage: getHomePage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
};
