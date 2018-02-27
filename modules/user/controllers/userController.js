import UserModel from "userModule/models/userModel";

class UserController{
    constructor(){
        this.userModel = new UserModel();
    }

    // Check login
    CheckUserLogin = (req, res, next) =>{
        var session = req.session;
        this.userModel.Login(req.body).then((user) => {
            console.log('Request body =>',req.body)
            if (user === false || user.LoginFail === false) {
                session.loginError = { message: "Invalid username and password" };
                res.redirect('/users/login')
            } else {
                session.userInfo = user;
                delete session.loginError;
                res.redirect('/users/profile');
            }
        }).catch((err) => {
            res.status(500).send(err);
        });
    };

       // Check login
    CheckAdminLogin = (req, res, next) =>{
        var session = req.session;
        this.userModel.AdminLogin(req.body).then((user) => {
            console.log('Request body =>',req.body)
            if (user === false || user.LoginFail === false) {
                session.loginError = { message: "Invalid username and password" };
                res.redirect('/users/login')
            } else {
                session.userInfo = user;
                delete session.loginError;
                res.redirect('/users/list');
            }
        }).catch((err) => {
            res.status(500).send(err);
        });
    };


    // Register user page
    RegisetrUser = (req, res, next) =>{
        res.render('user/registration', {title: 'Registration'});
    };

    // Create user
    Signup = (req, res, next) =>{
        console.log('Request body ===>', req.body);
        let reqBody = req.body;
        let userInfoObj = {
            "first_name": reqBody.firstName,
            "last_name": reqBody.last_name,
            "email": reqBody.email,
            "password": reqBody.password,
            "date_of_birth": reqBody.date_of_birth,
            "address": reqBody.address,
            "hobbies":reqBody.hobbies
        }
        this.userModel.SignupUser(userInfoObj).then((resObj) =>{
            if (resObj.Success){
                res.redirect('user/login', {message: resObj.Response})
            }
        }).catch((err) =>{
            res.send(err);
        })
    }

    // List all users
    List = (req, res, next) =>{
        this.userModel.List().then((userListData) =>{
            res.render('user/list', { title: "List of Users", userList: userListData, 
                    userInfo: req.session.userInfo});
        }).catch((err) =>{
            res.status(500).send(err);
        })

    };

    // Logout user session
    Logout = (req, res, next) => {
        req.session.destroy();
        res.redirect('/users/login');
    };

    Profile  = (req, res, next) => {
        var session = req.session;
        if (session){
            this.userModel.GetUserDetails(session.userInfo).then((userInfo) =>{
                if (userInfo.Success){
                    res.render('/user/profile', {userDetail: userInfo.Respone});
                }
            })
        }
    };

    Delete = (req, res, next) =>{
         this.userModel.Delete().then((userId) =>{
            req.session.destroy();
            res.redirect('/users/login');
        }).catch((err) =>{
            res.status(500).send(err);
        })
    }


};
export default UserController;