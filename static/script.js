//Olga Krupa Łukasz Popek
var emailArray = [];
var passwordArray = [];

function resetForm(){
  document.getElementById("formsStyle").reset();
}


function saveToTxt() {
    	
  // Get the data from each element on the form.
  const name = document.getElementById('txtName');
  const surname = document.getElementById('txtSurname');
  const birthday = document.getElementById('txtBirthday');
  const email = document.getElementById('txtEmail');
  const pass = document.getElementById('txtPassword');
  const gender = document.getElementById('txtGender');
  var inputs =[name, surname, birthday, pass];

  var everythingOK = true

  var res = getData();

  if (emailIsValid(email.value) == false)
    { alert("Niepoprawny adress email!");
      document.getElementById("txtEmail").style.border = "3px solid red";
      everythingOK = false;
      document.getElementById('txtPassword').value = "";
    }
    if (emailExist(email.value) == true)
    { alert("Istniejący adres email!");
      document.getElementById("txtEmail").style.border = "3px solid red";
      everythingOK = false;
      document.getElementById('txtPassword').value = "";
    }

  for (var i= 0; i < inputs.length; i++){
    if (inputs[i].value == ''){
      inputs[i].style.border = "3px solid red";
      everythingOK = false;
      document.getElementById('txtPassword').value = "";
    }
  }
  if (everythingOK == true){

    save_user();
    document.location.href = newUrl = "./post_registration_page";
  } 
}

function emailIsValid (email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}


async function getData () {

  $.ajax({
        url: '/registration/data',
        type: 'GET',
        async: false,
        success: function(data)
        {
          emailArray = [...data.emailarray];
        }
      });


}


function emailExist(email){
  
  exist = false;

  for(var x =0; x < emailArray.length; x++){
    if (emailArray[x] == email){
      exist = true;
      return exist;
      }
    }
  return exist;
}

function save_user(t) {

      $.ajax({
			url: '/registration',
			data: $('form').serialize(),
			type: 'POST',
			success: function(response){
				console.log(response);
			},
			error: function(error){
				console.log(error);
			}
		});

}

function save_login_user(t) {

      $.ajax({
			url: '/login',
			data: $('form').serialize(),
			type: 'POST',
			success: function(response){
				console.log(response);
			},
			error: function(error){
				console.log(error);
			}
		});

}




function logInUser() {

  const email = document.getElementById('logEmail');
  const pass = document.getElementById('logPassword');
  var inputs =[email, pass];

  var everythingOK = true

  getDataUsers();

    if (emailExist(email.value) == false)
    { alert("Nieistinejący adres email!");
      document.getElementById("logEmail").style.border = "3px solid red";
      everythingOK = false;
      document.getElementById('logPassword').value = "";
    }

    if (check_password(email.value, pass.value) == false)
    { alert("Niepoprawny hasło!");
      everythingOK = false;
      document.getElementById("logPassword").style.border = "3px solid red";
      document.getElementById('logPassword').value = "";
    }

  if (everythingOK == true){
    save_login_user();
    document.location.href = newUrl = "./post_login_page";
  }
}

async function getDataUsers () {

  $.ajax({
        url: '/login/data',
        type: 'GET',
        async: false,
        success: function(data)
        {
          emailArray = [...data.emailarray];
          passwordArray = [...data.passwordarray];
        }
      });


}

function check_password(email, password){

  logIn = false;
  var i = emailArray.indexOf(email)

  if (passwordArray[i] == password){
      logIn = true;
      return exist;
      }

  return logIn;
}

