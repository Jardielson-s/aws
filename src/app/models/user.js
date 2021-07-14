module.exports = (sequelize,DataTypes)=>{
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        avatar: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
      }
    );

      User.prototype.toJSON= function(){
        var values = Object.assign({},this.get());
  
        delete values.password;
  
        return values;
      }
      
    User.associate = function(models){
      User.hasMany(models.Upload,{
        as:'UploadId'
      })
    }
    

    return User;
}