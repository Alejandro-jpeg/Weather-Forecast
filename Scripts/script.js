let apiKey = 'e7eee4fd93fbef038bf4a28dff8a59c7';
let submit = document.getElementById('search-button');


let city;

function searchCity(){
    city = document.getElementById('city-input').value;
    if(!city){
        return
        /*ADD A WARNING TO THE USER*/
    }
    startSearch();
}

function startSearch(){
    let weatherUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

    fetch(weatherUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data)
        })   
}

submit.addEventListener('click',searchCity)



