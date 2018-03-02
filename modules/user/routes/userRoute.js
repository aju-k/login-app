import express from "express";
import UserController from "userModule/controllers/userController";
import UserValidator from "userModule/validators/userValidator";

const router = express.Router();
const userControllerObj = new UserController();

router.get("/login", function(req, res, next) {
    if (req.session.userInfo != undefined) {
        res.redirect('/user/list');
    } else {
        const Error = (req.session.hasOwnProperty('loginError')) ? req.session.loginError : null;
        res.render('user/login', { title: 'User Login', userInfo: "", Error: Error });
    }
});

router.post("/checkLogin", UserValidator.LoginValidation, userControllerObj.CheckUserLogin);
// router.get("/list", UserValidator.CheckAdminLogin, userControllerObj.List);
router.get("/register", userControllerObj.RegisetrUser);
router.get("/logout", userControllerObj.Logout);
router.post('/signup', UserValidator.SignupUserValidation, userControllerObj.Signup)
router.get('/profile', UserValidator.Login, userControllerObj.Profile)
router.delete('/delete-profile', UserValidator.Login, userControllerObj.Delete)

module.exports = router;