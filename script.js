/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("menuBar");
    if (x.className === "menuBar") {
      x.className += " responsive";
    } else {
      x.className = "menuBar";
    }
  }
document.querySelector('html').onclick = function() {
    alert('Ouch! Stop poking me!');
}