var DataTypes = require("sequelize").DataTypes;
var _aprendiz = require("./aprendiz");
var _sensei = require("./sensei");

function initModels(sequelize) {
  var aprendiz = _aprendiz(sequelize, DataTypes);
  var sensei = _sensei(sequelize, DataTypes);

  aprendiz.belongsTo(sensei, { as: "idSensei_sensei", foreignKey: "idSensei"});
  sensei.hasMany(aprendiz, { as: "aprendiz", foreignKey: "idSensei"});

  return {
    aprendiz,
    sensei,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
