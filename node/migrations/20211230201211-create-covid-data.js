module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('covid_data', {
      unique_id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        primaryKey: true,
        type: Sequelize.DATEONLY,
      },
      cases: {
        type: Sequelize.INTEGER,
      },
      deaths: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('covid_data');
  },
};
