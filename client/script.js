$(document).ready(function () {
    loadTodo()
    readyFn()
});

function readyFn(){
    hideButton()
}


function hideButton(){
   let token = localStorage.getItem('token')
    if(token){
        $('#buttonSignOutLogin').empty()
        $('#buttonSignOutLogin').append(`
            <button type="button" id="buttonSignOut" class="btn btn-primary" onclick="signOut()">Sign Out</button>
        `)
    }
    else{
        $('#buttonSignOutLogin').empty()
        $('#buttonSignOutLogin').append(`
        <button type="button" id="buttonLogin" class="btn btn-primary" data-toggle="modal" data-target="#modalLogin">
                    Login
        </button>
        `)
    }
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method : 'POST',
        url : `http://localhost:3000/signin/google`,
        data : {
            googleToken : id_token
        }
    })
    .done(data => {
        // console.log(id_token)
        localStorage.setItem('token', data.token)
        loadTodo()
        readyFn()
    })
    .fail(err => {
        console.log(err)
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    console.log('User signed out.');
    localStorage.removeItem('token')
    readyFn()
    loadTodo()
    });
    // console.log('user signed out')
    // localStorage.removeItem('token')
    // loadTodo()
}

function signin(){
    $.ajax({
        method : 'POST',
        url : `http://localhost:3000/signin`,
        data : {
            email : $('#loginEmail').val(),
            password : document.getElementById('loginPassword').value
        }
    })
    .done(response => {
        if(response.token){
            localStorage.setItem('token', response.token)
            loadTodo()
            readyFn()
        }
    })
    .fail(err => {
        console.log(err)
    })
}

function signup(){
    $.ajax({
        method : 'POST',
        url : `http://localhost:3000/signup`,
        data : {
            email : $('#registerEmail').val(),
            password : document.getElementById('registerPassword').value,
            name : $('#registerName').val()
        }
    })
    .done(response => {
        
    })
    .fail(err => {
        console.log(err)
        $('#isiWeb').empty()
        $('#isiWeb').append(`
            <div class="alert alert-danger" role="alert" id="emailtaken">
                  Email already used, try another email      
            </div>
        `)
    })
   
}

function loadTodo(){
    // console.log(localStorage.getItem('token'))
    $.ajax({
        method : 'GET',
        url : `http://localhost:3000/users/showall`,
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(response => {
        console.log(response.todo)
        $('#isiWeb').empty()
        response.todo.forEach(list => {
            let finish = ""
            if(list.isFinish === true){
                finish = "alert alert-success"
            }
            else{
                finish = "alert alert-danger"
            }
            $('#isiWeb').append(`
                 <div class="${finish}" role="alert" align="center" onclick="getInfo('${list._id}')" data-toggle="modal" data-target="#detailTodo">
                     ${list.title}
                </div> 
            `)
        })
    })
    .fail(err => {
        console.log(err)
        $('#isiWeb').empty()
        $('#isiWeb').append(`
            <div class="alert alert-danger" role="alert" id="emailtaken">
                  Pleace Login First    
            </div>
        `)
    })
}

function addTodo(){
    $.ajax({
        method : 'POST',
        url : `http://localhost:3000/todos/add`,
        headers : {
            token : localStorage.getItem('token')
        },
        data : {
            title : $('#todoTitle').val(),
            description : $('#todoDescription').val(),
            dueDate : $('#datepicker').val()
        }
    })
    .done(response => {
        loadTodo()
        // console.log(response)
    })
    .fail(err => {
        console.log(err)
       
    })
}

function getInfo(id){
    $.ajax({
        method : 'GET',
        url : `http://localhost:3000/todos/showOne/${id}`,
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(response => {
        // console.log(response)
        let date = response.todo.dueDate
        let newDate =""
        for(let i = 0; i < date.length; i++){
            if(date[i] !== "T"){
                newDate += date[i]
            }
            else{
                break;
            }
        }
        let value = 'Finish'
        if(response.todo.isFinish === true){
            value = 'Finish'
        }
        else{
            value = 'Not Yet'
        }
        // console.log(newDate)
        $('#updateTodo').empty()
        $('#updateTodo').append(`
        <form class="seminor-login-form">
        <div class="form-group">
            <input type="name" id="detailTitle" class="form-control" value="${response.todo.title}" required autocomplete="off">
            <label class="form-control-placeholder" for="name">Title</label>
        </div>
        <div class="form-group">
            <input type="name" id="detailDescription" class="form-control" value="${response.todo.description}"  required autocomplete="off">
            <label class="form-control-placeholder" for="name">Description</label>
        </div>
        <div class="form-group">
            Due date : 
                <input type="date" " id="detailDate" width="276" value="${newDate}"/>
        </div>    
        <div class="form-group">
        <label for="exampleFormControlSelect1">isFinish : ${value}</label>
        <div class="btn-check-log">
            <button type="submit" class="btn-check-login" onclick="updateTodo('${response.todo._id}')" data-dismiss="modal">Update</button>
        </div>
        <div class="btn-check-log">
            <button type="submit" class="btn-check-login" onclick="finishTodo('${response.todo._id}')" data-dismiss="modal"> mark as Finish</button>
        </div>
        <div class="btn-check-log">
             <button type="submit" class="btn-check-login" onclick="unfinishTodo('${response.todo._id}')" data-dismiss="modal">mark as unFinish</button>
        </div>
        <div class="btn-check-log">
             <button type="submit" class="btn-check-login" onclick="deleteTodo('${response.todo._id}')" data-dismiss="modal">delete</button>
        </div>
    </form>
        `)
    })
    .fail(err => {
        console.log(err)
       
    })
}

function updateTodo(id){
    $.ajax({
        method : 'PUT',
        url : `http://localhost:3000/todos/update/${id}`,
        headers : {
            token : localStorage.getItem('token')
        },
        data : {
            title : $('#detailTitle').val(),
            description : $('#detailDescription').val(),
            dueDate : $('#detailDate').val()
        }
    })
    .done(response => {
        loadTodo()
    })
    .fail(err => {
        console.log(err)
    })
}

function finishTodo(id){
    $.ajax({
        method : 'PATCH',
        url : `http://localhost:3000/todos/setFinish/${id}`,
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(response => {
        loadTodo()
    })
    .fail(err => {
        console.log(err)
    })
}

function unfinishTodo(id){
    $.ajax({
        method : 'PATCH',
        url : `http://localhost:3000/todos/setNotFinishYet/${id}`,
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(response => {
        loadTodo()
    })
    .fail(err => {
        console.log(err)
    })
}

function deleteTodo(id){
    $.ajax({
        method : 'DELETE',
        url : `http://localhost:3000/todos/delete/${id}`,
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(response => {
        loadTodo()
    })
    .fail(err => {
        console.log(err)
    })
}


