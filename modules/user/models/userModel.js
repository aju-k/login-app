import mySqlConnection from "lib/mySqlConnection";
import Md5 from 'md5';

class UserModel{

    Login = (obj) => {
        return new Promise((resolve, reject) => {
            var username = obj.username;
            // var password = Md5(obj.password);
            var password = (obj.password);
            mySqlConnection.query("SELECT * FROM users WHERE Username = '" + username + "' AND Password = '" + password + "'", (err, result, fields) =>{
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

    List = () =>{
        return new Promise((resolve, reject) =>{
            let query = "SELECT * FROM users";
            mySqlConnection.query(query, (err, result, fields) =>{
                if (err) {
                    console.error(`Getting users list - Error-${err}`);
                    reject({ Error: "Error in getting users list", status: false });
                } else if (result.length > 0) {
                    resolve({userData: result, status: true});
                } else {
                    resolve({status: false});
                }
            })    


        });
    };

    SignupUser = (userObj) =>{
        return new Promise((resolve, reject) => {
            let sql = `call usp_RegisterUser(?, ?, ?,?)`;
            mySqlConnection.query(sql,
                [
                    userObj.first_name,
                    userObj.last_name,
                    userObj.email,
                    userObj.password,
                    userObj.date_of_birth,
                    userObj.address,
                    userObj.hobbies
                ], (err, result) => {
                    if (err) {
                        logger.info('Error While registering user', err);
                        reject({ Error: "Error While registering yser", Success: false, Error: true });
                    }
                    if (result) {
                        resolve({ Success: true, Error: false, Response: "User registerd succssfully" });
                    }
                }
            );
        });
    };
 


}
export default UserModel;


