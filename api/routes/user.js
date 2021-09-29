const router = require("express").Router();
const {
  getUserStatistics,
  update,
  delete: deleteOne,
  getAll,
  getOne,
} = require("../controllers/user");

const {
  verifyToken,
  verifyAdmin,
  verifyUserOrAdmin,
} = require("../middlewares/verify");

router.get("/stats", [verifyToken, verifyAdmin], getUserStatistics);
router.get("/one/:id", verifyToken, getOne);
router.get("/all", [verifyToken, verifyAdmin], getAll);
router.put("/:id", [verifyToken, verifyUserOrAdmin], update);
router.delete("/:id", [verifyToken, verifyUserOrAdmin], deleteOne);

module.exports = router;
