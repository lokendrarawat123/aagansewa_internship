import becrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../config/db_connect.js";
dotenv.config();
const dot = process.env.secrete_key;
const expire = process.env.expireTime;

export const login = async (req, res, next) => {
  try {
    // first we need to get user password and email

    // console.log(req.body);
    const { email, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All  inputs are  required" });
    }

    //2. now we find the user is exist or not
    const [result] = await db.execute("select * from users where email =? ", [
      email,
    ]);
    // console.log(result[0]);
    // console.log(typeof result);
    if (result.length === 0) {
      res.status(400).json({
        message: `user not found this email ${email}`,
      });
    }
    //store the result value in any varaible
    const user = result[0];
    // console.log(user);

    const isMatch = await becrypt.compare(password, user.password);
    // console.log(isMatch);
    if (!isMatch) {
      res.status(401).json({
        message: "invalid crendial",
      });
    }
    //jwt=jsonwebtoken
    //for genarate token for cookies
    //it takes 3 things
    // i.your details 2.secret key 3. expire time
    const token = await jwt.sign(
      {
        //details
        id: user.id,
        name: user.name,
        email: user.email,
      },
      //secrete key
      dot,
      {
        //expire time
        expiresIn: expire,
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    //else success
    res.status(200).json({
      message: "login success",
      user: user,
    });
  } catch (error) {
    next(error);
  }
};
export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "succesfully sign out thank you",
    });
  } catch (error) {
    next(error);
  }
};
