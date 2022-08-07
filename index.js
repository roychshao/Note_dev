import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import session from "express-session";
import mysqlSession from "express-mysql-session";
import helmet from "helmet";
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import passport from "passport";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { pool } from "./db_interact/db_pool.js";
const app = express();
dotenv.config();


// import routers
import userRouter from "./routes/user.js";
import itemRouter from "./routes/item.js";
import authRouter from "./routes/auth.js";

//資訊安全
app.use(helmet.hidePoweredBy());

//設定express
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

//設定跨域
app.use(cors());

//將每個request寫到access.log
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

//獲取靜態檔案
app.use(express.static(path.join(__dirname,"./","assets")))

//設定localhost port
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))

//設定request body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//設定session
const MYSQLStore = mysqlSession(session);
var sessionStore = new MYSQLStore({}, pool)

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 86400000,
        secure: true;
    }
}));


if (app.get("env") === "production") {
    app.set("trust proxy", 1);
}

app.use(passport.initialize());
app.use(passport.session());

// ROUTES
app.use('/user', userRouter);
app.use('/item', itemRouter);
app.use('/auth', authRouter);


//測試server在線
app.get('/', (req, res) => {
    const response = {
        "success": true,
        "message": "hello from Note",
        "data": {}
    };
    res.status(201).json(response);
})

// route for logging out
app.get('/auth/logout', (req, res) => {
    try {
        req.session.destroy(function(e){
            req.logout(() => {});
        });
    } catch(err) {
        console.err(err);
        res.status(400).send("logout failed");
    }
    res.status(201).send("logout success");
})

