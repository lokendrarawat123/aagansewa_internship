import db from "../config/db_connect.js";

export const addProvince = async (req, res) => {
  try {
    const { name } = req.body; // getting data from the fronted or req.body
    // console.log(req.body);
    // 1. check name is provided or not
    // console.log(name);
    const province_number = "";
    if (name == "sudurpaschim" || "Sudurpaschim" || "SUDURPASCHIM") {
      province_number = 7;
    }
    if (name == "Karnali" || "karnali" || "KARNALI") {
      province_number = 6;
    }
    if (name == "LUMBINI" || "Lumbini" || "lumbini") {
      province_number = 5;
    }

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
    console.log(error);
  }
};

//for getting province
export const getProvince = async (req, res) => {
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
    console.log(error);
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
//     console.log(error);
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
    console.log(error);
  }
};

// districts api
export const addDistrict = async (req, res, next) => {
  try {
    const { district_name, province_id } = req.body;
    if (!district_name || !province_id) {
      return res.status(404).json({
        message: "provide all input",
      });
    }

    //check  that district is already exist or not
    const [existing] = await db.execute(
      "select district_name  from district where district_name=?",
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
      message: `${district_name} is added successfully`,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getDistrict = async (req, res, next) => {
  try {
    const [allDistrict] = await db.execute(
      "select * from district order by district_name asc"
    );
    res.status(200).json({
      message: "success",
      allDistrict: allDistrict,
    });
  } catch (error) {
    console.log(error);
  }
};
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
        message: `district not found  for delete by this ${id}`,
      });
    }
    const existDistrict = existing[0];
    await db.execute("delete  from district where district_id=?", [id]);
    res.status(200).json({
      message: `${existDistrict.district_name} district delete successfully`,
    });
  } catch (error) {
    console.log(error);
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
      "select district_id from district where district_id = ? ",
      [district_id]
    );
    if (existing.length === 0) {
      return res.status(404).json({
        message: "district id is not exist",
      });
    }
    await db.execute(
      "insert into branch (branch_name,district_id,remarks) values (?,?,?)",
      [branch_name, district_id, remarks]
    );
    res.status(201).json({
      message: `${branch_name} branch added successfully`,
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteBranch = async (req, res, next) => {
  try {
    const { branch_id } = req.params;
    if (!branch_id) {
      res.status(409).json({
        message: "provide the id which brach you want to delete",
      });
    }
    const [existing] = await db.execute(
      "select id,branch_name from branch where branch_id = ? ",
      [branch_id]
    );
    const exist_district = existing[0];
    if (existing.length === 0) {
      res.status(404).json({
        message: `branch not found by ${branch_id}th id`,
      });
    }
    await db.execute("delete from branch where branch_id = ?", [branch_id]);
    res.status(200).json({
      message: `${exist_district.branch_name} branch delete successfully`,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getBranch = async (req, res, next) => {
  try {
    const [all_branch] = await db.execute(`
      SELECT  
      d.district_name,
      b.branch_id,
      b.branch_name,
      from district d 
      left join branch b
      ON b.brach_id = d.district_id
      `);
    res.status(200).json({
      message: "successfully displayed",
      branch: branch,
    });
  } catch (error) {
    console.log(error);
  }
};
