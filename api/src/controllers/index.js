const regions = require("./regions");
const departamentos = require("./departamentos");
const municipios = require("./municipios");
const lugares = require("./lugares");
const tiposLugares = require("./tiposLugares");

module.exports = {
  ...regions,
  ...departamentos,
  ...municipios,
  ...lugares,
  ...tiposLugares,
};
