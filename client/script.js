$(document).ready(function(){
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/users/ceklogin',
        headers: { token: localStorage.getItem('token') }
    })
    .done(data => {
        if (data.isLogin) {
           showLogin()
        } else {
           noLogin()
        }
    })
})

$('#login').click(function(){
    login()
})
$('#addTask').click(function(){
    addTask()
})

function showLogin(){
    showTask()
    $('#first').hide()
    $('#second').show()
}
function noLogin(){
    $('#second').hide()
    $('#first').show()
}

function login(){    
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/users/login',
      data: {
        email: $('#inputEmail').val(),
        password: $('#inputPassword').val()
      }
    })
    .done(function(data){
        localStorage.setItem('token', data.token)
        showLogin()
        showTask()

    })
    .fail(function(err){
        console.log(err);
    })
}

function register(){
$.ajax({
    method: 'POST',
    url: 'http://localhost:3000/users/create',
    data: {
    name: $('#regName').val(),
    email: $('#regEmail').val(),
    password: $('#regPassword').val()
    }
    })
    .done(function(data){
        console.log('register sukses');
        //tampil register sukses
    })
    .fail(function(err){
        console.log(err);
    })
}

function addTask(){
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/todos/addTask',
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            name: $('#addTaskName').val(),
            description: $('#addTaskDesc').val(),
            dueDate: $('#addTaskDue').val()
        }
    })
    .done(function(data){
        console.log(data);
        
    })
    .fail(function(err){
        console.log(err);
    })
}

function showTask(){
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/todos/showTask',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(data){
        console.log(data.data);
        for(let i = 0; i < data.data.length; i++){
            $('#showAllTask').append(`
            <tr>
            <td>${i+1}.</td>
            <td>${data.data[i].name}</td>
            <td>${data.data[i].description}</td>
            <td>${data.data[i].dueDate}</td>
            <td>${data.data[i].status}</td>
            <td>
              <button type="button" class="btn btn-primary" onclick="finishTask(${data.data[i]._id})" >Finish!!</button>
              <button type="button" class="btn btn-primary" onclick="updateTask(${data.data[i]._id})" >Edit</button>
              <button type="button" class="btn btn-primary" onclick="deleteTask(${data.data[i]._id})" >Delete</button>
            </td>
          </tr>
            `)
        }         
    })
    .fail(function(err){
        console.log(err);
    })
}

function finishTask(id){
    console.log('masuk');
    
    $.ajax({
        method: 'PUT',
        url: `http://localhost:3000/todos/finishTask/${id}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(data){
        console.log(data);
    })
    .fail(function(err){
        console.log(err);
    })
}

function deleteTask(id){
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(data){
        console.log(data)
    })
    .fail(function(err){
        console.log(err);
    })
}

function updateTask(id){
    $.ajax({
        method: 'PUT',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            name: $('#editTaskName').val(),
            description: $('#editTaskDesc').val(),
            dueDate: $('#editTaskDue').val()
        }
    })
    .done(function(data){
        console.log(data);
    })
    .fail(function(err){
        console.log(err);
    })
}