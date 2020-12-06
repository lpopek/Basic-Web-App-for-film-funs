


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
  
  let data = 
      '\r Name: ' + name.value + ' \r\n ' + 
      'Surname: ' + surname.value + ' \r\n ' + 
      'Email: ' + email.value + ' \r\n ' + 
      'date of birthday: ' + birthday.value + ' \r\n ' + 
      'Gender: ' + gender.value;
  
  if (emailIsValid(email.value) == false)
    {alert("Niepoprawny adress email!")};


  if (name.value == '' || surname.value == '' || birthday == ''){
    alert ("Nie wysyłaj niepełnego formularza")
  }
  else {
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
  }
  
}

function emailIsValid (email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
