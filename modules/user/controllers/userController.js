import UserModel from "userModule/models/userModel";

class UserController{
    constructor(){
        this.userModel = new UserModel();
    }

    CheckLogin = (req, res, next) =>{
        var session = req.session;
        this.userModel.Login(req.body).then((user) => {
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

    RegisterUser = (req, res, next) =>{
        this.userModel.RegisterUser(userObj).then((res) =>{

        })
    };

    List = (req, res, next) =>{
        this.userModel.List().then((userListData) =>{
            res.render('user/list', { title: "List of Users", userList: userListData, 
                    userInfo: req.session.userInfo});
        }).catch((err) =>{
            res.status(500).send(err);
        })

    };

    Logout = (req, res, next) => {
        req.session.destroy();
        res.redirect('/users/login');
    };

    
};
export default UserController;