# MYAPP - TODOKU

## CARA MENGGUNAKAN APLIKASI

```
Lakukan npm install pada folder server.
Jalankan perintah "npm start" pada terminal *(buka terminal pada folder server).
Jalankan perintah npm run serve pada terminal *(buka terminal pada folder client).
Jalankan mongod pada terminal, atau bisa menggunakan database MLAB, Keteranangan ada pada file .env
```

## SERVER SIDE 

### USER

|           Route           |  HTTP  |                         Description                        |
|---------------------------|--------|------------------------------------------------------------|
| /users/signup             | POST   | Registrasi user                                            |
| /users/signin             | POST   | Login user manul                                           |
| /users/signinGoogle       | POST   | Login user melalui google                                  |

### TODO

|           Route           |  HTTP  |                         Description                        |
|---------------------------|--------|------------------------------------------------------------|
| /todos/findTask           | GET    | Menampilkan daftar task                                    |
| /todos/create             | POST   | Membuat task baru                                          |
| /todos/update             | PUT    | Update task                                                |
| /todos/delete             | DELETE | Delete task                                                |
| /todos/complete           | PUT    | Merubah status task menjadi complete                       |
| /todos/ubcomplete         | PUT    | Merubah status task menjadi uncomplete                     |


```
untuk melakukan test dari postman
ketika update, delete, complete, uncomplete
harus memasukan token user pada headers
dan end pointnya seperti berikut sebagai contoh :
http://localhost:3000/todos/update?todosId=${id}
```