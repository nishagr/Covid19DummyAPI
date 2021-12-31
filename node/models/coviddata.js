const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CovidData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CovidData.belongsTo(models.Areas, {
        foreignKey: 'unique_id',
        targetKey: 'unique_id',
        onDelete: 'CASCADE',
      });
    }
  }
  CovidData.init({
    unique_id: { type: DataTypes.INTEGER, primaryKey: true },
    date: { type: DataTypes.DATEONLY, primaryKey: true },
    cases: DataTypes.INTEGER,
    deaths: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'CovidData',
    tableName: 'covid_data',
  });
  return CovidData;
};
