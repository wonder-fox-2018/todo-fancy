# ToDo Fancy
Hacktiv8 Portfolio Project

# API Documentation
List of Routes:   

Route                        | HTTP   | Description                                  | Input
-----------------------------|--------|----------------------------------------------|--------
/user/glogin                 | GET    | Sign in / sign up with Google                | headers: id_token (from Google)
/user/rlogin                 | POST   | Reguler sign in                              | body: email, password
/user/register               | POST   | Reguler sign up                              | body: name, email, password
/list                        | GET    | List all todos                               | headers: token (auth)
/list/importance/:dir/:state | GET    | List all todos and sort it by its importance | headers: token (auth), query: dir ('asc' => ascending / 'desc' => descending), :state ('a' => all / 't' => today)
/list/:sort/:dir/:state      | GET    | List all todos and sort it by it's :sort     | headers: token (auth), query: sort ('name' / 'dueDate')
/list/today                  | GET    | List all todos for today                     | headers: token (auth)
/list                        | POST   | Add a new todo                               | headers: token (auth), body: name, desc (description), dueDate, importance ('Unimportant' / 'Important' / 'Very Important')
/list/:id                    | PUT    | Edit a todo with :id                         | headers: token (auth), query: id (the todo's _id), body: name, desc (description), dueDate, importance
/list/complete/:id           | PATCH  | Edit a todo's status into 'completed'        | headers: token (auth), query: id (the todo's _id)
/list/:id                    | DELETE | Delete a todo with :id                       | headers: token (auth), query: id (the todo's _id)

# Usage
With npm:
```  
npm install
npm start (node) / npm run dev (nodemon)
```
##### Access ToDo Fancy via http://localhost:3000