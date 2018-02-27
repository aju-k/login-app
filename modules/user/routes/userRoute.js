import express from "express";
import UserController from "userModule/controllers/userController";
import UserValidator from "userModule/validators/userValidator";

const router = express.Router();
const userControllerObj = new UserController();

router.get("/login", function(req, res, next) {
    if (req.session.userInfo != undefined) {
        res.redirect('/user/list');
    } else {
        const Error = (req.session.hasOwnProperty('loginError'))? req.session.loginError:null;
        res.render('user/login', {title: 'User Login', userInfo: "", Error: Error});
    }
});

router.post("/checkLogin", UserValidator.LoginValidation,  userControllerObj.CheckLogin);
router.get("/list", UserValidator.Login, userControllerObj.List);
router.get("/register", userControllerObj.RegisetrUser);
router.get("/logout", userControllerObj.Logout);
router.post('/signup', userControllerObj.Signup)

module.exports = router;