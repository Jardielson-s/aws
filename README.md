###   tools for project and installation

* npm i express mysql2 multer sequelize
* npm i jsonwebtoken dotenv cors
* npm i -D nodemon jest sequelize-cli


### scripts for package.json

 <p> "restart": "cd src && npx sequelize db:migrate:undo:all && npx sequelize db:migrate && clear" </p>
 <p> this script above formats migrations and restarts </p>

<p>"start": "nodemon src/index.js")</p>

### struct for project

* paste config: 
<p> have mysql database connection setup </p>

* paste middleware:
<p> content all files reference middleware like multer, Authorization. </p>

* paste migrations:
<p> database version control. </p>

* paste controllers: 
<p> content file references to part of the route controller. </p>

* paste models:
<p> have models that are database reference tables. </p>

* paste public:
<p> have static files  like images, vids, documents, etc. </p>


<h3> struct project image </h3>
![image-1](https://github.com/Jardielson-s/aws/blob/main/imageOfStruct.png)