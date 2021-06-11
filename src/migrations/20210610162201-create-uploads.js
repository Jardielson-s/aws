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
          require: true
        },
        path:{
          type: Sequelize.STRING,
          allowNull: false,
          require: true
        },
        id_user:{
          type: Sequelize.INTEGER,
          allowNull: false,
          require: true,
          references:{
            model: 'Users',
            key: 'id'
          }
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
