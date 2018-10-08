/*jQuery time*/
$(document).ready(function(){
  $("#firstEvent h3").click(function(){
    //slide up all the link lists
    $("#firstEvent ul ul").slideUp();
    //slide down the link list below the h3 clicked - only if its closed
    if(!$(this).next().is(":visible"))
    {
      $(this).next().slideDown();
    }
  })

  $("#secondEvent h3").click(function(){
    //slide up all the link lists
    $("#secondEvent ul ul").slideUp();
    //slide down the link list below the h3 clicked - only if its closed
    if(!$(this).next().is(":visible"))
    {
      $(this).next().slideDown();
    }
  })
})

let token = localStorage.getItem('token')
if (!token) window.location = 'login.html'

$("#btnAddTask").click(function () {
  $("#boxAddTask").show()
  $("#boxUncompleted").hide()
  $("#boxCompleted").hide()
})

// START CREATE TASK
$("#createTask").click(function () {

  let data = {
    name : $("#nameTask").val(),
    description : $("#descTask").val(),
    dueDate : $("#deuDateTask").val()
  }

  $.ajax({
    method: "POST",
    url: "http://localhost:3000/todos/create",
    data,
    headers: {
      token: localStorage.getItem('token')
    }
  })
  .done(function (task) {
    swal(`Create ${task.task.name}`, ``, "success")
    .then(function(){
        $("#nameTask").val('')
        $("#descTask").val('')
        $("#deuDateTask").val('')
    })
  })
  .fail(function (err) {})

})
// END CREATE TASK

// START UNCOMPLETE TASK
function btnUncomplete() {
  $("#boxUncompleted").show()
  $("#boxAddTask").hide()
  $("#boxCompleted").hide()

  $.ajax({
    method: "GET",
    url: "http://localhost:3000/todos/findTask",
    headers: {
      token: localStorage.getItem('token')
    }
  })
  .done(function (task) {
      let tasks = task.task.todoList
      $("#boxUncompleted").text('')
      for (let i = 0; i < tasks.length; i++) {
          if (tasks[i].status == false) {
              $(document).ready(function () {
                  $("#boxUncompleted").append(
                      `
                      <div class="ui card removeOnUncomplete${tasks[i]._id}" id="cardComplete">
                      <div class="content">
                        <div class="header">${tasks[i].name}</div>
                        <div class="meta">
                          <span class="category">Prioritas : 1</span>
                        </div>
                        <div class="description">
                          <p>${tasks[i].description}</p>
                        </div>
                      </div>
                      <div class="extra content">
                        <div class="left floated author">
                          <i onclick="completedTask('${tasks[i]._id}')" class="fas fa-check"></i>
                          <i onclick="updateTask('${tasks[i]._id}', '${tasks[i].name}','${tasks[i].description}','${tasks[i].dueDate}','${status = true}')" class="fas fa-pen"></i>
                          <i onclick="removeTask('${tasks[i]._id}')" class="fas fa-trash-alt"></i>
                        </div>
                        <div class="right floated author" id="avatar">
                          <img class="ui avatar image" src="./assets/images/avatar.png">
                        </div>
                      </div>
                    </div>
                  `
                  )
              })

          }
      }
  })
  .fail(function (err) {})
}
// END UNCOMPLETE TASK

// START COMPLETE TASK
function btnComplete() {
  $("#boxCompleted").show()
  $("#boxAddTask").hide()
  $("#boxUncompleted").hide()

  $.ajax({
    method: "GET",
    url: "http://localhost:3000/todos/findTask",
    headers: {
        token: localStorage.getItem('token')
    }
  })
    .done(function (task) {
        let tasks = task.task.todoList
        $("#boxCompleted").text('')
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].status == true) {
                $(document).ready(function () {
                    $("#boxCompleted").append(
                      `
                      <div class="ui card removeOncomplete${tasks[i]._id}"" id="cardComplete">
                        <div class="content">
                          <div class="header">${tasks[i].name}</div>
                          <div class="meta">
                            <span class="category">Prioritas : 1</span>
                          </div>
                          <div class="description">
                            <p>${tasks[i].description}</p>
                          </div>
                        </div>
                        <div class="extra content">
                          <div class="left floated author">
                            <i onclick="UncompletedTask('${tasks[i]._id}')" class="fas fa-times"></i>
                            <i onclick="updateTask('${tasks[i]._id}', '${tasks[i].name}','${tasks[i].description}','${tasks[i].dueDate}','${status = false}')" class="fas fa-pen"></i>
                            <i onclick="removeTask('${tasks[i]._id}')" class="fas fa-trash-alt"></i>
                          </div>
                          <div class="right floated author" id="avatar">
                            <img class="ui avatar image" src="./assets/images/avatar.png">
                          </div>
                        </div>
                      </div>  
                      `
                    )
                })

            }
        }
    })
    .fail(function (err) {})
}
// END COMPLETE TASK

function completedTask(id) {
  $.ajax({
    method: "PUT",
    url: `http://localhost:3000/todos/complete?todosId=${id}`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
  .done(function (task) {
      $(`.removeOnUncomplete${id}`).remove()
  })
  .fail(function (err) {})
}

function UncompletedTask(id) {
  $.ajax({
    method: "PUT",
    url: `http://localhost:3000/todos/uncomplete?todosId=${id}`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
  .done(function (task) {
      $(`.removeOncomplete${id}`).remove()
  })
  .fail(function (err) {

  })
}

function updateTask(id, nameTask, descriptionTask, dueDateTask, statusTask) {
  $('.tiny.modal')
    .modal('show')
  ;

  $("#contentModal").text('')
  $("#contentModal").append(`
    <i class="close icon"></i>
    <div class="header">Update Task</div>

    <div class="content">
      
    <div class="ui inverted segment" style="width: 500px;">
      <div class="ui inverted form">
          <div class="field">
            <label>Title</label>
            <input id="nameUpdate" type="text" value="${nameTask}">
          </div>
          <div class="field">
            <label>Description</label>
            <textarea id="descUpdate">${descriptionTask}</textarea>
          </div>

          <div class="field">
            <label>Date</label>
            <input type="datetime-local" id="dueDateUpdate" value="${dueDateTask.slice(0,19)}">
          </div>
      </div>
    </div>

    </div>
    <div class="actions">
      <div class="ui black deny button">
        Cancel
      </div>
      <div class="ui positive right labeled icon button" id="submitUpdate">
        Update
        <i class="checkmark icon"></i>
      </div>
    </div>
  `)

  $("#submitUpdate").click(function () {

    let data = {
      name: $("#nameUpdate").val(),
      description: $("#descUpdate").val(),
      dueDate: $("#dueDateUpdate").val()
    }

    $.ajax({
      method: "PUT",
      url: `http://localhost:3000/todos/update?todosId=${id}`,
      data,
      headers : {
          token : localStorage.getItem('token')
      }
      })
      .done(function (task) {
        if(statusTask == 'true'){
          btnUncomplete()
        } else if (statusTask == 'false'){
          btnComplete()
        }
      })
      .fail(function (err) {

      })

  })

}

function removeTask(id) {
$.ajax({
      method: "DELETE",
      url: `http://localhost:3000/todos/delete?todosId=${id}`,
      headers: {
          token: localStorage.getItem('token')
      }
  })
  .done(function (task) {
    $(`.removeOnUncomplete${id}`).remove()
    $(`.removeOncomplete${id}`).remove()
  })
  .fail(function (err) {})
}

function quotes() {
  $.ajax({
    method: "GET",
    url: `http://localhost:3000/todos/quotes`,
    })
    .done(function (quote) {
        $("#quotesOfTheDay").append(
            `
            <p>${quote.quotes}</p>
            `
        )
    })
    .fail(function (err) {})
}
quotes()

$("#userName").text(localStorage.getItem('name'))
$("#userEmail").text(localStorage.getItem('email'))

$("#logout").click(function(){

  localStorage.removeItem('token')
  localStorage.removeItem('name')
  localStorage.removeItem('email')
  window.location = "https://mail.google.com/mail/u/0/?logout&hl=en";
  location.reload()
})


