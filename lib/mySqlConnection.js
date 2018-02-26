import mysql from "mysql";
import dotenv from "dotenv";
dotenv.load();
const mySqlConnection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'interview_app'
});

mySqlConnection.connect((err) => {
    if (err) {
        throw err;
    }
});

export default mySqlConnection;
