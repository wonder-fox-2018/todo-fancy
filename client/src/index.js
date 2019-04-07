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

function globalproductivitydisplay(complete, incomplete){
    let globalcomplete = Number(complete)
    let globalincomplete = Number(incomplete)
    let productivityPercent = (globalcomplete*100 /(globalcomplete + globalincomplete)).toFixed(1)
    $('#globalproductivity').empty()
    $('#globalproductivity').append(
        `<h3>Productivity Fact: </h3><hr>
        <h5>Hey do you know that people only finish </h5> 
        <h2><b style= "color: red">${productivityPercent} % </b></h2> <h5>of their task</h5>
        <br>
        <h5>How about you?</h5>
        <h5>Have you been productive?</h5>
        `
    )
}

// google login
function onSignIn(googleUser) {
    // let profile = googleUser.getBasicProfile();
    let id_token = googleUser.getAuthResponse().id_token;
    // console.log('GOOGLE Token---->', id_token)
    // console.log('Name: ' + profile.getName());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    // send google token to server
    $.ajax({
        method: 'POST',
        url: 'https://apitodo.efratsadeli.online/user/logingoogle',
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
          url: 'https://apitodo.efratsadeli.online/users/detail',
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
                url: 'https://apitodo.efratsadeli.online/todolists/lists',
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
                  // calculate global productivity
                globalproductivitydisplay(result.globalcomplete, result.globalincomplete)
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
        url: 'https://apitodo.efratsadeli.online/user/login',
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
            url: 'https://apitodo.efratsadeli.online/users/detail',
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
                url: 'https://apitodo.efratsadeli.online/todolists/lists',
                headers: {
                token: localStorage.getItem('token')
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
                            <button class="btn btn-warning" onclick="getformedittodo('${todo._id}')">Edit</button>
                            <button class="btn btn-danger" onclick="deletetodo('${todo._id}')">Delete</button>
                            <button class="btn btn-primary" onclick="getdetail('${todo._id}')">Detail</button>
                        </div>
                    </div><br/>
                    `)  
                });
                // calculate global productivity
                globalproductivitydisplay(result.globalcomplete, result.globalincomplete)
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
        let parsedError = error.responseJSON.msg
        $('#errorlogin').empty()
        $('#errorlogin').append(
            `<button type="button" class="btn btn-danger">
                ${parsedError}</button><br><br>
            `
        )
        setTimeout(()=>{ $('#errorlogin').empty() }, 3000)
    })
}

// register user
function registeruser(){
    let registername = $('#registername').val()
    let registeremail = $('#registeremail').val()
    let registerpassword = $('#registerpassword').val()

    $.ajax({
        method: 'POST',
        url: 'https://apitodo.efratsadeli.online/user/register',
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
            url: 'https://apitodo.efratsadeli.online/users/detail',
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
                url: 'https://apitodo.efratsadeli.online/todolists/lists',
                headers: {
                token: localStorage.getItem('token')
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
                            <button class="btn btn-warning" onclick="getformedittodo('${todo._id}')">Edit</button>
                            <button class="btn btn-danger" onclick="deletetodo('${todo._id}')">Delete</button>
                            <button class="btn btn-primary" onclick="getdetail('${todo._id}')">Detail</button>
                        </div>
                    </div>`)  
                });
                // calculate global productivity
                globalproductivitydisplay(result.globalcomplete, result.globalincomplete)
                
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
        let parsedError = error.responseJSON
        let errorMsg = ''
        if(parsedError.hasOwnProperty('error')){
            errorMsg = parsedError.error.errors.email.message 
        }else{
            errorMsg = parsedError.msg
        }
        $('#errorregister').empty()
        $('#errorregister').append(
            ` <button type="button" class="btn btn-danger">
                ${errorMsg}</button> 
             <br> <br>   `
        )
        setTimeout( function (){ 
            $('#errorregister').empty() 
        }, 3000)
    })
}

// get detail of Todo
function getdetail(detailid){
    let token = localStorage.getItem('token')
    // console.log('Token Detail----->',token),
    // console.log('Edit id---->', editid)
    $.ajax({
        method: 'GET',
        url: `https://apitodo.efratsadeli.online/todolists/${detailid}`,
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
        url: 'https://apitodo.efratsadeli.online/todolists/',
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
                url: 'https://apitodo.efratsadeli.online/todolists/lists',
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
                // calculate global productivity
                globalproductivitydisplay(result.globalcomplete, result.globalincomplete)
                
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
    let editstatus = $("input[name='edittodostatus']:checked").val()
    let editduedate = $('#edittododuedate').val()

    $.ajax({
        method: 'PUT',
        url: `https://apitodo.efratsadeli.online/todolists/${editid}`,
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
                url: 'https://apitodo.efratsadeli.online/todolists/lists',
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
                // calculate global productivity
                globalproductivitydisplay(result.globalcomplete, result.globalincomplete)
                getdetail(editid)
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
    $.ajax({
        method: 'GET',
        url: `https://apitodo.efratsadeli.online/todolists/${editid}`,
        headers: {
            token: token
        }
    })
    .done(result =>{
        // console.log('Detail of TODO--->', result.data)
        let singletodo = result.data
        let rawdate = new Date(result.data.duedate)
        // check which radio button to display
        let completecheck = ''
        let incompletecheck = ''
        if(singletodo.status === 'COMPLETE'){
            completecheck = 'checked'
            incompletecheck = ''
        }else if(singletodo.status === 'INCOMPLETE'){
            completecheck = ''
            incompletecheck = 'checked'
        }

        $('#individualtodo').empty()
        $('#individualtodo').append(
            `
            <h3>Edit section</h3>
            <hr>
            <div class="card" style="width: 30rem;">
                <div class="card-body">
                        <form>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Title</label>
                                <input type="text" class="form-control" id="edittodotitle" value = "${singletodo.title}" aria-describedby="emailHelp" placeholder="Enter title">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Description</label>
                                <input type="text" class="form-control" id="edittododescription" value = "${singletodo.description}" aria-describedby="emailHelp" placeholder="Enter description">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Status</label><br/>
                                <input type="radio" name="edittodostatus" value="INCOMPLETE" ${incompletecheck}> INCOMPLETE<br>
                                <input type="radio" name="edittodostatus" value="COMPLETE" ${completecheck}> COMPLETE<br>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Due Date</label>
                                <input type="date" class="form-control" id="edittododuedate" value="${rawdate.getFullYear()}-${rawdate.getMonth()+1}-${rawdate.getDate()}" aria-describedby="emailHelp">
                            </div>
                            <button type="button" class="btn btn-warning" onclick="edittodo('${singletodo._id}')">Update</button>
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
        url: `https://apitodo.efratsadeli.online/todolists/${deleteid}`,
        headers: {
            token: token
        }
    })
      .done(result => {
        //   console.log('DELETE SUCCESS--->', result)
          // let update the lists
          $.ajax({
                method: 'GET',
                url: 'https://apitodo.efratsadeli.online/todolists/lists',
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
                // calculate global productivity
                globalproductivitydisplay(result.globalcomplete, result.globalincomplete)
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
    $('#globalproductivity').empty()
    $('#sidebarnavcustom').hide()
}