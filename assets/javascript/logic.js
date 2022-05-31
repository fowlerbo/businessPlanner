var signInButton = document.querySelector("#sign-in-button");
var formDisplay = document.querySelector("#sign-in-form");
var welcomeWrapper = document.querySelector(".welcome-wrapper");
var calendarEl = document.getElementById('calendar');
var stocksEl = document.querySelector("#stock-prices");
var events = []
var modal = document.querySelector(".modal")
var stockKey = "API_KEY92DYBC7BL2AM3H5A8BJ2IM4QVAEPY456";
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
      stocksEl.classList.remove('is-invisible');
      calendar.render();
      stockPrices();
    

    });
    
  });

// Stock Ticker
var stockPrices = function() {
  var apiUrl1 = "https://api.finage.co.uk/last/stock/AAPL?apikey=" + stockKey;
  var apiUrl2 = "https://api.finage.co.uk/last/stock/TSLA?apikey=" + stockKey;
  var apiUrl3 = "https://api.finage.co.uk/last/stock/GOGL?apikey=" + stockKey;
  console.log("apiUrl1: " + apiUrl1);
  console.log("apiUrl2: " + apiUrl2);
  console.log("apiUrl3: " + apiUrl3);
  fetch(apiUrl1)
    .then(function(response) {
      if (response.ok) {
        response.json()
          .then(function(stockData1) {
            var testing = JSON.stringify(stockData1.symbol);
            console.log("testing:  " + testing);
            // var date = new Date(JSON.stringify(data.current.dt)*1000).toLocaleDateString("en-US");
            // var icon = JSON.stringify(data.current.weather[0].icon).slice(1, -1);
            // cityDateEl.innerHTML = city + " " + date +
            // "<img id='city-state-image' src='https://openweathermap.org/img/wn/" + icon + ".png'>";
            // var temp = parseFloat((JSON.stringify(data.current.temp)-273.15)*1.8+32).toFixed(0);
            // tempEl.textContent = "Temp: " + temp + "°F";
            // var wind = parseFloat(JSON.stringify(data.current.wind_speed)).toFixed(0);
            // windEl.textContent = "Wind: " + wind + " mph";
            // var humidity = JSON.stringify(data.current.humidity);
            // humidityEl.textContent = "Humidity: " + humidity + "%";
            // var uvIndex = JSON.stringify(data.current.uvi);
            // uvIndexEl.textContent = "UV Index: " + uvIndex;
          });
      } else {
          console.log("stockPrices error response " + response.statusText);
      };
    });
};
  
stockPrices();
