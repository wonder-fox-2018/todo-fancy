// modal
var dialog = new jBox('Modal',{
    maxWidth : 400,
    minWidth: 300,
    minHeight: 50,
    autoClose:3000,
})

//search
$(document).ready(function(){
    $("#search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".postCard").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

//add task button
$('.addTask').click(function (e) { 
    $('.categories').hide()
    $(this).hide()
    $('#newTaskForm').show();
});

//pageload user check
$(document).ready(function () {
    let user = localStorage.getItem('token')

    if(!user){
        $('.linkBar').hide();
        $('.addTask').hide();
        $('main').hide();

        $('#loginBtn').click(function (e) { 

            $.ajax({
                type: "post",
                url: "http://localhost:3000/api/users/login",
                data: {
                    email : $('#loginEmail').val(),
                    password : $('#loginPassword').val(),
                },
            })
            .done(result=>{
                dialog.setContent(result.message).open()
                $('#loginForm').hide();
                $("#content").show()
                localStorage.setItem('token',result.token)
                setTimeout(() => {
                    window.location.href = "http://localhost:8080/"
                    
                }, 1000);

            })
            .fail(err=>{
                dialog.setContent(err.responseJSON.message).open()
            })
            
        });

    } else {

        $('#loginForm').hide();
        $('#registerForm').hide();

        $.ajax({
            type: "get",
            url: "http://localhost:3000/api/users",
            data : {
                token : localStorage.getItem('token')
            },
            headers: {token: localStorage.getItem('token')},
        })
        .done(data=>{
            $.each(data.data.userTodos, function (i, val) {
                $('.task').append(`
                    <div class='postCard' onclick="getTaskDetail('${val.title}','${val.created_at}','${val.deadline}','${val.notes}','${val.priority}','${val._id}')">
                    <h1>${val.title}</h1>
                    </div>
                `)
            });
            $('.userlink').append(`<i>${data.data.name}</i>`)
            $('.userlink').click(function (e) { 
                showUser(data.data)
            })
        })
        .fail((err)=>{
            dialog.setContent(err.message).open()
        })  
    }
});

function showUser(data){
     
    new jBox('Modal',{
        minWidth: 300,
        minHeight: 400,
        content : `
            <div class='userDetail'>
                <h1>${data.name}</h1>
                <p>email : ${data.email}</p>
                <p>member since : ${data.created_at}</p>
                <input type="button" id="deleteTask" onclick="deleteUser('${data._id}')" value="delete">
                <input type="button" id="editTask" onclick="editUser('${data._id}','${data.name}','${data.email}')" value="edit">
            </div>
        `
    }).open()
        

}


//reqister
$(document).ready(function () {
    $('#registerBtn').click(function () { 
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/api/users/signup",
            data: {
                name : $('#registerName').val(),
                email : $('#registerEmail').val(),
                password : $('#registerPassword').val(),
            }
        })
        .done(result=>{
            localStorage.setItem('token',result.token)
            dialog.setContent(result.message).open()
            setTimeout(() => {
                window.location.href = "http://localhost:8080/"
            }, 1000);

        })
        .fail(err=>{
            dialog.setContent(err.responseJSON.message).open()
        })
    });
});


//reload
function requestTrigger(){
    $('.task').empty()
    $('.detail').empty()
    $.ajax({
        type: "get",
        url: "http://localhost:3000/api/users",
        data : {
            token : localStorage.getItem('token')
        },
        headers: {token: localStorage.getItem('token')},
    })
    .done(data=>{
        $.each(data.data.userTodos, function (i, val) {
            $('.task').append(`
                <div class='postCard' onclick="getTaskDetail('${val.title}','${val.created_at}','${val.deadline}','${val.notes}','${val.priority}','${val._id}')">
                <h1>${val.title}</h1>
                </div>
            `)
        });
    })
    .fail(err=>{
        console.log(err)
    }) 
}

// post task
$('#submitTask').click(function (e) { 

    $.ajax({
        type: "post",
        url: "http://localhost:3000/api/todos",
        data: {
            title : $('#title').val(),
            notes : $('#notes').val(),
            priority: $('#priority').val(),
            deadline: $('#deadline').val()
        },
        headers: {token: localStorage.getItem('token')},
        dataType : 'json'
        
    })
    .done(result=>{
        dialog.setContent(result.message).open()

        $('.categories').show()
        $('#newTaskForm').hide()
        $('.addTask').show()
        requestTrigger()
    })
    .fail((err)=>{
        dialog.setContent(err.responseJSON.message).open()
    })
    
});

// task detail
function getTaskDetail(title,created_at,deadline,notes,priority,id){
    $('.detail').empty()
    $('.detail').append(`
        <div class='taskDetail'>
            <h1>${title}</h1>
            <p>deadline : ${deadline}</p>
            <p>notes : ${notes}</p>
            <p>priority : ${priority}</p>
            <p>created at : ${created_at}</p>
            <input type="button" id="deleteTask" onclick="deleteTask('${id}')" value="delete">
            <input type="button" id="editTask" onclick="editTask('${id}','${title}','${notes}','${deadline}','${priority}')" value="edit">
        </div>
    `);
}

// show edit task
function editTask(id,title,notes,deadline,priority){
    $('.taskDetail').hide();
    $('.detail').append(`
        <form id="editTaskForm">
            <input id="title" type="text" name="title" placeholder="Task Title" value="${title}">
            <input id="notes" type="text" name="notes" placeholder="Notes" value="${notes}">
            <input id="priority" type="text" name="priority" placeholder="priority" value="${priority}">
            <input id="deadline" type="date" name="deadline" placeholder="Deadline" value="${deadline.slice(0,10)}">
            <div id="editTask" class="button" type="submit" onclick="save('${id}')" > Save </div>  
        </form>
    `);
}

// update task
function save(id) { 
    $.ajax({
        type: "patch",
        url: `http://localhost:3000/api/todos/${id}`,
        headers: {
            "token": localStorage.getItem('token')
        },
        data : {
            title : $('#editTaskForm #title').val(),
            notes : $('#editTaskForm #notes').val(),
            priority : $('#editTaskForm #priority').val(),
            deadline : $('#editTaskForm #deadline').val()
        }
    })
    .done(result=>{
        dialog.setContent(result.message).open()
        requestTrigger()
    })
    .fail(err=>{
        console.log(err)
    })
}

// delete todo
function deleteTask(id){
    $.ajax({
        type: "delete",
        url: `http://localhost:3000/api/todos/${id}`,
        headers: {"token": localStorage.getItem('token')},
    })
    .done((result)=>{
        dialog.setContent(result.message).open()
        $('.detail').empty()
        requestTrigger()
    })
    .fail(err=>{
        console.log(err);
        
    })
}


//logout
$(document).ready(function () {
    
    $('#logout').click(function (e) {
        localStorage.removeItem('token')
        window.location.href = "http://localhost:8080/"
    });
});

