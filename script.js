var registrButton = document.querySelectorAll('#formsStyle button')[0];
var resetButton = document.querySelectorAll('#formsStyle button')[1];
console.log(document.getElementById("#formsStyle"));


function resetForm(){
  document.getElementById("formsStyle").reset();
}


function saveToTxt() {
    	
  // Get the data from each element on the form.
  const name = document.getElementById('txtName');
  const surname = document.getElementById('txtSurname');
  const birtday = document.getElementById('txtBirthday');
  const email = document.getElementById('txtEmail');
  const gender = document.getElementById('txtGender');
  
  let data = 
      '\r Name: ' + name.value + ' \r\n ' + 
      'Surname: ' + surname.value + ' \r\n ' + 
      'Email: ' + email.value + ' \r\n ' + 
      'date of birthday: ' + birtday.value + ' \r\n ' + 
      'Gender: ' + gender.value;
  
  const textToBLOB = new Blob([data], { type: 'text/plain' });
  const sFileName = 'formData.txt';	   // The file to save the data.

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