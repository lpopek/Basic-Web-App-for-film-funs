


function resetForm(){
  document.getElementById("formsStyle").reset();
}


function saveToTxt() {
    	
  // Get the data from each element on the form.
  const name = document.getElementById('txtName');
  const surname = document.getElementById('txtSurname');
  const birthday = document.getElementById('txtBirthday');
  const email = document.getElementById('txtEmail');
  const gender = document.getElementById('txtGender');
  var inputs =[name, surname, birthday];
  let data = 
      '\r Name: ' + name.value + ' \r\n ' + 
      'Surname: ' + surname.value + ' \r\n ' + 
      'Email: ' + email.value + ' \r\n ' + 
      'date of birthday: ' + birthday.value + ' \r\n ' + 
      'Gender: ' + gender.value;
  var everythingOK = true
  if (emailIsValid(email.value) == false)
    { alert("Niepoprawny adress email!");
      document.getElementById("txtEmail").style.border = "3px solid red";
      everythingOK = false;
    }

  for (var i= 0; i < inputs.length; i++){
    if (inputs[i].value == ''){
      inputs[i].style.border = "3px solid red";
      everythingOK = false;
    }
  }
  if (everythingOK == true){
    const textToBLOB = new Blob([data], { type: 'text/plain' });
    const sFileName = 'formData.txt';

    let newLink = document.createElement("a");
    newLink.download = sFileName;

    if (window.webkitURL != null) {
        newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    }
    else {
        newLink.href = window.URL.createObjectURL(textToBLOB);
        newLink.style.display = "none";
        document.body.appendChild(newLink);
    }
    newLink.click(); 
    document.location.href = newUrl = "./post_registration_page.html";
  } 
}

function emailIsValid (email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
