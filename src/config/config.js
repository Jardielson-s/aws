module.exports = {
    development: {
      dialect: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root@123',
      database: process.env.DB_NAME || 'teste',
     // operatorAliases: false,
      /*define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
      },*/
    },
  }