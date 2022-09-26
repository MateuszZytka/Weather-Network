let weather = {
    "apikey": "35a55f32ca0b9555d78059eeffda6096",
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
             + city
              + "&units=metric&appid=" 
              + this.apikey
        )
        .then((response) => {
            if (!response.ok) {
              alert("No weather found.");
              throw new Error("No weather found.");
            }
            return response.json();
          })
          .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0]
        const { temp, humidity} = data.main
        const { speed } = data.wind
        console.log(name, icon, description, temp, humidity, speed)
        document.querySelector("#city").innerText = name
        document.querySelector("#icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector("#temp").innerText = "Temp :" + temp + "°C"
        document.querySelector("#humidity").innerText = "Humidity: " + humidity + " %"
        document.querySelector("#speed").innerText = "Wind Speed: " + speed + " Km/H"

    },
    search: function () {
        this.fetchWeather(document.querySelector("#searchBar").value)
    }
}

document.querySelector("#search").addEventListener("click", function(){
    weather.search()
})

weather.fetchWeather("Atlanta")