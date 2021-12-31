const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Areas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Areas.hasMany(models.CovidData, {
        foreignKey: 'unique_id',
        as: 'data',
      });
    }
  }
  Areas.init({
    unique_id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
    area_type: DataTypes.ENUM('CITY', 'STATE', 'COUNTRY'),
  }, {
    sequelize,
    modelName: 'Areas',
    tableName: 'areas',
  });
  return Areas;
};
