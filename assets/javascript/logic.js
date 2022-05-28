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
        center: 'addEventButton'
      },
      customButtons: {
        addEventButton: {
          text: 'Add Event',
          click: function() {
            var userTitle = prompt('Give your event a name.')
            var dateStr = prompt('Enter a date in YYYY-MM-DD format');
            var date = new Date(dateStr + 'T00:00:00');

            if (!isNaN(date.valueOf())) {
              calendar.addEvent({
                title: userTitle,
                start: date,
                eventDisplay: 'auto'
              });
            } else {
              alert('Invalid information.')
            }
          }
        }
      }
    });

    calendar.render();
      
  });


