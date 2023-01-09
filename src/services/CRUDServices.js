import bcrypt from "bcryptjs";
import db from "../models";

var salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        image: data.image,
        roleId: data.roleId,
      });

      resolve("ok! create a new user success");
    } catch (e) {
      reject(e);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise((resolve, reject) => {
    try {
      let hashPassword = bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let getUserInfoById = (userId) => {
  return new Promise(async(resolve, reject) => {
    try{
      let user = await db.User.findOne({
        where: {id: userId},
        raw: true
      })
      if(user) {
        resolve(user)
      } else {
        resolve([])
      }
    } catch (e) {
      reject(e)
    }
  })
}

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {id: data.id}
      })
      if(user) {
        user.firstName = data.firstName,
        user.lastName = data.lastName,
        user.address = data.address,

        await user.save()
        // sau khi update user xong gọi all user bằng cách
        let allUser = db.User.findAll({
          raw: true,
        })
        resolve(allUser)
      } else {
        resolve()
      }
    } catch (e) {
      reject(e)
    }
  })
}

let deteleUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {id: id}
      })
      if(user) {
        await user.destroy()
      }
      resolve()
    } catch(e) {
      reject(e)
    }
  })
}

module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInfoById: getUserInfoById,
  updateUserData: updateUserData,
  deteleUserById: deteleUserById,
};
