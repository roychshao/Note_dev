import dotenv from "dotenv";
dotenv.config();

const secret = process.env.SECRET;

const auth = async (req, res, next) => {

  try {
    res.user = req.session.passport.user
    const expTime = req.session.cookie._expires
    if(expTime < new Date().toISOString()) throw new Error();
    next();
  } catch (error) {
    req.session.destroy();
    res.status(401).json({ success: false, message: "session parse error" })
  }
};

export default auth;
