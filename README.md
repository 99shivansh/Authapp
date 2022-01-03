# AuthApp

AuthApp is an pure authentication app which is developed using following technologies :-\
* Node.JS 
* Express.JS 
* PostgreSQL 
* React.JS

## Requirements
These prerequisites should be pre-installed on the system before running the app.:- \
Node.js [link](https://nodejs.org/)  
PostgreSQL [link](https://www.postgresql.org/)    


## Installation
After installing prerequisites we need to install all the dependencies required by the project for that follow steps accordingly:- \
For Backend:- \
Go to the directory and install required dependencies
```bash
cd backend
npm install
```

For frontend:- \
Go to the directory and install required dependencies
```bash
cd frontend
npm install
```
Now Before moving forward we need to also set-up Postgres environment same as I created so that it won't interfare with backend when running on your local environment. so after installing postresql when you are on its command line 


#### important We need to create an database as "authapp" and table "users" with a custom role named after me "shivansh" and its password as "password" and this role will have all  access to users table. For that you can follow steps  :-
First lets create new user when command line (when its ask for username create username as "shivansh" and password as "password") 
```bash
su - postgres
createuser --interactive --pwprompt
```
Now lets create a database names as "authapp" after running "psql" command and when on psql  commandline
```bash
psql
CREATE DATABASE authapp

```
Lets give user "shivansh" all rights to "authapp" database :- 
```bash
 grant all privileges on database authapp to shivansh;
```
And finally add table "users" with all columns
 ```bash
CREATE TABLE users (
	id BIGSERIAL PRIMARY KEY NOT NULL ,
	firstname VARCHAR(50) NOT NULL ,
	lastname VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL ,
	country VARCHAR(50) NOT NULL  ,
    mobilenumber VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    UNIQUE (email)
);
```
Now we can finally run our app after setting up all the required environment.
## Usage
Now when everything is setup open 2 terminals one for backend and one for frontend by moving to respective directories. \
For backend:-
```bash
cd backend
npm run dev
```
For frontend:-
```bash
cd frontend
npm start
```
Please note always start backend before frontend and when promtd on frontend use different port than localhost:3000 press Y.(because port 3000 is used by Node.js server) \
Project should live and running on \
http://localhost:3001/

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
