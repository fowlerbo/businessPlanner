var signInButton = document.querySelector("#sign-in-button");
var formDisplay = document.querySelector("#sign-in-form");
var welcomeWrapper = document.querySelector(".welcome-wrapper");
var calendarEl = document.getElementById('calendar');
var events = []
//login to local storage
//if login is true then dont show sign in



document.addEventListener('DOMContentLoaded', function() {
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      selectable: true,
      navLinks: true,
      nowIndicator: true,
      height: "100vh",
      //width: "100%",
      //expandRows: true,
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
            var userTitle = prompt('Give your event a name.');
            var dateSelect= prompt('Enter a date in YYYY-MM-DD format');
            var timeSelect = prompt('Enter a time in T00:00:00 format (ex. T14:00:00 will render 2:00 PM');
            var date = new Date(dateSelect + timeSelect);
            var eventId = 0
            var eventInfo = {
              title: userTitle,
              start: date,        
              eventDisplay: 'auto',
              id: eventId
            }
            var addEventFunction = function() {
              calendar.addEvent(eventInfo);
              eventId++
              }
            
            events.push(eventInfo);
            console.log(events)
            
            addEventFunction();
            localStorage.setItem("Event List", JSON.stringify(events));
          }
        }
      }
    });
    

    events = JSON.parse(localStorage.getItem("Event List"));
    for (i = 0; i<events.length; i++) {
      calendar.addEvent(events[i]);
    }
    calendar.updateSize();
    calendar.render();
    
    signInButton.addEventListener("click", function(event) {
      event.preventDefault();
  
      welcomeWrapper.innerHTML = "";
      welcomeWrapper.classList.add('is-invisible');
      
  
      formDisplay.innerHTML = "";
      formDisplay.classList.add('is-invisible');
      
      calendarEl.classList.remove('is-invisible');
      calendar.render();
  });
    
  });


