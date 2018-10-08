### todos

TODOS
=====


POST signup
-----------

http://localhost:3000/users/signup

#### Headers

#### Body
```
{
    "email" : "halo@gmail.com",
    "password" : "1234",
    "name" : "fransiskus arnoldy"

}
```

GET allusers
------------

http://localhost:3000/users/all

#### Headers
```
token

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYjg5ZWEwM2MyZjMxM2RmNjVhNTE5NyIsImVtYWlsIjoiaGFsb0BnbWFpbC5jb20iLCJuYW1lIjoiZnJhbnNpc2t1cyBhcm5vbGR5IiwiaWF0IjoxNTM4ODQwODQ4fQ.x87xTVmdlChvcP2cWgsrZQ8LkGA51ea8DrP7FRRSTLA
```
GET Show All Todos
------------------

http://localhost:3000/users/all

#### Headers
```
token

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYjg5ZWEwM2MyZjMxM2RmNjVhNTE5NyIsImVtYWlsIjoiaGFsb0BnbWFpbC5jb20iLCJuYW1lIjoiZnJhbnNpc2t1cyBhcm5vbGR5IiwiaWF0IjoxNTM4ODQwODQ4fQ.x87xTVmdlChvcP2cWgsrZQ8LkGA51ea8DrP7FRRSTLA
```

POST signin
-----------

http://localhost:3000/signin

#### Headers

#### Body
```
{
    "email" : "frans@gmail.com",
    "password" : "1234"
}
```
GET viewProfile
---------------

http://localhost:3000/users/profile
#### Headers
```
token

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYjg5ZWEwM2MyZjMxM2RmNjVhNTE5NyIsImVtYWlsIjoiaGFsb0BnbWFpbC5jb20iLCJuYW1lIjoiZnJhbnNpc2t1cyBhcm5vbGR5IiwiaWF0IjoxNTM4ODQwODQ4fQ.x87xTVmdlChvcP2cWgsrZQ8LkGA51ea8DrP7FRRSTLA
```


PUT editProfile
---------------

http://localhost:3000/users/edit

#### Headers
```
token

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYjg5ZWEwM2MyZjMxM2RmNjVhNTE5NyIsImVtYWlsIjoiaGFsb0BnbWFpbC5jb20iLCJuYW1lIjoiZnJhbnNpc2t1cyBhcm5vbGR5IiwiaWF0IjoxNTM4ODQwODQ4fQ.x87xTVmdlChvcP2cWgsrZQ8LkGA51ea8DrP7FRRSTLA
```
#### Body
```
{
    "email" : "frans@gmail.com",
    "name" : "frans arnold",
    "password" : "1234"
}
```
DELETE deleteUser
-----------------

http://localhost:3000/users/delete
#### Headers
```
token

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYjhlY2YyOTdhNTFkNzZkZDUwNGY4NCIsImVtYWlsIjoiaGFsb0BnbWFpbC5jb20iLCJuYW1lIjoiZnJhbnNoaXJvIiwiaXNHb29nbGUiOmZhbHNlLCJpYXQiOjE1Mzg4NTM2ODV9.OzRkzV4UJ8RNIxEzo4BEvJ5os0QMe42xPpqClhTaFFM
```

POST addTodo
------------

http://localhost:3000/todos/add

#### Headers
```
token

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYjhlY2YyOTdhNTFkNzZkZDUwNGY4NCIsImVtYWlsIjoiaGFsb0BnbWFpbC5jb20iLCJuYW1lIjoiZnJhbnNoaXJvIiwiaXNHb29nbGUiOmZhbHNlLCJpYXQiOjE1Mzg4NTM2ODV9.OzRkzV4UJ8RNIxEzo4BEvJ5os0QMe42xPpqClhTaFFM
```
#### Body
```
    {
    	"title" : "venom",
    	"description" : "nonton bareng film venom di gandaria city",
    	"dueDate" : "10-19-2018"
    }
```

PUT updateTodo
--------------

http://localhost:3000/todos/update/5bb90bb23de07a0b69b085e0

#### Headers
```
token

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYjhlY2YyOTdhNTFkNzZkZDUwNGY4NCIsImVtYWlsIjoiaGFsb0BnbWFpbC5jb20iLCJuYW1lIjoiZnJhbnNoaXJvIiwiaXNHb29nbGUiOmZhbHNlLCJpYXQiOjE1Mzg4NTM2ODV9.OzRkzV4UJ8RNIxEzo4BEvJ5os0QMe42xPpqClhTaFFM
```
#### Body
```
{
    "title" : "makan siang",
    "description" : "makan siang bareng teman2 hacktiv",
    "dueDate" : "10-10-2018"
}
```
PATCH set Finish
----------------

http://localhost:3000/todos/setFinish/5bb90c3d3de07a0b69b085e1

#### Headers
```
token

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYjhlY2YyOTdhNTFkNzZkZDUwNGY4NCIsImVtYWlsIjoiaGFsb0BnbWFpbC5jb20iLCJuYW1lIjoiZnJhbnNoaXJvIiwiaXNHb29nbGUiOmZhbHNlLCJpYXQiOjE1Mzg4NTM2ODV9.OzRkzV4UJ8RNIxEzo4BEvJ5os0QMe42xPpqClhTaFFM
```

PATCH set not Finish
--------------------

http://localhost:3000/todos/setNotFinishYet/5bb90c3d3de07a0b69b085e1

#### Headers
```
token

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYjhlY2YyOTdhNTFkNzZkZDUwNGY4NCIsImVtYWlsIjoiaGFsb0BnbWFpbC5jb20iLCJuYW1lIjoiZnJhbnNoaXJvIiwiaXNHb29nbGUiOmZhbHNlLCJpYXQiOjE1Mzg4NTM2ODV9.OzRkzV4UJ8RNIxEzo4BEvJ5os0QMe42xPpqClhTaFFM
```
DELETE deleteTodo
-----------------

http://localhost:3000/todos/update/5bb90bb23de07a0b69b085e0

#### Headers
```
token

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYjhlY2YyOTdhNTFkNzZkZDUwNGY4NCIsImVtYWlsIjoiaGFsb0BnbWFpbC5jb20iLCJuYW1lIjoiZnJhbnNoaXJvIiwiaXNHb29nbGUiOmZhbHNlLCJpYXQiOjE1Mzg4NTM2ODV9.OzRkzV4UJ8RNIxEzo4BEvJ5os0QMe42xPpqClhTaFFM
```

GET showTodo
------------

http://localhost:3000/todos/show

#### Headers
```
token

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYjhlY2YyOTdhNTFkNzZkZDUwNGY4NCIsImVtYWlsIjoiaGFsb0BnbWFpbC5jb20iLCJuYW1lIjoiZnJhbnNoaXJvIiwiaXNHb29nbGUiOmZhbHNlLCJpYXQiOjE1Mzg4NTM2ODV9.OzRkzV4UJ8RNIxEzo4BEvJ5os0QMe42xPpqClhTaFFM
```