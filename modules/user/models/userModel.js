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
            let query = "SELECT * FROM Users";
            mySqlConnection.query(query, (err, result, fields) =>{
                if (err) {
                    console.error(`Getting users list - Error-${err}`);
                    reject({ Error: "Error in getting users list", Success: false });
                } else if (result.length > 0) {
                    resolve(result[0]);
                } else {
                    resolve(false);
                }
            })    


        });
    };

    Register = (userObj) =>{
        return new Promise((resolve, reject) =>{

        });
    };
 


}
export default UserModel;


