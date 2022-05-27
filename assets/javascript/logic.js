var signInButton = document.querySelector("#sign-in-button");
var formDisplay = document.querySelector("#sign-in-form");
var introP = document.querySelector("#intro-paragraph");
var calendarEl = document.getElementById('calendar');
signInButton.addEventListener("click", function(event) {
    event.preventDefault();

    introP.innerHTML = "";
    introP.classList.add('is-invisible');
    

    formDisplay.innerHTML = "";
    formDisplay.classList.add('is-invisible');
    
    console.log("doug");
    calendarEl.classList.remove('is-invisible');
});

document.addEventListener('DOMContentLoaded', function() {
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'timeGridWeek',
      selectable: true,
      navLinks: true,
      headerToolbar:  {
          start: 'title',
          center: 'dayGridMonth,timeGridWeek today prev,next',
          end: 'prevYear,nextYear'
        }
    });

    calendar.render(); 
  });