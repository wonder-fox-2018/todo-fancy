$(document).ready(function() {
    let token = localStorage.getItem('token')
    console.log( "document loaded" );
    if(token===null || token === ''){
        $('#loginnavbar').show()
        $('#registernavbar').show()
        $('#logoutnavbar').hide()
        $('#sidebarnavcustom').hide()
        // $('#listtask').hide()
    }else{
        $('#loginnavbar').hide()
        $('#registernavbar').hide()
        $('#logoutnavbar').show()
        $('#sidebarnavcustom').show()
        // $('#listtask').show()
    }
});

// google login
function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    let id_token = googleUser.getAuthResponse().id_token;
    // console.log('GOOGLE Token---->', id_token)
    // console.log('Name: ' + profile.getName());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    // send google token to server
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3006/user/logingoogle',
        data: {
          googletoken: id_token    
        }
    })
    .done(user=>{
    //    console.log('hasil---->', user)
       let jwttoken = user.token
       localStorage.setItem('token', user.token)

       // automatically disconnect this app with google  
       const auth2 = gapi.auth2.getAuthInstance();
         auth2.signOut().then(function () {
         console.log('User signed out.');
       });
       
       $('#logoutnavbar').show()
       $('#loginnavbar').hide()
       $('#registernavbar').hide()
       $('#sidebarnavcustom').show()
        
       $.ajax({
          method: 'GET',
          url: 'http://localhost:3006/users/detail',
          headers:{
            token: jwttoken
          }  
       })
         .then(result=>{
            $('#navbarwelcome').empty()
            $('#navbarwelcome').append(
                `<div style= "color: white">
                    <h5>Welcome ${result.name}</h5>
                </div>`
            )
            $('#sidebarnavcustom').show()
            // both modals need to be closed since we only have one output 
            // for login and register via google
            $('#loginModal').modal('hide')
            $('#registerModal').modal('hide')
            
            // get list of data
            $.ajax({
                method: 'GET',
                url: 'http://localhost:3006/todolists/lists',
                headers: {
                token: localStorage.getItem('token')
                }
            })
              .done(result=>{
                //   console.log('Hasil---->', result.data)
                  let hasil = result.data
                  $('#listtask').empty()
                  $('#listtask').append(
                      `<h2>List section</h2>
                      <hr>`
                  )
                  hasil.forEach(todo => {
                      $('#listtask').append(
                      `<div class="card" style="width: 16rem;">
                          <div class="card-body">
                              <h5 class="card-title">${todo.title}</h5>
                              <p class="card-text">Status: ${todo.status}</p>
                              <button class="btn btn-warning" onclick="getformedittodo('${todo._id}')">Edit</button>
                              <button class="btn btn-danger" onclick="deletetodo('${todo._id}')">Delete</button>
                              <button class="btn btn-primary" onclick="getdetail('${todo._id}')">Detail</button>
                          </div>
                      </div><br/>
                      `)  
                  });
              })
              .fail(error=>{
                 console.log('ERROR Get list of todo via Google: ',error)
              })

         })
         .catch(error=>{
            console.log('ERROR get user detail via GOOGLE: ',error) 
         })
    })
    .fail(error=>{
      console.log('ERROR Get jwt Token via GOOGLE: ',error)
    })
}

// Login user
function loginuser(){
    let loginemail = $('#loginemail').val()
    let loginpassword = $('#loginpassword').val()

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3006/user/login',
        data: {
            email: loginemail,
            password: loginpassword
        }
    })
    .done(user =>{
        let jwttoken = user.token
        localStorage.setItem('token', user.token)
        $('#logoutnavbar').show()
        $('#loginnavbar').hide()
        $('#registernavbar').hide()
        $('#sidebarnavcustom').show()
        
        // get detail data of user
        $.ajax({
            method: 'GET',
            url: 'http://localhost:3006/users/detail',
            headers:{
                token: jwttoken
            }
        })
        .done(result=>{
            // console.log('hasil---->', result)
            $('#navbarwelcome').empty()
            $('#navbarwelcome').append(
                `<div style= "color: white">
                    <h5>Welcome ${result.name}</h5>
                </div>`
            )
            $('#sidebarnavcustom').show()
            $('#loginModal').modal('hide')
            
            // get list of data
            $.ajax({
                method: 'GET',
                url: 'http://localhost:3006/todolists/lists',
                headers: {
                token: localStorage.getItem('token')
                }
            })
            .done(result=>{
                // console.log('Hasil---->', result.data)
                let hasil = result.data
                $('#listtask').empty()
                $('#listtask').append(
                    `<h2>List section</h2>
                    <hr>`
                )
                hasil.forEach(todo => {
                    $('#listtask').append(
                    `<div class="card" style="width: 16rem;">
                        <div class="card-body">
                            <h5 class="card-title">${todo.title}</h5>
                            <p class="card-text">Status: ${todo.status}</p>
                            <button class="btn btn-warning" onclick="getformedittodo('${todo._id}')">Edit</button>
                            <button class="btn btn-danger" onclick="deletetodo('${todo._id}')">Delete</button>
                            <button class="btn btn-primary" onclick="getdetail('${todo._id}')">Detail</button>
                        </div>
                    </div><br/>
                    `)  
                });
            })
            .fail(error=>{
                console.log('ERROR Get list of todo ',error)
            })
        })
        .fail(error=>{
            console.log('ERROR Login JWT TOKEN: ',error)
        })
    })
    .fail(error =>{
        console.log('ERROR Login: ',error)
    })
}

// register user
function registeruser(){
    let registername = $('#registername').val()
    let registeremail = $('#registeremail').val()
    let registerpassword = $('#registerpassword').val()

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3006/user/register',
        data: {
            name: registername,
            email: registeremail,
            password: registerpassword
        }
    })
    .done(user =>{
        let jwttoken = user.token
        localStorage.setItem('token', user.token)
        $('#logoutnavbar').show()
        $('#loginnavbar').hide()
        $('#registernavbar').hide()
        $('#sidebarnavcustom').show()
        
        // get detail data of user
        $.ajax({
            method: 'GET',
            url: 'http://localhost:3006/users/detail',
            headers:{
                token: jwttoken
            }
        })
        .done(result=>{
            // console.log('hasil---->', result)
            $('#navbarwelcome').empty()
            $('#navbarwelcome').append(
                `<div style= "color: white">
                    <h5>Welcome ${result.name}</h5>
                </div>`
            )
            $('#registerModal').modal('hide')
            $('#sidebarnavcustom').show()

            // get list of data
            $.ajax({
                method: 'GET',
                url: 'http://localhost:3006/todolists/lists',
                headers: {
                token: localStorage.getItem('token')
                }
            })
            .done(result=>{
                // console.log('Hasil---->', result.data)
                let hasil = result.data
                $('#listtask').empty()
                $('#listtask').append(
                    `<h2>List section</h2>
                    <hr>`
                )
                hasil.forEach(todo => {
                    $('#listtask').append(
                    `<div class="card" style="width: 16rem;">
                        <div class="card-body">
                            <h5 class="card-title">${todo.title}</h5>
                            <p class="card-text">Status: ${todo.status}</p>
                            <button class="btn btn-warning" onclick="getformedittodo('${todo._id}')">Edit</button>
                            <button class="btn btn-danger" onclick="deletetodo('${todo._id}')">Delete</button>
                            <button class="btn btn-primary" onclick="getdetail('${todo._id}')">Detail</button>
                        </div>
                    </div>`)  
                });
            })
            .fail(error => {
                console.log('ERROR Get lists of todo: ',error)    
            })
        })
        .fail(error=>{
            console.log('ERROR Register JWT TOKEN: ',error)
        })
    })
    .fail(error =>{
        console.log('ERROR Register: ',error)
    })
}

// get detail of Todo
function getdetail(detailid){
    let token = localStorage.getItem('token')
    // console.log('Token Detail----->',token),
    // console.log('Edit id---->', editid)
    $.ajax({
        method: 'GET',
        url: `http://localhost:3006/todolists/${detailid}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(result =>{
        // console.log('Detail of TODO--->', result.data)
        let singletodo = result.data
        let rawdate = new Date(result.data.duedate)
        $('#individualtodo').empty()
        $('#individualtodo').append(
            `
            <h3>Detail section</h3>
            <hr>
            <div class="card" style="width: 30rem;">
                <div class="card-body">
                    <h5 class="card-title">${singletodo.title}</h5>
                    <p class="card-text">Status: ${singletodo.status}</p>
                    <p class="card-text">Due date: ${rawdate.getFullYear()} - ${rawdate.getMonth()+1} - ${rawdate.getDate()}</p>
                    <hr>
                    <p class="card-text">Description: ${singletodo.description}</p>
                </div>
            </div><br/>`
        )
    })
    .fail(error =>{
        console.log('ERROR Get Detail: ',error)
    })
}

// create new todo
function createtodo(){
    let inputtitle = $('#createtodotitle').val()
    let inputdescription = $('#createtododescription').val()
    let inputduedate = $('#createtododuedate').val()
    let token = localStorage.getItem('token')

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3006/todolists/',
        headers: {
            token: token
        },
        data: {
            title: inputtitle,
            description: inputdescription,
            duedate: inputduedate
        }
    })
      .done(result=>{
        //   console.log('Create success-->', result)

          // let update the lists
          $.ajax({
                method: 'GET',
                url: 'http://localhost:3006/todolists/lists',
                headers: {
                token: token
                }
            })
            .done(result=>{
                // console.log('Hasil---->', result.data)
                let hasil = result.data
                $('#listtask').empty()
                $('#listtask').append(
                    `<h2>List section</h2>
                    <hr>`
                )
                hasil.forEach(todo => {
                    $('#listtask').append(
                    `<div class="card" style="width: 16rem;">
                        <div class="card-body">
                            <h5 class="card-title">${todo.title}</h5>
                            <p class="card-text">Status: ${todo.status}</p>
                            <button class="btn btn-warning" onclick="getformedittodo('${todo._id}')">Edit</button>
                            <button class="btn btn-danger" onclick="deletetodo('${todo._id}')">Delete</button>
                            <button class="btn btn-primary" onclick="getdetail('${todo._id}')">Detail</button>
                        </div>
                    </div><br/>
                    `)  
                });
                $('#createtodoModal').modal('hide')
            })
            .fail(error=>{
                console.log('ERROR Get list of todo ',error)
            })
      })
      .fail(error =>{
        console.log('ERROR Create Todo: ',error)
      })
}

// edit individual todo
function edittodo(editid){
    let token = localStorage.getItem('token')
    let edittitle = $('#edittodotitle').val()
    let editdescription = $('#edittododescription').val()
    let editstatus = $('#edittodostatus').val()
    let editduedate = $('#edittododuedate').val()
    
    $.ajax({
        method: 'PUT',
        url: `http://localhost:3006/todolists/${editid}`,
        headers: {
          token: token
        },
        data: {
          title: edittitle,
          description: editdescription,
          status: editstatus,
          duedate: editduedate    
        }
    })
      .done(result=>{
          // let's update the list
          $.ajax({
                method: 'GET',
                url: 'http://localhost:3006/todolists/lists',
                headers: {
                token: token
                }
            })
            .done(result=>{
                let hasil = result.data
                $('#listtask').empty()
                $('#listtask').append(
                    `<h2>List section</h2>
                    <hr>`
                )
                hasil.forEach(todo => {
                    $('#listtask').append(
                    `<div class="card" style="width: 16rem;">
                        <div class="card-body">
                            <h5 class="card-title">${todo.title}</h5>
                            <p class="card-text">Status: ${todo.status}</p>
                            <button class="btn btn-warning" onclick="getformedittodo('${todo._id}')" >Edit</button>
                            <button class="btn btn-danger" onclick="deletetodo('${todo._id}')">Delete</button>
                            <button class="btn btn-primary" onclick="getdetail('${todo._id}')">Detail</button>
                        </div>
                    </div><br/>
                    `)  
                });
                // let get the todo display
                getdetail(editid)
                // $('#individualtodo').empty()
            })
            .fail(error=>{
                console.log('ERROR Get list of todo ',error)
            })
      })
      .fail(error =>{
        console.log('ERROR Edit Todo: ',error)  
      }) 
}

// form edit individual todo
function getformedittodo(editid){
    $('#individualtodo').empty()
    let token = localStorage.getItem('token')
    // console.log('Token Detail----->',token),
    // console.log('Edit id---->', editid)
    $.ajax({
        method: 'GET',
        url: `http://localhost:3006/todolists/${editid}`,
        headers: {
            token: token
        }
    })
    .done(result =>{
        // console.log('Detail of TODO--->', result.data)
        let singletodo = result.data
        let rawdate = new Date(result.data.duedate)
        $('#individualtodo').empty()
        $('#individualtodo').append(
            `
            <h3>Detail section</h3>
            <hr>
            <div class="card" style="width: 30rem;">
                <div class="card-body">
                        <form>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Title</label>
                                <input type="text" class="form-control" id="edittodotitle" value = "${singletodo.title}" aria-describedby="emailHelp">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Description</label>
                                <input type="text" class="form-control" id="edittododescription" value = "${singletodo.description}" aria-describedby="emailHelp">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Status</label>
                                <input type="text" class="form-control" id="edittodostatus" value="${singletodo.status}" aria-describedby="emailHelp">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Due Date</label>
                                <input type="text" class="form-control" id="edittododuedate" value="${rawdate.getFullYear()}-${rawdate.getMonth()+1}-${rawdate.getDate()}" aria-describedby="emailHelp">
                            </div>
                            <button type="button" class="btn btn-warning" onclick="edittodo('${singletodo._id}')">SAVE</button>
                        </form>
                </div>
            </div><br/>`
        )
    })
    .fail(error =>{
        console.log('ERROR Get Detail: ',error)
    })
}

// delete individual todo
function deletetodo(deleteid){
    let token = localStorage.getItem('token')
    $('#individualtodo').empty()
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3006/todolists/${deleteid}`,
        headers: {
            token: token
        }
    })
      .done(result => {
        //   console.log('DELETE SUCCESS--->', result)
          // let update the lists
          $.ajax({
                method: 'GET',
                url: 'http://localhost:3006/todolists/lists',
                headers: {
                token: token
                }
            })
            .done(result=>{
                // console.log('Hasil---->', result.data)
                let hasil = result.data
                $('#listtask').empty()
                $('#listtask').append(
                    `<h2>List section</h2>
                    <hr>`
                )
                hasil.forEach(todo => {
                    $('#listtask').append(
                    `<div class="card" style="width: 16rem;">
                        <div class="card-body">
                            <h5 class="card-title">${todo.title}</h5>
                            <p class="card-text">Status: ${todo.status}</p>
                            <button class="btn btn-warning">Edit</button>
                            <button class="btn btn-danger" onclick="deletetodo('${todo._id}')">Delete</button>
                            <button class="btn btn-primary" onclick="getdetail('${todo._id}')">Detail</button>
                        </div>
                    </div><br/>
                    `)  
                });
                $('#createtodoModal').modal('hide')
            })
            .fail(error=>{
                console.log('ERROR Get list of todo ',error)
            })
      })
      .fail(error =>{
        console.log('ERROR Delete todo ',error)
      })
}

// logout
function logoutuser(){
    localStorage.removeItem('token')
    $('#logoutnavbar').hide()
    $('#loginnavbar').show()
    $('#registernavbar').show()
    $('#navbarwelcome').empty()
    $('#listtask').empty()
    $('#individualtodo').empty()
    $('#sidebarnavcustom').hide()
}