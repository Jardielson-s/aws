'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users',{

      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false,
        required: true
      },
      avatar:{
        type: Sequelize.STRING
      },
      email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        required: true
      },
      password:{
        type: Sequelize.STRING,
        allowNull: false,
        required: true
      },
      createdAt:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt:{
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
     return queryInterface.dropTable('Users');
  }
};
