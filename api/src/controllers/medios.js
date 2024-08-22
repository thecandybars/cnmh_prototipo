//Custom code
const { Medios, ListaTipos } = require("../db.js");
const response = require("../common/response");
const { conn } = require("../db.js");
const pinFileToIPFS = require("../common/pinFileToIPFS.js");

////////////////////////////////// MEDIOS //////////////////////////////////

//----------------------------- Create a new medio -----------------------------//
async function createMedio(req) {
  const t = await conn.transaction();
  try {
    // //Validate if medio name exists

    // // VALIDATE LUGAR
    // if (!(await Lugares.findByPk(req.body.lugarId)))
    //   throw {
    //     error: `Lugar de Memoria ${req.body.lugarId} doesnt exists`,
    //     status: 404,
    //   };
    // // VALIDATE TIPO EXHIBICION
    // if (!(await ListaTipos.findByPk(req.body.tipoExhibicionId)))
    //   throw {
    //     error: `Tipo Exhibicion ${req.body.tipoExhibicionId} doesnt exists`,
    //     status: 404,
    //   };

    //Create row in database
    const newMedio = await Medios.create({
      cid: null,
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      tipoMedioId: req.body.tipoMedioId,
      url: req.file ? req.file.path : null,
    });

    if (newMedio === null) throw { error: "Error creating Medio", status: 400 };

    let ipfs;
    if (req.body.pinToIPFS && req.file.path)
      ipfs = await pinFileToIPFS(req.file.path, req.file.originalname);
    console.log("🚀 ~ createMedio ~ ipfs:", ipfs);

    await t.commit();
    return response(
      req.body,
      {
        title: "New medio created",
        data: newMedio,
        status: 200,
      },
      "createMedio"
    );
  } catch (err) {
    console.log("🚀 ~ createMedio ~ err:", err);
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
//----------------------------- End create a new medio -----------------------------//

//----------------------------- Get all or a single medio -----------------------------//
async function getMedios(req) {
  try {
    let where = {};
    if (req.query.medioId != null) where.id = req.query.medioId;

    let order = [];
    order.push(["order", "asc"]);

    let medios = await Medios.findAll({
      where,
      include: [{ model: ListaTipos }],
    });
    const formattedMedios = medios.map((medio) => ({
      id: medio.id,
      cid: medio.cid,
      titulo: medio.titulo,
      descripcion: medio.descripcion,
      url: medio.url,
      tipoMedio: { id: medio.tipoMedioId, tipo: medio.ListaTipo?.first },
    }));
    const data = where.id ? formattedMedios[0] : formattedMedios;
    // const data = where.id ? medios[0] : medios;

    return response(
      req.params,
      {
        title: "Medios",
        data,
        status: 200,
      },
      "getMedios"
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
      "getMedios"
    );
  }
}
//----------------------------- End get all or a single ad -----------------------------//

module.exports = {
  createMedio,
  getMedios,
};
