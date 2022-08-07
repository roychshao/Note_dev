import dotenv from 'dotenv';
import User from './../db_interact/user.js';

dotenv.config();
const HOST = process.env.HOST;
const PORT = process.env.PORT;

export const signup = async (req, res, next) => {

    const { user_id, username, email } = req.session?.passport?.user;

    await User.sign_up(user_id, username, email)
    .then(result => {
        var response = {
            "success": true,
            "message": "使用者註冊成功",
            "data": {}
        }
        console.log(response);
        res.status(301).redirect(`${HOST}/#/home`);
    }).catch(err => {
        var response = {
            "success": false,
            "message": "使用者註冊失敗 error: " + err.message,
            "data": {}
        }
        res.status(400).json(response);
    })
}
