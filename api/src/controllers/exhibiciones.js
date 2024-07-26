//Custom code
const {
  Exhibiciones,
  ListaTipos,
  Lugares,
  Sliders,
  Medios,
  ExhibicionesMultimediaContents,
} = require("../db.js");
const response = require("../common/response");
const { conn } = require("../db.js");

////////////////////////////////// EXHIBICIONES //////////////////////////////////

//----------------------------- Create a new exhibicion -----------------------------//
async function createExhibicion(req) {
  const t = await conn.transaction();
  try {
    // //Validate if exhibicion name exists

    // VALIDATE LUGAR
    if (!(await Lugares.findByPk(req.body.lugarId)))
      throw {
        error: `Lugar de Memoria ${req.body.lugarId} doesnt exists`,
        status: 404,
      };
    // VALIDATE TIPO EXHIBICION
    if (!(await ListaTipos.findByPk(req.body.tipoExhibicionId)))
      throw {
        error: `Tipo Exhibicion ${req.body.tipoExhibicionId} doesnt exists`,
        status: 404,
      };

    //Create row in database
    const newExhibicion = await Exhibiciones.create({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      lugarId: req.body.lugarId,
      tipoExhibicionId: req.body.tipoExhibicionId,
      portadaMedioId: req.body.portadaMedioId,
    });

    if (newExhibicion === null)
      throw { error: "Error creating Exhibicion", status: 400 };

    await t.commit();
    return response(
      req.body,
      {
        title: "New exhibicion created",
        data: newExhibicion,
        status: 200,
      },
      "createExhibicion"
    );
  } catch (err) {
    //Rollback transactions
    await t.rollback();

    let error = err.error ? err.error : err;
    let status = err.error ? err.status : 500;
    return response(
      req.body,
      {
        title: "API Catched error",
        data: String(error),
        status: status,
        success: false,
      },
      "createExhibicion"
    );
  }
}
//----------------------------- End create a new exhibicion -----------------------------//

//----------------------------- Get all or a single exhibicion -----------------------------//
async function getExhibiciones(req) {
  try {
    let where = {};
    if (req.query.exhibicionId != null) where.id = req.query.exhibicionId;

    let order = [];
    order.push(["order", "asc"]);

    let exhibiciones = await Exhibiciones.findAll({
      where,
      // order,
      include: [{ model: ListaTipos, required: false }],
    });

    const data = where.id ? exhibiciones[0] : exhibiciones;

    return response(
      req.params,
      {
        title: "Exhibiciones",
        data,
        status: 200,
      },
      "getExhibiciones"
    );
  } catch (err) {
    return response(
      req.body,
      {
        title: "API Catched error",
        data: String(err),
        status: 500,
        success: false,
      },
      "getExhibiciones"
    );
  }
}
//----------------------------- End get all or a single ad -----------------------------//

module.exports = {
  createExhibicion,
  getExhibiciones,
};
