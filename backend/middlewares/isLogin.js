//get me
import jwt from "jsonwebtoken";
export const isLogin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    // console.log(token);
    if (!token) {
      return res.status(401).json({
        message: " sorry, login first :you are not login",
      });
    }

    const decoded = jwt.verify(token, process.env.secrete_key);
    // console.log(decoded);
    req.user = decoded;
   

    next();
  } catch (error) {
    next(error);
  }
};
