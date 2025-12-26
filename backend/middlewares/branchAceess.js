// middleware/branchAccess.js
export const authorizeBranchAccess = (req, res, next) => {
  // Admin can access all branches
  if (req.user.role === "admin") return next();

  // Manager can access only their own branch
  if (req.user.role === "manager") {
    // Check branch_id from body or params
    const branchId = req.body.branch_id || req.params.branch_id;

    if (!branchId) {
      return res.status(400).json({
        message: "branch_id is required",
      });
    }

    if (Number(branchId) !== Number(req.user.branch_id)) {
      return res.status(403).json({
        message: "You can access only your own branch",
      });
    }
  }

  next();
};
