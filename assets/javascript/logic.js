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
      nowIndicator: true,
      buttonText: {
        addEvent: 'Add Event'
      },
      headerToolbar:  {
          start: 'title',
          center: 'dayGridMonth,timeGridWeek today prev,next',
          end: 'prevYear,nextYear'
        },
      businessHours: {
        daysOfWeek: [1, 2, 3, 4, 5],
        startTime: '9:00',
        endTime: '17:00'
      },
      footerToolbar: {
        center: 'addEvent'
      }
    });

    calendar.render();
    //may or may not be correct ???
    var addEventButtonEl = document.getElementsByClassName("fc-addEvent-button");
    addEventButtonEl.addEventListener('click', function() {
      console.log("mike");
    })  
  });


