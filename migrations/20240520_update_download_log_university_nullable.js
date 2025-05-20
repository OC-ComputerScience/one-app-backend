'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('downloadLogs', 'universityId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'universities',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('downloadLogs', 'universityId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'universities',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });
  }
}; 