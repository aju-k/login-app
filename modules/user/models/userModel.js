import mySqlConnection from "lib/mySqlConnection";
import Md5 from 'md5';

class UserModel {

    Login = (obj) => {
        return new Promise((resolve, reject) => {
            var username = obj.username;
            var password = Md5(obj.password);
            mySqlConnection.query("SELECT userId FROM users WHERE Username = '" + username + "' AND Password = '" + password + "'", (err, result, fields) => {
                if (err) {
                    console.error(`Login user - Error-${err}`);
                    reject({ Error: "Error in user login", LoginFail: false });
                } else if (result.length > 0) {
                    resolve(result[0]);
                } else {
                    resolve(false);
                }
            });
        });
    }

    AdminLogin = (obj) => {
        return new Promise((resolve, reject) => {
            var username = obj.username;
            // var password = Md5(obj.password);
            var password = (obj.password);
            mySqlConnection.query("SELECT id FROM admin WHERE Username = '" + username + "' AND Password = '" + password + "'", (err, result, fields) => {
                if (err) {
                    console.error(`Login admin - Error-${err}`);
                    reject({ Error: "Error in admin login", LoginFail: false });
                } else if (result.length > 0) {
                    resolve(result[0]);
                } else {
                    resolve(false);
                }
            });
        });
    }


    List = () => {
        return new Promise((resolve, reject) => {
            let query = "SELECT * FROM users";
            mySqlConnection.query(query, (err, result, fields) => {
                if (err) {
                    console.error(`Getting users list - Error-${err}`);
                    reject({ Error: "Error in getting users list", status: false });
                } else if (result.length > 0) {
                    resolve({ userData: result, status: true });
                } else {
                    resolve({ status: false });
                }
            })


        });
    };

    SignupUser = (userObj) => {
        return new Promise((resolve, reject) => {
            let sql = `call usp_RegisterUser(?,?,?,?,?,?,?)`;
            mySqlConnection.query(sql, [
                userObj.first_name,
                userObj.last_name,
                userObj.email,
                Md5(userObj.password),
                userObj.date_of_birth,
                userObj.address,
                userObj.hobbies != "" ? JSON.stringify(userObj.hobbies) : ""
            ], (err, result) => {
                if (err) {
                    console.log('error =>', err)
                    reject({ Error: "Error While registering yser", Success: false, Error: true });
                }
                if (result) {
                    resolve({ Success: true, Error: false, Response: "User registerd succssfully" });
                }
            });
        });
    };

    GetUserDetails = (userId) => {
        return new Promise((resolve, reject) => {
            mySqlConnection.query("SELECT * FROM users WHERE userId = ?", [userId], (err, result, fields) => {
                if (err) {
                    reject({ Error: "Error in getting user details", Success: false });
                } else if (result.length > 0) {
                    resolve({ Respone: result[0], Success: true });
                } else {
                    resolve({ Response: [], Success: true });
                }
            });
        });
    }

    Delete = (userId) => {
        return new Promise((resolve, reject) => {
            mySqlConnection.query("DELETE * FROM users WHERE userId = ?", [userId], (err, result, fields) => {
                if (err) {
                    reject({ Error: "Error in deleting user details", Success: false });
                } else if (result.length > 0) {
                    resolve({ Respone: result[0], Success: true });
                } else {
                    resolve({ Response: [], Success: true });
                }
            });
        });
    }
}
export default UserModel;