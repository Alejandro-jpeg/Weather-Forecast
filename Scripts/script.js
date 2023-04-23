
let weatherUrl = 'api.openweathermap.org/data/2.5/forecast?q=Toluca&appid=e7eee4fd93fbef038bf4a28dff8a59c7'; 

fetch(weatherUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)
    });