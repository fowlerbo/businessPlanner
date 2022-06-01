var signInButton = document.querySelector("#sign-in-button");
var formDisplay = document.querySelector("#sign-in-form");
var welcomeWrapper = document.querySelector(".welcome-wrapper");
var calendarEl = document.getElementById('calendar');
var stockKey = "API_KEY92DYBC7BL2AM3H5A8BJ2IM4QVAEPY456";
var stocksEl = document.querySelector("#stock-prices");
var stock1 = document.querySelector("#stock1");
var stock2 = document.querySelector("#stock2");
var stock3 = document.querySelector("#stock3");
var events = [];
var modal = document.querySelector(".modal");
var saveChangesButton = document.querySelector("#save-changes");



//login to local storage
//if login is true then dont show sign in



document.addEventListener('DOMContentLoaded', function() {
  
    
 
    
    var eventId = Date();
    var calendar = new FullCalendar.Calendar(calendarEl, {
      //timeZone: 'UTC',
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
          }
        }
      }
    });

    saveChangesButton?.addEventListener("click", function() {
      var dateSelect= document.querySelector("#date-select").value;
      var timeSelect = document.querySelector("#time-select").value;
      var userTitle = document.querySelector("#user-title").value;
      var userDate = new Date(dateSelect + timeSelect);
      var savedEvents = JSON.parse(localStorage.getItem("Event-List"));
      var eventInfo = {
        title: userTitle,
        start: userDate,        
        eventDisplay: 'auto',
        id: eventId
      };
    var addEventFunction = function() {
      calendar.addEvent(eventInfo);
      }  
      events = savedEvents || [];
      events.push(eventInfo);
      console.log(eventInfo);
      addEventFunction();
      localStorage.setItem('Event-List', JSON.stringify(events));
      console.log(dateSelect, timeSelect);
    })
    
      
    events = JSON.parse(localStorage.getItem("Event-List"));
      for (i = 0; i<events?.length; i++) {
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
      stockPrices();

    });
    
  });

  // Stock Prices
var stockPrices = function() {
  // Identify all three stock price API URLs
  var apiUrl1 = "https://api.finage.co.uk/last/stock/AAPL?apikey=" + stockKey;
  var apiUrl2 = "https://api.finage.co.uk/last/stock/TSLA?apikey=" + stockKey;
  var apiUrl3 = "https://api.finage.co.uk/last/stock/GOGL?apikey=" + stockKey;
  // Grab first stock API URL
  fetch(apiUrl1)
    .then(function(response) {
      if (response.ok) {
        response.json()
          .then(function(stockData1) {
            // Grab first stock's symbol, and strip it of it's quotation marks
            var stockName1 = JSON.stringify(stockData1.symbol).slice(1,-1);
            // Grab first stock's asking price
            var stockPrice1 = JSON.stringify(stockData1.ask);
            // Combine previous two and format as HTML
            stock1.innerHTML = "<p>" + stockName1 + " " + stockPrice1 + ",</p>";
          });
      } else {
          console.log("stockPrices1 error response " + response.statusText);
      };
    });
  // Grab second stock API URL
  fetch(apiUrl2)
    .then(function(response) {
      if (response.ok) {
        response.json()
          .then(function(stockData2) {
            // Grab second stock's symbol, and strip it of it's quotation marks
            var stockName2 = JSON.stringify(stockData2.symbol).slice(1,-1);
            // Grab second stock's asking price
            var stockPrice2 = JSON.stringify(stockData2.ask);
            // Combine previous two and format as HTML
            stock2.innerHTML = "<p>" + stockName2 + " " + stockPrice2 + ",</p>";
          });
      } else {
        console.log("stockPrices2 error response " + response.statusText);
      };
    });
  // Grab third stock API URL
  fetch(apiUrl3)
    .then(function(response) {
      if (response.ok) {
        response.json()
          .then(function(stockData3) {
            // Grab third stock's symbol, and strip it of it's quotation marks
            var stockName3 = JSON.stringify(stockData3.symbol).slice(1,-1);
            // Grab third stock's asking price
            var stockPrice3 = JSON.stringify(stockData3.ask);
            // Combine previous two and combine as HTML
            stock3.innerHTML = "<p>" + stockName3 + " " + stockPrice3 + "</p>";
          });
      } else {
        console.log("stockPrices3 error response " + response.statusText);
      };
    });
}; 