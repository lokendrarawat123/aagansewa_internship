import db from "../config/db_connect.js";
import { removeImg } from "../utils/removeImg.js";
import { compressImg } from "../utils/sharphandler.js";

//add service api
export const addServices = async (req, res, next) => {
  try {
    //for getting img we use req.file
    const { service_name, description, branch_id } = req.body;

    const image = req.file;

    if (!image || !service_name || !branch_id) {
      if (req.file) {
        removeImg(req.file.path);
      }
      return res.status(400).json({
        message: "please provide all input ",
      });
    }
    const [result] = await db.execute(
      "select service_name from services where service_name = ? ",
      [service_name]
    );
    if (result.length > 0) {
      if (req.file) {
        removeImg(req.file.path);
      }
      return res.status(409).json({
        message: `${service_name} service already exists.`,
      });
    }
    const [existBranch] = await db.execute(
      "select branch_id ,branch_name from branch where branch_id = ?",
      [branch_id]
    );
    if (existBranch.length === 0) {
      if (req.file) {
        removeImg(req.file.path);
      }

      return res.status(404).json({
        message: `Invalid branch ID: ${branch_id}. Branch does not exist.`,
      });
    }
    let imagePath = "";
    if (req.file) {
      const outputPath = `uploads/services/school-${req.file.filename}`;
      await compressImg(req.file.path, outputPath);
      imagePath = outputPath;
    }

    await db.execute(
      "insert into services (service_name,service_image,branch_id,description) values (?,?,?,?)",
      [service_name, imagePath, branch_id, description || null]
    );
    res.status(201).json({
      message: `${service_name} service has been successfully added to the ${existBranch[0].branch_name} branch.`,
    });
  } catch (error) {
    if (req.file) {
      removeImg(req.file.path);
    }

    next(error);
  }
};
//get services api
export const getServices = async (req, res, next) => {
  try {
    const { branch_id } = req.user;
    // console.log(req.user);
    if (req.user.role === "manager") {
      const [branchService] = await db.execute(
        "select * from services where branch_id=?",
        [branch_id]
      );
      if (branchService.length === 0) {
        return res.status(403).json({
          message: "service not found",
        });
      }

      return res.status(200).json({
        message: ` your ${branchService[0].branch_id} th services are fetched successfully`,
        services: branchService,
      });
    }
    const [allServices] = await db.execute(
      "select * from services order by created_at desc"
    );
    res.status(200).json({
      message: "service displayed succesfully",
      allServices: allServices,
    });
  } catch (error) {
    next(error);
  }
};
//delete service api
export const deleteService = async (req, res, next) => {
  try {
    // first get the id from req.params which service will delete
    const { id } = req.params;

    // check the service id provide or not
    if (!id) {
      return res.status(400).json({
        message: "please provide id of deleteing service  ",
      });
    }
    // check provided service id is exist or not
    const [result] = await db.execute(
      "select service_id, service_name , branch_id from services where service_id = ? ",
      [id]
    );
    if (result.length === 0) {
      return res.status(404).json({
        message: `service is not exist in this ${id} id`,
      });
    }
    if (req.user.role === "manager") {
      req.params.branch_id = result[0].branch_id;
      if (req.params.branch_id !== req.user.branch_id) {
        return res.status(403).json({
          message: "you can only access own branch",
        });
      }
    }
    await db.execute("delete from services where service_id = ?", [id]);
    res.status(200).json({
      message: `${result[0].service_name} service was deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};
//update service api
export const updateService = async (req, res, next) => {
  try {
    //get update service id from req.params
    const { service_id } = req.params;
    //get service image from the req.file
    const service_image = req.files;
    // get update form data from the req.body
    const { service_name, description } = req.body;
    const [result] = await db.execute(
      "select * from services where service_id = ? ",
      [service_id]
    );
    if (result.length === 0) {
      if (req.files) {
        removeImg(req.files.path);
      }
      return res.status(404).json({
        message: `${service_name} service is not found `,
      });
    }
    if (req.user.role === "manager") {
      // for the access only own branch
      req.params.branch_id = result[0].branch_id;
      if (req.params.branch_id !== req.user.branch_id) {
        return res.status(403).json({
          message: "you can only access own branch",
        });
      }
    }
    const oldService = result[0];
    const updateServiceName = service_name || oldService.service_name;
    const updateDescription = description || oldService.description;

    let imagePath = "";
    if (req.file) {
      const outputPath = `uploads/services/school-${req.file.filename}`;
      await compressImg(req.file.path, outputPath);
      imagePath = outputPath;
      if (oldService.service_image) {
        removeImg(
          `uploads/services/${oldService.service_image.split("/").pop()}`
        );
      }
    }

    await db.execute(
      "UPDATE services set service_name=?,service_image=?,description=? where service_id=?",
      [updateServiceName, imagePath, updateDescription, service_id]
    );
    res.status(200).json({
      message: `${updateServiceName} service is updated successfully`,
    });
  } catch (error) {
    next(error);
  }
};

// api for public services
export const publicGetServices = async (req, res, next) => {
  try {
    const { province_id, district_id, branch_id } = req.query;
    // console.log(req.query);
    let query = "";
    let params = [];
    if (province_id && !district_id && !branch_id) {
      query = "select * from district where province_id=?";
      params = [province_id];
    } else if (province_id && district_id && !branch_id) {
      query = "select * from branch where district_id =?";
      params = [district_id];
    } else if (province_id && district_id && branch_id) {
      query = "select * from services where branch_id =?";
      params = [branch_id];
    } else {
      query = "select * from services order by created_at desc";
    }
    const [result] = await db.execute(query, params);
    return res.status(200).json({
      message: "service displayed succesfully",
      allServices: result,
    });
  } catch (error) {
    next(error);
  }
};

//delete service api
export const getServicesByBranch = async (req, res, next) => {
  try {
    // first get the id from req.params which service will delete
    const branchId = Number(req.params.branchId);

    // check the service id provide or not
    if (!branchId) {
      return res.status(400).json({
        message: "please provide id  ",
      });
    }
    // check provided service id is exist or not
    const [rows] = await db.execute(
      "select *  from services where branch_id = ? ",
      [branchId]
    );
    res.status(200).json({
      message: "succesfully displayed",
      data: rows,
    });
  } catch (error) {
    next(error);
  }
};
