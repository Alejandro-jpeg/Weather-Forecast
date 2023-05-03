let apiKey = 'e7eee4fd93fbef038bf4a28dff8a59c7';
let submit = document.getElementById('search-button');
let featuredCity = document.getElementById('selected-city');
let historyContainer = document.getElementById('search-history');

//This function allows the user to search for a city and doesnt allow the program to run if there is no city selected
let city;
function searchCity(event){
    event.preventDefault;
    city = document.getElementById('city-input').value;
    if(!city){
        return
        /*TODO: ADD A WARNING TO THE USER*/
    }
    localStorage.setItem(city, city);
    startSearch();
    createHistoryBtn(city);
}

//creating search history buttons
function createHistoryBtn(city){
    city = localStorage.getItem(city);
    let historyButton = document.createElement('button');
    historyButton.classList.add('history-button');
    historyButton.textContent = city;
    historyContainer.appendChild(historyButton);
    historyButton.addEventListener('click',startSearch(city));
}

//This function calls the API and it calls the other 2 functions
function startSearch(){
    let weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + '&units=metric';

    fetch(weatherUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            displayCity(data);
            createCards(data);
        })
}

//This function displays the selected city on a big "header"
function displayCity(data){
    let cityDate = document.getElementById('city-name');
    let temp = document.getElementById('temp');
    let wind = document.getElementById('wind');
    let humidity = document.getElementById('humidity');

    cityDate.textContent = data.city.name;
    temp.textContent = "Temperature: " + data.list[0].main.temp + " °C";
    wind.textContent = "Wind Velocity: " + data.list[0].wind.speed + " m/s";
    humidity.textContent = "Humidity: " + data.list[0].main.humidity + " %";
}

//This function dynamically creates cards for the following 5 days
function createCards(data){
    let today = data.list[0].dt;
    let tomorrow = 86400; //24 hours in UNIX time
    let cardHolder = document.getElementById('card-holder')
    cardHolder.textContent = '';

    for(var i= 0; i < data.list.length; i++){
        if(data.list[i].dt === today + tomorrow || data.list[i].dt === today){

           let card = document.createElement("div");
           card.classList.add('card')

           let cityDate = document.createElement("p");
           cityDate.setAttribute("id","city-date")
           cityDate.classList.add('city-dame');
           cityDate.textContent = data.list[i].dt_txt;

           let icon = document.createElement("img");
           let iconId = data.list[i].weather[0].icon
           let iconSource = "https://openweathermap.org/img/wn/" + iconId + "@2x.png"
           icon.setAttribute("id","icon");
           icon.setAttribute('src', iconSource);
           icon.classList.add('icon');

           let temp = document.createElement("p");
           temp.setAttribute("id","temp");
           temp.classList.add("temperatrue");
           temp.textContent = "Temperature: " + data.list[i].main.temp + " °C";

           let wind = document.createElement("p");
           wind.setAttribute("id","wind")
           wind.classList.add("wind");
           wind.textContent = "Wind Velocity: " + data.list[i].wind.speed + " m/s";

           let humidity = document.createElement("p");
           humidity.setAttribute("id","humidity");
           humidity.classList.add("humidity")
           humidity.textContent = "Humidity: " + data.list[i].main.humidity + " %";

           cardHolder.appendChild(card);
           card.appendChild(cityDate);
           card.appendChild(icon);
           card.appendChild(temp);
           card.appendChild(wind);
           card.appendChild(humidity);

            today = today + tomorrow;
        }
    }
}


submit.addEventListener('click',searchCity);

