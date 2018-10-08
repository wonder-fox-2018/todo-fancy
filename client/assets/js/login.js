let prism = document.querySelector(".rec-prism");

function showSignup(){
  prism.style.transform = "translateZ(-100px) rotateY( -90deg)";
}
function showLogin(){
  prism.style.transform = "translateZ(-100px)";
}

function showThankYou(){
  prism.style.transform = "translateZ(-100px) rotateX( 90deg)";
}

let token = localStorage.getItem('token')
if (token) window.location = '/'

// USER SIGNIN

$("#btnSignin").click(function () {
  let data = {
    email : $("#emailLogin").val(),
    password : $("#passwordLogin").val(),
  }

  $.ajax({
      method: "POST",
      url: "http://localhost:3000/users/signin",
      data
  })
  .done(function (response) {
    localStorage.setItem('name', response.name)
    localStorage.setItem('email', response.email)
    localStorage.setItem('token', response.token)
    window.location.href = 'index.html'
  })
  .fail(function (err) {

    $("#errorLogin").show()
    $("#errorLogin").text('')
    $("#errorLogin").append(`
      <p>${err.responseJSON.message}</p>
    `)
  })
})

// USER REGISTER
$("#btnSignup").click(function () {
  let data = {
    name : $("#name").val(),
    phone : $("#phone").val(),
    email : $("#email").val(),
    password : $("#password").val()
  }

  $.ajax({
      method: "POST",
      url: "http://localhost:3000/users/signup",
      data
  })
  .done(function (response) {
    showThankYou()
  })
  .fail(function (err) {
    checkError(err)
  })

})

// ErrorHandling
function checkError(err){
  if(err){
    if(err.responseJSON.error){
        if(err.responseJSON.error.name){
            $("#name").val(err.responseJSON.error.name.message).css('color', 'red', 'font-size', '6px')
        }
        if(err.responseJSON.error.phoneNumber){
            $("#phone").val(err.responseJSON.error.phoneNumber.message).css('color', 'red', 'font-size', '6px')
        }
        if(err.responseJSON.error.email){
            $("#email").val(err.responseJSON.error.email.message).css('color', 'red', 'font-size', '6px')
        }
        if(err.responseJSON.error.password){
            $("#password").val(err.responseJSON.error.password.message).css('color', 'red', 'font-size', '6px')
        }  
    } else {
      $("#email").val('')
      $("#email").val('email already exist').css('color', 'red', 'font-size', '6px')
    }
  }
}

// START VALIDATION
function clikName(){
  $("#name").val('').css('color', 'black')
}
function clikPhone(){
  $("#phone").val('').css('color', 'black')
}
function clikEmail(){
  $("#email").val('').css('color', 'black')
}
function clikPassword(){
  $("#password").val('').css('color', 'black')
}

function onSuccess(googleUser) {
  var profile = googleUser.Zi.id_token
  $.ajax({
    url: `http://localhost:3000/users/signinGoogle`,
    method: 'post',
    data: {
      token : profile
    }
  })
  .done((response) => {
    localStorage.setItem('name', response.name)
    localStorage.setItem('email', response.email)
    localStorage.setItem('token', response.token)
    location.reload()
  })
  .fail((errors) => {
    console.log(errors.responseJSON.message)
  })

}

function onFailure(error) {
  console.log(error);
}

function renderButton() {
  gapi.signin2.render('my-signin2', {
    'scope': 'profile email',
    'height': 30,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
    'onfailure': onFailure
  });
}

$("#errorLogin").hide()
$("#emailLogin").click(function () {
  $("#errorLogin").text('')
})
$("#passwordLogin").click(function () {
  $("#errorLogin").text('')
})



