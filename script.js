function updateWeatherPercent(response){

    let temperatureElement =  document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#app-city");
   
   cityElement.innerHTML = response.data.city;
   temperatureElement.innerHTML = Math.round(temperature);
   
  
}




function searchCity (city){
let apiKey = "2tb5293558cf27710004o841aef8f671";
let apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
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