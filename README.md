###   tools for project and installation

* npm i express mysql2 multer sequelize
* npm i jsonwebtoken dotenv cors
* npm i -D nodemon jest sequelize-cli


### scripts for package.json

[comment]: <> ("restart": "cd src && npx sequelize db:migrate:undo:all && npx sequelize db:migrate && clear")
* this script above formats migrations and restarts
[comment]: <> ("start": "nodemon src/index.js")

### struct for project

* paste config: [comment]: <> (have mysql database connection setup)
* paste middleware: [comment]: <> (content all files reference middleware like multer, Authorization)
* paste migrations: [comment]: <> (database version control)
* paste controllers: [comment]: <> (content file references to part of the route controller )
* paste models: [comment]: <> (have models that are database reference tables)
* paste public: [comment]: <> (have static files  like images, vids, documents, etc)