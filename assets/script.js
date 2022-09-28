//variables defined

const apikey = "35a55f32ca0b9555d78059eeffda6096"
let timeDisplayEl = $('#date');
let timeDisplayEl1 = $('#date1');
let timeDisplayEl2= $('#date2');
let timeDisplayEl3 = $('#date3');
let timeDisplayEl4 = $('#date4');
let timeDisplayEl5 = $('#date5');
let cityArr = []
let cityList = document.querySelector("#list")
let firstCity = document.querySelector("#atlanta")

//gets dates and displays dates in html
function displayTime() {
    var rightNow = moment().format('MMM DD, YYYY a');
    let day1Date = moment().add(1, 'days').format('MM-DD-YYYY')
    let day2Date = moment().add(2, 'days').format('MM-DD-YYYY')
    let day3Date = moment().add(3, 'days').format('MM-DD-YYYY')
    let day4Date = moment().add(4, 'days').format('MM-DD-YYYY')
    let day5Date = moment().add(5, 'days').format('MM-DD-YYYY')
    timeDisplayEl.text(rightNow);
    timeDisplayEl1.text(day1Date);
    timeDisplayEl2.text(day2Date);
    timeDisplayEl3.text(day3Date);
    timeDisplayEl4.text(day4Date);
    timeDisplayEl5.text(day5Date);

  }

const weather = {
    //function fetches for data from API
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
             + city
              + "&units=metric&appid=" 
              + apikey
        )
        .then((response) => {
            if (!response.ok) {
              alert("No weather found.");
              throw new Error("No weather found.");
            }
            //gets response and returns it as a JSON object
            return response.json();
          })
          //pushes data to the next function
          .then((data) => this.displayWeather(data))
    },
    //data is used to get information needed and assigned to variables, then pushed to html
    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0]
        const { temp, humidity} = data.main
        const { speed } = data.wind
        document.querySelector("#city").innerText = name
        document.querySelector("#icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector("#temp").innerText = "Temp :" + temp + "°C"
        document.querySelector("#humidity").innerText = "Humidity: " + humidity + " %"
        document.querySelector("#speed").innerText = "Wind Speed: " + speed + " Km/H"

    },
    search: function () {
        this.fetchWeather(document.querySelector("#searchBar").value)
    },
    forecast: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/forecast?q="
             + city
            + "&units=metric&appid="
            + apikey
        )
        .then((response) => {
            if (!response.ok) {
              alert("No weather found.");
              throw new Error("No weather found.");
            }
            return response.json();
          })

        .then(function(data){
           
            for (let i = 2, j = 1; i < 41, j < 6; i = i + 8, j++){
                
                const { icon } = data.list[i].weather[0]
                const { temp, humidity} = data.list[i].main
                const { speed } = data.list[i].wind
                document.querySelector("#icon" + [j]).src = "https://openweathermap.org/img/wn/" + icon + ".png";
                document.querySelector("#temp" + [j]).innerText = "Temp :" + temp + "°C"
                document.querySelector("#humidity" + [j]).innerText = "Humidity: " + humidity + " %"
                document.querySelector("#speed" + [j]).innerText = "Wind Speed: " + speed + " Km/H"
            }
        });
    },
    searchforecast: function () {
        this.forecast(document.querySelector("#searchBar").value)
    }
}

function storeCity() {
    cityArr.unshift(document.querySelector("#searchBar").value)
    localStorage.setItem("city", JSON.stringify(cityArr));
}

//event listner that calls functions to search for cuurent weathr and 5 day forecast, creates a list item, appends said list item and adds event listener to list item
document.querySelector("#search").addEventListener("click", function(){
    //stores city that was called
    storeCity(document.querySelector("#searchBar").value)
    //creates list item, fills in list item content and adds event listener, and appends to list in html
    li = document.createElement('li')
    li.textContent = cityArr[0]
    li.addEventListener("click", function(){
        let listedCity = event.target.innerHTML
        weather.fetchWeather(listedCity)
        weather.forecast(listedCity)
    })
    cityList.appendChild(li)
    //calls functions to search for weather data
    weather.search()
    weather.searchforecast()
})

//same event listner as above but the event is submit
document.querySelector("#searchBar").addEventListener("search", function(){

    storeCity(document.querySelector("#searchBar").value)
    li = document.createElement('li')
    li.textContent = cityArr[0]
    li.addEventListener("click", function(){
        let listedCity = event.target.innerHTML
        weather.fetchWeather(listedCity)
        weather.forecast(listedCity)
    })
    cityList.appendChild(li)
    weather.search()
    weather.searchforecast()
})

//eventlistener added for the fisrt search which is preloaded
firstCity.addEventListener("click", function(){
    weather.fetchWeather("Atlanta")
    weather.forecast("Atlanta")
})

//functions to call at the start, displaying time, currenta nd 5 day forecast for Atlanta
displayTime()
weather.fetchWeather("Atlanta")
weather.forecast("Atlanta")
