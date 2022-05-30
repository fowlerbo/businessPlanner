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
          start: 'prev,next today',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay'
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
            var dateSelect = prompt('Enter a date in YYYY-MM-DD format');            
            var timeSelect = prompt('Enter a time in T00:00:00 format (ex. T14:00:00 will render 2:00 PM');
            var date = new Date(dateSelect + timeSelect);
//get date and time
//select if event is all day or not
            //if (!isNaN(date.valueOf())) {
              calendar.addEvent({
                title: userTitle,
                start: date,
                eventDisplay: 'auto'
              });
            //} else {
              //alert('Invalid information.')
            //}
          }
        }
      }
    });

    calendar.render();
      
  });


