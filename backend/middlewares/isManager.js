export const isAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== "manager") {
    return res.status(401).json({
      message: "Access denied.Manager only",
    });
  }
  next();
};
