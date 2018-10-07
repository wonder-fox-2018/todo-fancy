# todo-fancy
This app is basically a todo-list that can help users to organize their tasks

to run the app use cd to server then run `nodemon/bin/www` and cd server then run `live-server`

 **login**
----
  
  
  this API call is made for logging in a user to the web-app. the user will then receive a token that can be stored in the client localStorage
  
* **URL**
    /login

* **Method:**
  `POST` 
*  **URL Params**
    None
* **Data Params**

  `email: String`
  `password: String`
* **Success Response:**
  
  * **Code:** 200 
    **Content:** `{ token: string}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED 
    **Content:** `{ error : "user not found" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR 
    **Content:** `{ error : "server error" }`

* **Sample Call:**
    
    ```javascript
    $.ajax({
                method: 'POST',
                url: 'http://localhost:xxxx/login',
                data: {
                    email: $('#login-form input[name=email]').val(),
                    password: $('#login-form input[name=password]').val()
                }
            })
    ```

* **Notes:**
 

**Google Sign In**
----
  
  This API call is made for registering or logging in a user to the web-app through google oAuth. the user will then receive a token that can be stored in the client localStorage
  
* **URL**
    /signin/google

* **Method:**
  `POST` 
*  **URL Params**
    None
* **Data Params**

  `token: google token`
  
* **Success Response:**
  
  * **Code:** 200 
    **Content:** `{ token: string}`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR 
    **Content:** `{ error : "server error" }`


* **Sample Call:**
    
    ```javascript
    $.ajax({
                method: 'POST',
                url: `http://localhost:xxxx/signin/google`,
                data: {token: google_token}
            })
    ```

* **Notes:**

**register**
----
  
  This API call is made for registering a user to the web-app. the user will then receive a token that can be stored in the client localStorage
  
* **URL**
    /register

* **Method:**
  `POST` 
*  **URL Params**
    None
* **Data Params**

  `email: String`
  `password: String`
  `name: String`
* **Success Response:**
  
  * **Code:** 200 
    **Content:** `{ token: string}`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR 
    **Content:** `{ error : "server error" }`


* **Sample Call:**
    
    ```javascript
    $.ajax({
                method: 'POST',
                url: 'http://localhost:xxxx/register',
                data: {
                    email: email,
                    name: name,
                    password: password
                }
            })
    ```

* **Notes:**


**get user info**
----
  
  
  this API call is made to retrieve user info
  
* **URL**
    /user-info

* **Method:**
  `get` 
*  **URL Params**
    None
* **Data Params**

  `token: String`
* **Success Response:**
  
  * **Code:** 200 
    **Content:** `{name:string, email:string, password:string, oatuh:boolean}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED 
    **Content:** `{ error : "please login first" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR 
    **Content:** `{ error : "server error" }`

* **Sample Call:**
    
    ```javascript
    $.ajax({
                method: 'get',
                url: 'http://localhost:xxxx/user-info',
                headers: {
                    token: token
                }
            })
    ```

* **Notes:**
 
**get all task**
----
  
  
  this API call is made to retrieve user task list
  
* **URL**
    /task

* **Method:**
  `get` 
*  **URL Params**
    None
* **Data Params**

  `token: String`
* **Success Response:**
  
  * **Code:** 200 
    **Content:** `{name:string, description:string,due_date:date,isComplete:boolean}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED 
    **Content:** `{ error : "please login first" }`

  OR
  
  * **Code:** 401 UNAUTHORIZED 
    **Content:** `{ error : "not authorized" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR 
    **Content:** `{ error : "server error" }`

* **Sample Call:**
    
    ```javascript
    $.ajax({
                method: 'get',
                url: 'root/task',
                headers: {
                    token: token
                }
            })
    ```

* **Notes:**

**add task**
----
  
  
  this API call is made to add a new task for an authorized user
  
* **URL**
    /task

* **Method:**
  `post` 
*  **URL Params**
    None
* **Data Params**

  `token: String`
  `name:string`
  `description:string`
  `date: string`
* **Success Response:**
  
  * **Code:** 200 
    **Content:** `{name:string, description:string,due_date:date,isComplete:boolean}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED 
    **Content:** `{ error : "please login first" }`

  OR
  
  * **Code:** 401 UNAUTHORIZED 
    **Content:** `{ error : "not authorized" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR 
    **Content:** `{ error : "server error" }`

* **Sample Call:**
    
    ```javascript
    $.ajax({
                method: 'POST',
                url: `${root}/task`,
                headers: {
                    'access-token': token
                },
                data: {
                    name: name,
                    description: descriptin,
                    due_date: due_date
                }
            })
    ```

* **Notes:**
 
**edit task**
----
  
  
  this API call is made to edit a task
  
* **URL**
    /task

* **Method:**
  `put` 
*  **URL Params**
    None
* **Data Params**

  `token: String`
  `name:string`
  `description:string`
  `date: string`
* **Success Response:**
  
  * **Code:** 200 
    **Content:** `{name:string, description:string,due_date:date,isComplete:boolean}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED 
    **Content:** `{ error : "please login first" }`

  OR
  
  * **Code:** 401 UNAUTHORIZED 
    **Content:** `{ error : "not authorized" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR 
    **Content:** `{ error : "server error" }`

* **Sample Call:**
    
    ```javascript
    $.ajax({
                method: 'PUT',
                url: `${root}/task`,
                headers: {
                    'access-token': token
                },
                data: {
                    name: name,
                    description: descriptin,
                    due_date: due_date
                }
            })
    ```

* **Notes:**

**mark task as complete**
----
  
  
  this API call is made to mark a task as complete
  
* **URL**
    /task

* **Method:**
  `patch` 
*  **URL Params**
    None
* **Data Params**

  `token: String`
  `task_id:string`
* **Success Response:**
  
  * **Code:** 200 
    **Content:** `{name:string, description:string,due_date:date,isComplete:boolean}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED 
    **Content:** `{ error : "please login first" }`

  OR
  
  * **Code:** 401 UNAUTHORIZED 
    **Content:** `{ error : "not authorized" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR 
    **Content:** `{ error : "server error" }`

* **Sample Call:**
    
    ```javascript
    $.ajax({
                method: 'PATCH',
                url: `${root}/task`,
                headers: {
                    'access-token': token
                },
                data: {
                    id:id
                }
            })
    ```

* **Notes:**
 
**delete task**
----
  
  
  this API call is made to delete a task
  
* **URL**
    /task

* **Method:**
  `DELETE` 
*  **URL Params**
    None
* **Data Params**

  `token: String`
  `task_id:string`
* **Success Response:**
  
  * **Code:** 200 
    **Content:** `{n}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED 
    **Content:** `{ error : "please login first" }`

  OR
  
  * **Code:** 401 UNAUTHORIZED 
    **Content:** `{ error : "not authorized" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR 
    **Content:** `{ error : "server error" }`

* **Sample Call:**
    
    ```javascript
    $.ajax({
                method: 'DELETE',
                url: `${root}/task`,
                headers: {
                    'access-token': token
                },
                data: {
                    id:id
                }
            })
    ```

* **Notes:**
 
 
 

 
