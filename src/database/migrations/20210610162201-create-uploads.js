'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Uploads',{
        id:{
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        name:{
          type: Sequelize.STRING,
          allowNull: false,
          required: true
        },
        path:{
          type: Sequelize.STRING,
          allowNull: false,
          required: true
        },
        UserId:{
          type: Sequelize.INTEGER,
          allowNull: false,
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          references:{
            model: 'Users',
            key: 'id',
          },
        },
        createdAt:{
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt:{
          type: Sequelize.DATE,
          allowNull: false
        }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Uploads');
  }
};
