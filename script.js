function updateWeatherPercent(response){

    let temperatureElement =  document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let speedElement = document.querySelector("#speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector ("#icon")


   
   cityElement.innerHTML = response.data.city;
   descriptionElement= response.data.condition.description;
   humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
   timeElement.innerHTML = formattedDate(date);
   speedElement.innerHTML= `${response.data.wind.speed}km/h`;
   temperatureElement.innerHTML = Math.round(temperature);
   
   iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
   getForecast(response.data.city);
}



function getForecast(city) {
    let apiKey = "2tb5293558cf27710004o841aef8f671";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
  }


function displayForecast(response) {
    console.log(response.data);
  
    
    let forecastHtml = "";
  
    response.data.daily.forEach(function (day, index) {
        if (index < 6) {
       
      forecastHtml =
        forecastHtml +
        `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date"> ${formatDay(day.time)} </div>
          
          <img src = "${day.condition.icon_url}" class="weather-forecast-icon"> 
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}º</strong>
            </div>
            <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}º</div>
          </div>
        </div>
      `;
    }
    });
  
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
  }
  

  function formatDay (timestamp) {
    let date = new Date(timestamp  * 1000)
    let days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

      return days[date.getDay()];

  }

function searchCity (city){
let apiKey = "2tb5293558cf27710004o841aef8f671";
let apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(updateWeatherPercent); 
}



function submitSearchHandle(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
   
    
    searchCity(searchInput.value);
}
   



let searchFormElement= document.querySelector("#search-form");
searchFormElement.addEventListener("submit", submitSearchHandle);

searchCity ("Cape Town");


function formattedDate (date){
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    let minutes = date.getMinutes();
    let hours = date.getHours();

    if (minutes < 10) {
        minutes =` 0${minutes}`;
    

if (hours <10 ){
    hours = ` 0${hours}`
}
    }


     return  `${day} ${hours} : ${minutes}`
}