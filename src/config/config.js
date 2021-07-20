require('dotenv').config();

module.exports = {
      dialect: process.env.DIALECT,
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      storage:  process.env.STORAGE || null
     // operatorAliases: false,
      /*define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
      },*/
  }