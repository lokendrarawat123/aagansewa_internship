import db from "../config/db_connect.js";

export const addProvince = async (req, res) => {
  try {
    const { name } = req.body; // getting data from the fronted or req.body
    // console.log(req.body);
    // 1. check name is provided or not
    // console.log(name);
    if (!name) {
      return res.status(400).json({ message: "please provide province name" });
    }

    //2 . check if the province already exists
    const [existing] = await db.execute(
      "select * from province where province_name = ?",
      [name]
    );
    console.log(existing.length > 0);

    if (existing.length > 0) {
      return res.status(409).json({
        message: "this  province is already is inserted",
      });
    }

    //3. insert in province table
    db.execute("insert into province(province_name) values(?)", [name]);
    return res.status(200).json({
      message: "province  inserted succesfully",
    });
  } catch (error) {
    console.log;
  }
};
export const getProvince = async () => {
  try {
    const { provinceDetails } = await db.execute("select * from province ");
    console.log(provinceDetails);
  } catch (error) {
    console.log(error);
  }
};
