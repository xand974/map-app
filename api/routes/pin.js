const router = require("express").Router();
const {
  create,
  update,
  delete: deleteOne,
  getAll,
  getOne,
} = require("../controllers/pin");

const { verifyToken, verifyUserOrAdmin } = require("../middlewares/verify");

router.get("/one/:id", verifyToken, getOne);
router.get("/all", [verifyToken], getAll);
router.post("/add", verifyToken, create);
router.put("/:id", [verifyToken, verifyUserOrAdmin], update);
router.delete("/:id", [verifyToken, verifyUserOrAdmin], deleteOne);

module.exports = router;
