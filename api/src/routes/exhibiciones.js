const router = require("express").Router();
const {
  createExhibicion,
  // editExhibicion,
  // deleteExhibicion,
  getExhibiciones,
} = require("../controllers/index.js");

//----------------------------- Create a new Exhibicion -----------------------------//
router.post("/", async (req, res) => {
  const response = await createExhibicion(req);
  res.status(response.status).json(response);
});

//----------------------------- Edit a Exhibicion -----------------------------//
// router.put("/:departamentoId", async (req, res) => {
//   const response = await editExhibicion(req);
//   res.status(response.status).json(response);
// });

//-----------------------------  Delete a Exhibicion -----------------------------//
// router.delete("/:departamentoId", async (req, res) => {
//   const response = await deleteExhibicion(req);
//   res.status(response.status).json(response);
// });

//----------------------------- Get all or a single Exhibicion -----------------------------//
router.get("/", async (req, res) => {
  const response = await getExhibiciones(req);
  res.status(response.status).json(response);
});

module.exports = router;
