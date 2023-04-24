let apiKey = 'e7eee4fd93fbef038bf4a28dff8a59c7';
let submit = document.getElementById('search-button');

let city;

function searchCity(){
    city = document.getElementById('city-input').value;
    if(!city){
        return
        /*TODO: ADD A WARNING TO THE USER*/
    }
    startSearch();
    //TODO: CREATE A HISTORY SEARCH BUTTON
}

function startSearch(){
    let weatherUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

    fetch(weatherUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            displayCity(data);
            let today = data.list[0].dt;
            let tomorrow = 86400; //24 hours in UNIX time
            console.log(data.list[0]);

            for(var i= 0; i < data.list.length; i++){

                if(data.list[i].dt === today + tomorrow){
                    console.log(data.list[i]);
                    today = today + tomorrow;
                }
            }
        })
}

//TODO: METRIC SYSTEM
function displayCity(data){
    let cityName = document.getElementById('city-name');
    let temp = document.getElementById('temp');
    let wind = document.getElementById('wind');
    let humidity = document.getElementById('humidity');

    console.log(data);
    cityName.textContent = data.city.name;
    temp.textContent = "Temperature: " + data.list[0].main.temp;
    wind.textContent = "Wind Velocity: " + data.list[0].wind.speed;
    humidity.textContent = "Humidity: " + data.list[0].main.humidity;
}


//TODO: OTRA FUNCION PARA CREAR CARDS CON INFORMACION DE CADA UNO DE LOS DÍAS

submit.addEventListener('click',searchCity)
