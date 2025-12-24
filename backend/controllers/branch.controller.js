import db from "../config/db_connect.js";
import { removeImg } from "../utils/removeImg.js";

export const addProvince = async (req, res, next) => {
  try {
    const { name } = req.body; // getting data from the fronted or req.body
    // console.log(req.body);
    // 1. check name is provided or not
    // console.log(name);

    if (!name) {
      return res.status(400).json({ message: "please provide province name " });
    }

    //2 . check if the province already exists
    const [existing] = await db.execute(
      "select province_name from province where province_name = ?",
      [name]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        message: ` ${name} province is already exist`,
      });
    }

    //3. insert in province table
    await db.execute("insert into province(province_name) values(?)", [name]);
    //success message
    res.status(201).json({
      message: `${name} province  added succesfully`,
    });
  } catch (error) {
    next(error);
  }
};

//for getting province
export const getProvince = async (req, res, next) => {
  try {
    //left join for getting province and district
    const [allProvince] = await db.execute(
      `SELECT  
      p.province_id,
      p.province_name,
      GROUP_CONCAT(d.district_name) as district
      from province p 
      left join district d
      ON p.province_id = d.province_id
      GROUP BY p.province_id,p.province_name
       
    `
    );
    res.status(200).json({
      message: "succesfully displayed",
      provinces: allProvince,
    });
  } catch (error) {
    next(error);
  }
};

// export const updateProvince = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { province_name, province_number } = req.body;
//     // console.log(id);
//     //1 check that province is exist or not
//     const [existing] = await db.execute(
//       "select province_name from  province where province_id = (?) ",
//       [id]
//     );
//     if (existing.length === 0) {
//       res.status(404).json({
//         message: "province not found",
//       });
//     }

//     const existProvince = existing[0];
//     // console.log(existProvince);
//     // console.log(existing[0]);

//     const updatedProvinceName = province_name || existProvince.province_name;
//     const updatedProvinceNumber =
//       province_number || existProvince.province_number;

//     if (province_name == existProvince.province_name) {
//       return res.status(409).json({
//         message: `${province_name} province is already exist`,
//       });
//     }

//     await db.execute(
//       "UPDATE province SET province_name = ?, province_number = ? WHERE id = ?",
//       [updatedProvinceName, updatedProvinceNumber, id]
//     );

//     return res.status(200).json({
//       message: "province updated",
//     });
//   } catch (error) {
//next(error);
//   }
// };
export const deleteProvince = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [existing] = await db.execute(
      "select * from province where province_id=?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        message: `province not found with this ${id}th id`,
      });
    }
    const existProvince = existing[0];
    await db.execute("delete  from province where province_id=?", [id]);
    res.status(200).json({
      message: `${existProvince.province_name} province delete successfulyy`,
    });
  } catch (error) {
    next(error);
  }
};

// districts api
export const addDistrict = async (req, res, next) => {
  try {
    console.log(req.body);
    const { district_name, province_id } = req.body;
    if (!district_name || !province_id) {
      return res.status(404).json({
        message: "provide all input",
      });
    }

    //check  that district is already exist or not
    const [existing] = await db.execute(
      "select district_name  from district where district_name = ?",
      [district_name]
    );
    //check the province is exist or not
    const [existProvince] = await db.execute(
      "select province_id from province where province_id=?",
      [province_id]
    );
    if (existProvince.length === 0) {
      return res.status(409).json({
        message: " province id is not exist",
      });
    }

    if (existing.length > 0) {
      return res.status(404).json({
        message: `${district_name} district is already exist `,
      });
    }

    await db.execute(
      "insert into district  (district_name , province_id) values (?,?)",
      [district_name, province_id]
    );
    res.status(201).json({
      message: `${district_name} district is added successfully`,
    });
  } catch (error) {
    next(error);
  }
};
//get district api
export const getDistrict = async (req, res, next) => {
  try {
    const { role, email } = req.user;
    if (role === "admin") {
      const [allDistrict] = await db.execute(`
     SELECT 
     d.district_id,
      d.district_name,
      GROUP_CONCAT(b.branch_name) as branches
      FROM district d
      LEFT JOIN branch b ON d.district_id = b.district_id
   
     GROUP BY d.district_id,d.district_name`);

      res.status(200).json({
        message: "success",
        allDistricts: allDistrict,
      });
    }
  } catch (error) {
    next(error);
  }
};
//delete district api
export const deleteDistrict = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        message: "please provide id of delete district",
      });
    }
    const [existing] = await db.execute(
      "select * from district where district_id=?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(409).json({
        message: `district not found  for delete by this ${id}th id`,
      });
    }
    const existDistrict = existing[0];
    await db.execute("delete  from district where district_id=?", [id]);
    res.status(200).json({
      message: `${existDistrict.district_name} district delete successfully`,
    });
  } catch (error) {
    next(error);
  }
};

//update district api
// export const updateDistrict = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { distictName, provinceId } = req.body;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const addBranch = async (req, res, next) => {
  try {
    const { branch_name, district_id, remarks } = req.body;
    if ((!branch_name, !district_id)) {
      return res.status(404).json({
        message: "provide all input ",
      });
    }
    const [existing] = await db.execute(
      "select * from district where district_id = ? ",
      [district_id]
    );
    console.log(existing[0].district_name);
    if (existing.length === 0) {
      return res.status(404).json({
        message: "district id is not exist",
      });
    }
    const { role, email } = req.user; // fetch data from req.user which is logged user
    await db.execute(
      "insert into branch (branch_name,district_id,remarks) values (?,?,?)",
      [branch_name, district_id, remarks]
    );
    res.status(201).json({
      message: `${branch_name} branch added successfully in ${existing[0].district_name}`,
    });
  } catch (error) {
    next(error);
  }
};
//delete branch api
export const deleteBranch = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(id);
    if (!id) {
      return res.status(409).json({
        message: "provide  id ",
      });
    }
    const [existing] = await db.execute(
      "select branch_id,branch_name from branch where branch_id = ? ",
      [id]
    );
    const exist_district = existing[0];
    if (existing.length === 0) {
      return res.status(404).json({
        message: `branch not found by ${id}th id`,
      });
    }
    await db.execute("delete from branch where branch_id = ?", [id]);
    res.status(200).json({
      message: `${exist_district.branch_name} branch delete successfully`,
    });
  } catch (error) {
    next(error);
  }
};
//get branch api
export const getBranch = async (req, res, next) => {
  try {
    const [all_branch] = await db.execute(`select * from branch 
     `);
    res.status(200).json({
      message: "successfully displayed",
      branch: all_branch,
    });
  } catch (error) {
    next(error);
  }
};
