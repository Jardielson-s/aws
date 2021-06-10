require('dotenv').config();

module.exports = {
    "username": process.env.DB_USER || 'root',
    "password": process.env.DB_PASSWORD || 'root@123',
    "database": process.env.DB_NAME || 'teste',
    "host": process.env.DB_HOST || 'localhost',
    "dialect": "mysql"
}
