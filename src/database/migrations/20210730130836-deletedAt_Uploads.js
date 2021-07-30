'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Uploads','deletedAt',{
      allowNull: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      type: Sequelize.DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
     return queryInterface.removeColumn('Uploads','deletedAt');
  }
};
