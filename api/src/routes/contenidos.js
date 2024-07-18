const router = require("express").Router();
const {
  createContenido,
  // editContenido,
  // deleteContenido,
  getContenidos,
} = require("../controllers/index.js");

//----------------------------- Create a new Contenido -----------------------------//
router.post("/", async (req, res) => {
  const response = await createContenido(req);
  res.status(response.status).json(response);
});

//----------------------------- Edit a Contenido -----------------------------//
// router.put("/:departamentoId", async (req, res) => {
//   const response = await editContenido(req);
//   res.status(response.status).json(response);
// });

//-----------------------------  Delete a Contenido -----------------------------//
// router.delete("/:departamentoId", async (req, res) => {
//   const response = await deleteContenido(req);
//   res.status(response.status).json(response);
// });

//----------------------------- Get all or a single Contenido -----------------------------//
router.get("/", async (req, res) => {
  const response = await getContenidos(req);
  res.status(response.status).json(response);
});

module.exports = router;
