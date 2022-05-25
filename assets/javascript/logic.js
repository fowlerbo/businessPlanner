var signInButton = document.querySelector("#sign-in-button");
var formDisplay = document.querySelector("#sign-in-form");
signInButton.addEventListener("click", function() {
    formDisplay.classList.add('hidden');
})