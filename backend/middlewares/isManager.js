export const isManager = (req, res, next) => {
  const { role } = req.user;
  if (role !== "manager") {
    return res.status(401).json({
      message: "unauthhorized!!!!!!!!!!!!",
    });
  }
  next();
};
