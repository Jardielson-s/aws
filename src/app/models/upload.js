'use strict';
module.exports =  (Sequelize, DataTypes) => {

    const Upload = Sequelize.define('Upload',{
        name: DataTypes.STRING,
        path: DataTypes.STRING,
        UserId: DataTypes.INTEGER
    });

   Upload.associate = function(models){
        Upload.belongsTo(models.User,{
            foreignKey: 'UserId',
            as: 'users'
        });
    }
    return Upload;
}
