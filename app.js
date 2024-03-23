const holidays = [
  {
    hdate: "01-01-2023",
    holiday: "New Year Day",
  },
  {
    hdate: "15-01-2023",
    holiday: "Pongal",
  },
  {
    hdate: "16-01-2023",
    holiday: "Thiruvalluvar Day",
  },
  {
    hdate: "17-01-2023",
    holiday: "Uzhavar Thirunal",
  },
  {
    hdate: "26-01-2023",
    holiday: "Republic Day",
  },
  {
    hdate: "05-02-2023",
    holiday: "Thai Poosam",
  },
  {
    hdate: "22-03-2023",
    holiday: "Telugu New Year Day",
  },
  {
    hdate: "01-04-2023",
    holiday: "Annual closing of Accounts for Commercial Banks and Co-operative Banks",
  },
  {
    hdate: "04-04-2023",
    holiday: "Mahaveer Jayanthi",
  },
  {
    hdate: "07-04-2023",
    holiday: "Good Friday",
  },
  {
    hdate: "14-04-2023",
    holiday: "Tamil New Years Day and Dr.B.R.Ambedkars Birthday",
  },
  {
    hdate: "22-04-2023",
    holiday: "Ramzan (Idul Fitr)",
  },
  {
    hdate: "01-05-2023",
    holiday: "May Day",
  },
  {
    hdate: "29-06-2023",
    holiday: "Bakrid(Idul Azha)",
  },
  {
    hdate: "29-07-2023",
    holiday: "Muharram",
  },
  {
    hdate: "15-08-2023",
    holiday: "Independence Day",
  },
  {
    hdate: "06-09-2023",
    holiday: "Krishna Jayanthi",
  },
  {
    hdate: "17-09-2023",
    holiday: "Vinayakar Chathurthi",
  },
  {
    hdate: "28-09-2023",
    holiday: "Milad-un-Nabi",
  },
  {
    hdate: "02-10-2023",
    holiday: "Gandhi Jayanthi",
  },
  {
    hdate: "23-10-2023",
    holiday: "Ayutha Pooja",
  },
  {
    hdate: "24-10-2023",
    holiday: "Vijaya Dasami",
  },
  {
    hdate: "12-11-2023",
    holiday: "Deepavali",
  },
  {
    hdate: "25-12-2023",
    holiday: "Christmas",
  },
];

const calendar = document.querySelector("#calendar");
const monthBanner = document.querySelector("#month");
let navigation = 0;
let clicked = null;
let events = localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events")) : [];
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

async function loadCalendar() {
  userID = 1
  let formData = new FormData(); 
  formData.append('userId', userID); 

  const response = await fetch("https://softboxcollide.glitch.me/get_all_events_for_user", { 
    method: "POST", 
    mode: "cors", 
    body: formData
  }); 
 
  const result = await response.json(); 

  const dt = new Date();
  if (navigation != 0) {
    dt.setMonth(new Date().getMonth() + navigation);
  }
  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear(); 
  monthBanner.innerText = `${dt.toLocaleDateString("en-us", {
    month: "long",
  })} ${year}`;
  calendar.innerHTML = "";
  const dayInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayofMonth = new Date(year, month, 1);
  const dateText = firstDayofMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const dayString = dateText.split(", ")[0];
  const emptyDays = weekdays.indexOf(dayString);

  for (let i = 1; i <= dayInMonth + emptyDays; i++) {
    const dayBox = document.createElement("div");
    dayBox.classList.add("day");
    const monthVal = month + 1 < 10 ? "0" + (month + 1) : month + 1;
    const dateVal = i - emptyDays < 10 ? "0" + (i - emptyDays) : i - emptyDays;
    const dateText = `${dateVal}-${monthVal}-${year}`;
    if (i > emptyDays) {
      dayBox.innerText = i - emptyDays;
     
      if (i - emptyDays === day && navigation == 0) {
        dayBox.id = "currentDay";
      }
   
      // Add events to an array
      for (let i = 0; i < result.length; i++) {
        var userEvents = [{ eventID: result[i].eventid, eventName: result[i].name, eventDate: result[i].date}];       
        const userEventOfTheDay = userEvents.find((e) => e.eventDate == dateText);
     
        if (userEventOfTheDay){
           const eventDiv = document.createElement("div"); 
           eventDiv.classList.add("event"); 
           eventDiv.classList.add("userEvents"); 
           eventDiv.innerText = userEventOfTheDay.eventName; 
           dayBox.appendChild(eventDiv); 
        }
        // console.log(userEvents);
      }

      dayBox.addEventListener("click", () => {
        showModal(dateText);
      });
    } else {
      dayBox.classList.add("plain");
    }
    calendar.append(dayBox);
  }

  console.log("Loaded Events");
  console.log(result);
  return result; 

}
function buttons() {
  const btnBack = document.querySelector("#btnBack");
  const btnNext = document.querySelector("#btnNext");
  const btnDelete = document.querySelector("#btnDelete");
  const btnSave = document.querySelector("#btnSave");
  const closeButtons = document.querySelectorAll(".btnClose");
  const txtTitle = document.querySelector("#txtTitle");
  
  btnBack.addEventListener("click", () => {
    navigation--;
    loadCalendar();
  });
  btnNext.addEventListener("click", () => {
    navigation++;
    loadCalendar();
  });
  modal.addEventListener("click", closeModal);
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });
  btnDelete.addEventListener("click", async function () {

    let formData = new FormData(); 
    let userID = 1; 
    formData.append("userId", userID);    

    const response = await fetch("https://softboxcollide.glitch.me/get_all_events_for_user", { 
      method: "POST", 
      mode: "cors", 
      body: formData
    }); 

    const result = await response.json();
    console.log(result); 

    // Add all events to an array 
    for (let i = 0; i < result.length; i++)
    { 
      // Get all user events 
      userEvents = [{eventID: result[i].eventid, eventName: result[i].name, eventDate: result[i].date}];
      // Filter out all events that haven't been clicked 
      const eventClicked = userEvents.filter((e) => e.date !== clicked);
      // Only one event should remain that has been clicked
      const eventFound = eventClicked.find((e) => e.date == e.date);

      let formDataDel = new FormData(); 
      formDataDel.append("eventId", eventFound.eventID);
      console.log("Event found: " + eventFound.eventID);
      const responseDel = await fetch("https://softboxcollide.glitch.me/delete_event", { 
        method: "POST", 
        mode: "cors", 
        body: formDataDel
      });

      const delResult = await responseDel.json(); 
      console.log("Event Deleted successfully");
      console.log(delResult);    
      localStorage.setItem("events", JSON.stringify(events))  
    }
    closeModal();
    return result;     
  });
  // Code for saving an Event. 
  // JS to save would go in here 
  btnSave.addEventListener("click", async function () {
    if (txtTitle.value) {
      txtTitle.classList.remove("error");

      events.push({
        date: clicked,
        title: txtTitle.value.trim(),        
      });     

      let formData = new FormData(); 
      let userID = 1; 
      formData.append('userId', userID);
      formData.append('name', txtTitle.value); 
      formData.append('date', clicked); 

      const response = await fetch("http://softboxcollide.glitch.me/add_event", { 
        method: "POST", 
        mode: "cors", 
        body: formData
      }); 
      
      const result = await response.json(); 
      console.log(result); 
      console.log("Event added"); 


      txtTitle.value = "";
      //localStorage.setItem("events", JSON.stringify(events));
      closeModal();
    } else {
      txtTitle.classList.add("error");
    }
  });
}

const modal = document.querySelector("#modal");
const viewEventForm = document.querySelector("#viewEvent");
const addEventForm = document.querySelector("#addEvent");

function showModal(dateText) {
  clicked = dateText;
  const eventOfTheDay = events.find((e) => e.date == dateText);
  if (eventOfTheDay) {
    //Event already Preset
    document.querySelector("#eventText").innerText = eventOfTheDay.title;    
    viewEventForm.style.display = "block";
  } else {
    //Add new Event
    addEventForm.style.display = "block";
  }
  modal.style.display = "block";
}

//Close Modal
function closeModal() {
  viewEventForm.style.display = "none";
  addEventForm.style.display = "none";
  modal.style.display = "none";
  clicked = null;
  loadCalendar();
}

buttons();
loadCalendar();  