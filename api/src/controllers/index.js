const regions = require("./regions");
const departamentos = require("./departamentos");

module.exports = {
  ...regions,
  ...departamentos,
};
