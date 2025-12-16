import db from "../config/db_connect.js";
import { removeImg } from "../utils/removeImg.js";

//add service api
export const addServices = async (req, res, next) => {
  try {
    //for getting img we use req.file
    const service_image = req.file;
    console.log(service_image);
    const { service_name, description, branch_id } = req.body;
    if (!service_image || !service_name || !branch_id) {
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
    let imagePath = `uploads/services/${req.file.filename}`;

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
    const { service_id } = req.params;
    // check the service id provide or not
    if (!service_id) {
      return res.status(400).json({
        message: "please provide id of deleting service ",
      });
    }
    // check provided service id is exist or not
    const [result] = await db.execute(
      "select id, service_name from services where service_id = ? ",
      [service_id]
    );
    if (result.length === 0) {
      return res.status(404).json({
        message: `service is not exist in this ${service_id} id`,
      });
    }
    await db.execute("delete from services where service_id = ?", [service_id]);
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
    const service_image = req.file;
    // get update form data from the req.body
    const { service_name, description } = req.body;
    const [result] = await db.execute(
      "select * from services where service_id = ? ",
      [service_id]
    );
    if (result.length === 0) {
      if (req.file) {
        removeImg(req.file.path);
      }
      return res.status(404).json({
        message: `${service_name} service is not found `,
      });
    }
    const oldService = result[0];
    const updateServiceName = service_name || oldService.service_name;
    const updateDescription = description || oldService.description;
    let updateServiceImage = oldService.service_image;
    if (req.file) {
      updateServiceImage = `uploads/services/${req.file.filename}`;
      if (oldService.service_image) {
        removeImg(
          `uploads/services/${oldService.service_image.split("/").pop()}`
        );
      }
    }
    await db.execute(
      "UPDATE services set service_name=?,service_image=?,description=? where service_id=?",
      [updateServiceName, updateServiceImage, updateDescription, service_id]
    );
    res.status(200).json({
      message: `${updateServiceName} service is updated successfully`,
    });
  } catch (error) {
    next(error);
  }
};
