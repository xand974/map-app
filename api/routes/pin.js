const router = require("express").Router();
const {
  create,
  update,
  delete: deleteOne,
  getAll,
  getOne,
} = require("../controllers/pin");

const { isAdmin } = require("../middlewares/isAdmin");
const { verifyToken } = require("../middlewares/verify");

router.get("/one/:id", verifyToken, getOne);
router.get("/all", [verifyToken, isAdmin], getAll);
router.post("/add", verifyToken, create);
router.put("/:id", verifyToken, update);
router.delete("/:id", verifyToken, deleteOne);

module.exports = router;
