# todo-fancy

## Basic Notes
##### deploy site: https://todofancy2.efratsadeli.online/
##### NOTE:  
##### for testing purposes use Chrome browser and allowed unsafe script

### Installation and Getting Started
```sh
$ npm init
$ npm install
$ npm run dev (server side)
$ live-server (client side)
```  

### List of API  

#### User - General (w/o authentication)
##### User register

Route | HTTP | Description | 
----- | ---- | ----------- | 
/user/register | POST | sign up for new user |  

##### Expected Input
###### name: e.g. Tomiko Van (put in req.body)
###### email: e.g. tomiko@van.com (put in req.body, should be unique)
###### password: e.g. thisispassword (put in req.body)
###### thirdpartylogin: NO (automatically set by system)  

##### Expected Output
###### if success will give a jsonwebtoken
###### if failed will give an error message 
(e.g. email is not valid or email is not unique )  

##### User login

Route | HTTP | Description | 
----- | ---- | ----------- | 
/user/login | POST | sign in for existing user |  

##### Expected Input
###### email: e.g. tomiko@van.com (put in req.body, should be unique)
###### password: e.g. thisispassword (put in req.body)  

##### Expected Output
###### if success will give a jsonwebtoken
###### if failed will give an error message 
(e.g. email is not valid or email is not unique )  

##### User login via Google

Route | HTTP | Description | 
----- | ---- | ----------- | 
/user/logingoogle | POST | sign in or signup via Google |  

##### Expected Input
###### idToken: Token from Google (put in req.body)  

##### Expected Output
###### if success will give a jsonwebtoken  

#### User (with authentication)
##### User get detail information

Route | HTTP | Description | 
----- | ---- | ----------- | 
/users/detail | GET | Get a detail information of a speficic user |  

##### Expected Input
###### token: jsonwebtoken (put in req.headers)
######  

##### Expected Output
###### if success will give a JSON Object
###### if failed will give an error message 
(e.g. Token is not Valid or User not found)
######  

#### Todolist transaction   
##### Todolist - Create

Route | HTTP | Description | 
----- | ---- | ----------- | 
/todolists/ | POST | Create new individual Todo |  

##### Expected Input
###### token: jsonwebtoken (put in req.headers)
###### title: e.g. this is todo list (put in req.body)
###### description: e.g. this is description (put in req.body)
###### duedate: (input should be in YYYY-MM-DD format and put in req.body)
e.g. 2018-12-12 
######  

##### Expected Output
###### if success will give a JSON Object
###### if failed will give an error message 
(e.g. Token is not Valid)
######  

##### Todolist - Edit

Route | HTTP | Description | 
----- | ---- | ----------- | 
/todolists/:id | PUT | Edit an existing Todo |  

##### Expected Input
###### token: jsonwebtoken (put in req.headers)
###### id: todo ID (put in req.params)
###### title: e.g. this is todo list (put in req.body)
###### description: e.g. this is description (put in req.body)
###### status: (should be COMPLETE or INCOMPLETE, put in req.body)
###### duedate: (input should be in YYYY-MM-DD format and put in req.body)
e.g. 2018-12-12 
######  

##### Expected Output
###### if success will give a JSON Object
###### if failed will give an error message 
(e.g. Token is not Valid, status should be COMPLETE or INCOMPLETE, or user is not authorized to edit)
######  

##### Todolist - Delete

Route | HTTP | Description | 
----- | ---- | ----------- | 
/todolists/:id | DELETE | Delete an existing Todo |  

##### Expected Input
###### token: jsonwebtoken (put in req.headers)
###### id: todo ID (put in req.params)
######  

##### Expected Output
###### if success will give a JSON Object
###### if failed will give an error message 
(e.g. Token is not Valid or user is not authorized to delete)
######  

##### Todolist - Display

Route | HTTP | Description | 
----- | ---- | ----------- | 
/todolists/:id | GET | Display an existing Todo |  

##### Expected Input
###### token: jsonwebtoken (put in req.headers)
###### id: todo ID (put in req.params)
######  

##### Expected Output
###### if success will give a JSON Object
###### if failed will give an error message (e.g. Token is not Valid)
######  

##### Todolist - Display List of Todo

Route | HTTP | Description | 
----- | ---- | ----------- | 
/todolists/lists | GET | Display an existing Todo |  

##### Expected Input
###### token: jsonwebtoken (put in req.headers)
######  

##### Expected Output
###### if success will give a JSON Object
###### if failed will give an error message (e.g. Token is not Valid)
######
