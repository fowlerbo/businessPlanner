var signInButton = document.querySelector("#sign-in-button");
var formDisplay = document.querySelector("#sign-in-form");
var welcomeWrapper = document.querySelector(".welcome-wrapper");
var calendarEl = document.getElementById('calendar');
var events = []
var modal = document.querySelector(".modal")
//login to local storage
//if login is true then dont show sign in



document.addEventListener('DOMContentLoaded', function() {
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      selectable: true,
      navLinks: true,
      nowIndicator: true,
      height: "100vh",
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
            var userTitle = document.querySelector("#user-title").value;
            var dateSelect= document.querySelector("#date-select").value;
            var timeSelect = document.querySelector("#time-select").value;
            modal.classList.add("is-active");
            function openModal($el) {
              $el.classList.add('is-active');
            }
          
            function closeModal($el) {
              $el.classList.remove('is-active');
            }
          
            function closeAllModals() {
              (document.querySelectorAll('.modal') || []).forEach(($modal) => {
                closeModal($modal);
              });
            }
          
            // Add a click event on buttons to open a specific modal
            (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
              const modal = $trigger.dataset.target;
              const $target = document.getElementById(modal);
          
              $trigger.addEventListener('click', () => {
                openModal($target);
              });
            });
          
            // Add a click event on various child elements to close the parent modal
            (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
              const $target = $close.closest('.modal');
          
              $close.addEventListener('click', () => {

                closeModal($target);
              });
            });
          
            // Add a keyboard event to close all modals
            document.addEventListener('keydown', (event) => {
              const e = event || window.event;
          
              if (e.keyCode === 27) { // Escape key
                closeAllModals();
              }
            });
            
            var date = new Date(dateSelect + timeSelect);
            var eventId = 0;
            
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


