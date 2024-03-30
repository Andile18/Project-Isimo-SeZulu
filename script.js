function submitSearchHandle(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let cityEelement = document.querySelector("#app-city");
    cityEelement.innerHTML = searchInput.value
}


let searchFormElement= document.querySelector("#search-form");
searchFormElement.addEventListener("submit", submitSearchHandle);
