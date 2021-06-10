
module.exports = (sequelize, DataTypes) => {

    const Upload = sequelize.define('Upload',{
        name: DataTypes.STRING,
        path: DataTypes.STRING,
        id_user:DataTypes.INTEGER,
    });

    Upload.associate = function(models){
        Upload.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    };

   
    return Upload;
}