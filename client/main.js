var token=localStorage.getItem('token')

$(document).ready(function () {    
    verify_token()
});

function verify_token(){
   
    triggerLogin()
    $.ajax({
        type: "post",
        url: "http://localhost:3000/api/auths/verifytoken",
        data: {
            token: token    
        }
    })
    .done(result=>{
        requestTrigger()
        triggerDashboard()
    })
    .fail(err=>{
        triggerLogin()
    })
}

function serverLogin(){
    $.ajax({
        type: "post",
        url: "http://localhost:3000/api/auths/login",
        data: {
            email : $('#email').val(),
            password : $('#password').val(),
        },
    })
    .done(result=>{
        console.log(result);
        $('#loginForm').hide();
        $('#registerForm').hide();
        $("#content").show()

        localStorage.setItem('token',result.token)
        requestTrigger()       
        location.reload() 
    })
    .fail(err=>{
        console.log(err)
    })
}


function triggerLogin(user){
        $("#content").hide();
        $('#registerForm').hide();
        $('#loginForm').show();
        $('#konten').hide();
}

$('#loginBtn').click(function (e) { 
    serverLogin()         
});

$('#registerBtn').click(function (e) { 
    $('#registerForm').show();
    $('#loginForm').hide();    
});

$('#regBtn').click(function (e) { 
    $.ajax({
        type: "post",
        url: "http://localhost:3000/api/auths/signup",
        data: {
            name:$('#namerg').val(),
            email : $('#emailrg').val(),
            password : $('#passwordrg').val()
        },
    })
    .done(result=>{
        $('#registerForm').hide();
        $('#loginForm').show();
    })
    .fail(err=>{
        console.log(err)
    })
    
});

function signOut() {
    let auth2 = gapi.auth2.getAuthInstance()
      auth2.signOut().then(function () {
        console.log('User signed out.')
      })
  }

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();

    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token)

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/signupgoogle',
        data: {
          googleToken:id_token
        }
     }).then(data=>{
         console.log(data)
        
        localStorage.setItem('token',data.token)
        triggerDashboard()
        verify_token()
    })
    .catch(err=>{
     console.log(err)
    })
    
}


function triggerDashboard(){
    $("#content").show();
    $('#loginForm').hide();
    $('#registerForm').hide();
    $('#gbutton').hide();
}

function deleteTask(id){
    $.ajax({
        type: "delete",
        url: `http://localhost:3000/api/me/todos/${id}`,
        headers: {"token":token}
    })
    .done((result)=>{
        console.log('deleted');
        $('.detail').empty()
        requestTrigger()
    })
    .fail(err=>{
        console.log(err);
        
    })
}

function get_daydiff(date1,date2){
    var dat1=new Date(date1)
    var dat2=new Date(date2)

    var timediff=Math.abs(dat2.getTime()-dat1.getTime())
    var diffday=Math.ceil(timediff/(1000*3600*24))

    return diffday
}

function requestTrigger(){
    $('.task').empty()
    $('.detail').empty()
    $.ajax({
        type: "get",
        url: "http://localhost:3000/api/me",
        data : {
            token : token
        },
        headers: {"token": token},
    })
    .done(data=>{
        let date=new Date()
        let date1=[]
        
        date1[0]=date.getFullYear()
        date1[1]=date.getMonth()
        date1[2]=date.getDate()
        let str1=date1[1]+'/'+date1[2]+'/'+date1[0]

        $.each(data.data.userTodos, function (i, val) {
            let date2=[]
            val.deadline.split('-').forEach(function(item){
                date2.push(parseInt(item))
            })
            console.log(val._id)
            let str2=date2[1]+'/'+date2[2]+'/'+date2[0]
            let valid=get_daydiff(str1,str2)-30
            console.log(typeof val.status)
            if(valid<1&&val.status!==true){
                $('.task').append(`
                    <div class='postCard' onclick="getTaskDetail('${val.title}','${val.created_at}','${val.deadline}','${val.notes}','${val.priority}','${val._id}','${val.status}')">
                    <p>Today Task</p>
                    <h1>${val.title}</h1>
                    </div>
                `)
            }
            if(valid==1&&val.status!==true){
                $('.task').append(`
                
                    <div class='postCard' onclick="getTaskDetail('${val.title}','${val.created_at}','${val.deadline}','${val.notes}','${val.priority}','${val._id}','${val.status}')">
                    <p>Tomorrow Task</p>
                    <h1>${val.title}</h1>
                    </div>
                `)
            }
            if(valid>1&&val.status!==true){
                $('.task').append(`
                    
                  
                    <div class='postCard' onclick="getTaskDetail('${val.title}','${val.created_at}','${val.deadline}','${val.notes}','${val.priority}','${val._id}','${val.status}')">
                    <p>Soon Task in ${valid} day </p>
                    <h1>${val.title}</h1>
                    </div>
                `)
            }

            if(val.status==true){
                $('.task').append(`
                   
                    <div class='postCard' onclick="getTaskDetail('${val.title}','${val.created_at}','${val.deadline}','${val.notes}','${val.priority}','${val._id}','${val.status}')">
                    <p>Completed</p>
                    <h1>${val.title}</h1>
                    </div>
                `)
            }
            
        });
        $('#linkbars').empty();
        $('#linkbars').append(`<p>${data.data.name}</p>`);
    })
    .fail(err=>{
        console.log(err)
    }) 
}

function getTaskDetail(title,created_at,deadline,notes,priority,id,status){
  
    $('.detail').empty()
    $('.detail').append(`
        <div class='taskDetail'>
            <h1>${title}</h1>
            <p>deadline : ${deadline}</p>
            <p>notes : ${notes}</p>
            <p>priority : ${priority}</p>
            <p>completed : ${status}</p>
            <p>created at : ${created_at}</p>
            <input type="button" id="deleteTask" onclick="deleteTask('${id}')" value="delete">
            <input type="button" id="editTask" onclick="editTask('${id}','${title}','${notes}','${deadline}','${priority}')" value="edit">
            <input type="button" id="finish" onclick="togglestatus('${true}','${id}')" value="finish it">
            <input type="button" id="notyet" onclick="togglestatus('${false}','${id}')" value="unfinish it">
        </div>
    `);

    console.log(typeof status)
    if(status==='true'){
        console.log('dimari')
        $('#finish').hide()
        $('#notyet').show()
    }
    else{
        console.log('dimaro')
        $('#finish').show()
        $('#notyet').hide()
    }
}

function togglestatus(val,id){
    $.ajax({
        type: "patch",
        url: `http://localhost:3000/status/${id}`
        ,
        data : {
            status : val
        }
    })
    .done(result=>{
        requestTrigger()
    })
    .fail(err=>{
        console.log(fail)
    })

}

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

function save(id) { 
   
    $.ajax({
        type: "patch",
        url: `http://localhost:3000/api/me/todos/${id}`,
        headers: {
            "token": token
        },
        data : {
            title : $('#editTaskForm #title').val(),
            notes : $('#editTaskForm #notes').val(),
            priority : $('#editTaskForm #priority').val(),
            deadline : $('#editTaskForm #deadline').val()
        }
    })
    .done(result=>{
        requestTrigger()
    })
    .fail(err=>{
        console.log(fail)
    })
}



$(document).ready(function(){
        $("#search").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $(".postCard").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
});
    
        
$('#logout').click(function (e) { 
    signOut()
   localStorage.removeItem('token')

   let user=localStorage.getItem('token')
   $('#gbutton').show();

   if(!user){
        triggerLogin()
   }
});

$('.addTask').click(function (e) { 
    $('.categories').hide()
    $(this).hide()
    $('.Quotes').hide();
    $('#newTaskForm').show();
});

$('.Pomodoro').click(function (e) { 
    $('#konten').show();
})

$('#submitTask').click(function (e) { 
    $.ajax({
        type: "post",
        url: "http://localhost:3000/api/me/todos",
        data: {
            title : $('#title').val(),
            notes : $('#notes').val(),
            priority: $('#priority').val(),
            deadline: $('#deadline').val()
        },
        headers: {"token": token},
    })
    .done(result=>{
        $('.categories').show()
        $('#newTaskForm').hide()
        $('.addTask').show()
        $('.Quotes').show();
        requestTrigger()
    })
    .fail(err=>{
        console.log(token)
        console.log(err)
    })
    
});

$('.Quotes').click(function (e) {
    $.ajax({
        type: "get",
        url: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=mycallback"
    })
    .done(data=>{
        let hasil=JSON.parse(data)
        console.log(hasil)
    })
    .fail(err=>{
        console.log(err)
    })
    
})

var sessionLength = 25;
var breakLength = 5;
var alarm = new Audio('http://www.orangefreesounds.com/wp-content/uploads/2016/06/Ringing-clock.mp3?_=1');
var loop = 0;
var clicks = 0;

function btnReset() {
    $('#sessionName').text('Current Session');
    clearInterval(countInt);
}


function addSessionTime() {
    sessionLength += 1;
    $("#timer-session").text(sessionLength);
    $("#timeLeft").text(sessionLength);
    btnReset();
}

function deduceSessionTime() {
    if (sessionLength > 1){
        sessionLength -= 1;
    } else {
        sessionLength = 1;
    }
    $("#timer-session").text(sessionLength);
    $("#timeLeft").text(sessionLength);
    btnReset();
}

function deduceBreakTime() {
    if (breakLength > 1){
        breakLength -= 1;
    } else {
        breakLength = 1;
    }
    $("#timer-break").text(breakLength);
    btnReset();
}

function addBreakTime(){
    breakLength += 1;
    $("#timer-break").text(breakLength);
    btnReset();
}

function startTimer() {
  if (clicks == 0) {
    clicks += 1;
    seconds = 0;
    countDown(sessionLength, seconds);
  } else if (clicks == 1) {
    btnReset();
    clicks -= 1;
  }
}

function countDown(m,s) {
    countInt = setInterval(function(){
        
    if (m == 0 && s == 0) {
        clearInterval(countInt);
        if (loop == 0) {
            timeLeft = breakLength;
            loop += 1;
            $('#sessionName').text('Current Break');
        } else {
            timeLeft = sessionLength;
            loop -= 1;
            $('#sessionName').text('Current Session');
        }
        alarm.play();
        countDown(timeLeft,0);
    } else if (s != 0) {
        if (s <= 10){
            s -= 1;
            timeLeft = m + ':0' + s;
        } else {
            s -= 1;
            timeLeft = m + ':' + s;
        }
    } else if (s == 0) {
        s = 59;
        m -= 1;
        timeLeft = m + ':' + s;
    }
        $('#timeLeft').text(timeLeft);
        
    }, 1000);
}

function reset() {
    sessionLength = 25;
    breakLength = 5;
    $("#timer-session").text(sessionLength);
    $("#timeLeft").text(sessionLength);
    $("#timer-break").text(breakLength);
    btnReset();
}