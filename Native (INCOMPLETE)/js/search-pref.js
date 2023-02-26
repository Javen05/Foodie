input = document.getElementsById("Input");
button = document.getElementById("Search");

function setCookie() {
  //create a cookie with the name "search" and the value of the input
  document.cookie = "searchCookie";

}

button.addEventListener("click", function() {
  alert("You clicked the button");
});