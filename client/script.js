// Check if login or not
$(document).ready(() => {
  let token = localStorage.getItem('token')
  if (!token) {
      window.location = './index.html'
  } else {
    
    //Adding todo form
    $("#addTodo").click(() => {
      $(".create-form").show();
    });

    //Hide when touching outside the div
    $(document).mouseup(function (e) {
      var container = $(".login-box");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
      }

      var container2 = $(".register-box");
      if (!container2.is(e.target) && container2.has(e.target).length === 0) {
        container2.hide();
      }

      var container3 = $(".create-form");
      if (!container3.is(e.target) && container3.has(e.target).length === 0) {
        container3.hide();
      }

      var container4 = $(".update-form");
      if (!container4.is(e.target) && container4.has(e.target).length === 0) {
        container4.hide();
      }
    });

    //showing and adding todo
    $("#addTodo").click(() => {
      $(".create-form").fadeIn("slow");
    });

    $("#post-todo").submit((e) => {
      e.preventDefault();

      $.ajax({
        url: "http://localhost:3000/todo",
        method: "POST",
        data: {
          title: $("#title").val(),
          dueDate: $("#dueDate").val(),
          description : $("#description").val(),
          token : localStorage.getItem("token")
        }
      })
        .done(data => {
          swal("Welcome!", "Task Has Been Added!", "success");
          setTimeout(() => {
            location.reload();
          }, 3000);
        })
        .fail(err => {
          console.log(err);
        });
    });

    //Todo Page
    if (localStorage.getItem("token") !== null) {
      $(document).ready(() => {
        $.ajax({
          url: "http://localhost:3000/findUser",
          method: "POST",
          data: {
            title: $("#title").val(),
            dueDate: $("#dueDate").val(),
            description : $("#description").val(),
            token: localStorage.getItem("token")
          }
        })
          .done(response => {
            console.log(response);
            const lists = response.data.todolist;
            $(".todo-list").html("");
            for (let i = 0; i < lists.length; i++) {
              const date = formatDate(new Date(lists[i].dueDate));
              console.log(lists[i]._id);
              if (lists[i].status === "Finished") {
                $(".todo-list").append(
                  `<h3>
                      <strong>${lists[i].name}</strong> <br> Description : ${lists[i].description} <br> <br><strong>Due Date : ${date}</strong>
                  <br> TASK FINISHED ✅
                  </h3> <br>
                  `
                );
              } else {
                $(".todo-list").append(
                  `<h3>
                  <strong>${lists[i].name}</strong> <br> Description :  ${lists[i].description} <br> <br> <strong>Due Date : ${date}</strong>
                      <br> <a href="#" onclick="complete('${lists[i]._id}')">✅</a> <a onclick="erase('${lists[i]._id}')">❌</a> <a onclick="update('${lists[i]._id}')">✏️</a>
                  </h3>`
                );
              }
            }
          })
          .fail(err => {
            console.log(err);
          });
      });
    }

    function complete(id) {
      $.ajax({
        url: `http://localhost:3000/todo/${id}`,
        method: "PATCH",
        data: {
          token: localStorage.getItem("token")
        }
      })
        .done(response => {
          location.reload();
        })
        .fail(err => {
          console.log(err);
        });
    }

    function erase(id) {
      $.ajax({
        url: `http://localhost:3000/todo/${id}`,
        method: "DELETE",
        data: {
          token: localStorage.getItem("token")
        }
      })
        .done(response => {
          location.reload();
        })
        .fail(err => {
          console.log(err);
        });
    }

    function update(id) {
      $(".update-form").show();
      $("#updateTodo").submit((e) => {
        e.preventDefault();
        $.ajax({
          url: `http://localhost:3000/todo/${id}`,
          method: "PUT",
          data: {
            title: $("#title").val(),
            dueDate: $("#dueUpdate").val(),
            description: $("#description").val(),
            token: localStorage.getItem("token")
          }
        })
          .done(data => {
            swal("Task Has Been Updated successfully");
            setTimeout(() => {
              location.reload();
            }, 3000);
          })
          .fail(err => {
            console.log(err);
          });
      });

    }

    //Helper
    function formatDate(date) {
      var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];

      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();

      return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }
  }
})