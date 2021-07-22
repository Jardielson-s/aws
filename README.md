###   tools for project and installation
```
* npm i express mysql2 multer sequelize
* npm i jsonwebtoken dotenv cors
* npm i -D nodemon jest sequelize-cli
* npm install morgan
* npm install multer-s3
* npm install aws-sdk
* npm i -D sqlite3 # database to developerment 
* npm i faker #  fackers datas generate
* npm i factory-girl # attributes generate
* npm i -D jest # make integration and united test
* npm start # run project
```

### scripts for package.json

<p>"restart" </p>

```
npx sequelize db:migrate:undo:all && npx sequelize db:migrate
```

<p> this script above formats migrations and restarts </p>

<p>"start"</p>

```
nodemon src/index.js
```

<p> the script above starts the project </p>

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


### struct project image 

![alt text](https://github.com/Jardielson-s/aws/blob/main/images/imageOfStruct.png)


### teste

<p>
in testing use sqlite3 with development database, use jest, faker and factory-girl to generate dummy data.
</p>
<p>
run test
<p>

```
npm test
```

<p>
in the test you choose where the storage is located in the local or s3, just select in the environment variables
</p>