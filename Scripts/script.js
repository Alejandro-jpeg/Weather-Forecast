let apiKey = 'e7eee4fd93fbef038bf4a28dff8a59c7';
let submit = document.getElementById('search-button');


//This function allows the user to search for a city and doesnt allow the program to run if there is no city selected
let city;
function searchCity(){
    city = document.getElementById('city-input').value;
    if(!city){
        return
        /*TODO: ADD A WARNING TO THE USER*/
    }
    startSearch();
    //TODO: CREATE A HISTORY SEARCH BUTTON
    //TODO: SAVE SEARCHED CITY IN LOCAL STORAGE
}

    //TODO: ADD A FUNCTION THAT CLEARS THE CONTENT OF THE PAGE ON SUMBMIT CLICK

//This function calls the API and it calls the other 2 functions
function startSearch(){
    let weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + '&units=metric';

    fetch(weatherUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            displayCity(data);
            console.log(data.list[0]);
            createCards(data);
        })
}

//This function displays the current weather on the top of the cards
function displayCity(data){
    let cityName = document.getElementById('city-name');
    let temp = document.getElementById('temp');
    let wind = document.getElementById('wind');
    let humidity = document.getElementById('humidity');

    cityName.textContent = data.city.name;
    temp.textContent = "Temperature: " + data.list[0].main.temp + " °C";
    wind.textContent = "Wind Velocity: " + data.list[0].wind.speed + " m/s";
    humidity.textContent = "Humidity: " + data.list[0].main.humidity + " %";
}


//This function dynamically creates cards for the following 5 days
function createCards(data){
    let today = data.list[0].dt;
    let tomorrow = 86400; //24 hours in UNIX time
    let cardHolder = document.getElementById('card-holder')

    for(var i= 0; i < data.list.length; i++){
        if(data.list[i].dt === today + tomorrow || data.list[i].dt === today){

           let card = document.createElement("div");
           card.classList.add('card')

           let cityName = document.createElement("p");
           cityName.setAttribute("id","city-name")
           cityName.classList.add('city-name');
           cityName.textContent = data.city.name +" "+ data.list[i].dt_txt;

           let icon = document.createElement("p");
           icon.setAttribute("id","icon");
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
           card.appendChild(cityName);
           card.appendChild(icon);
           card.appendChild(temp);
           card.appendChild(wind);
           card.appendChild(humidity);

            console.log(data.list[i]);
            today = today + tomorrow;
        }
    }
}


submit.addEventListener('click',searchCity);

