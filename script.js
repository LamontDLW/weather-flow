let weather = {
    "apiKey": "09cbed592f77b9d86c33759943c3dbbe",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=imperial&appid="
            + this.apiKey
        ).then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, pressure, temp_max, temp_min, humidity, feels_like } = data.main;
        const  { speed } = data.wind;
        console.log(data)
        console.log(name, icon, description, temp, pressure, temp_max, temp_min, humidity, speed)

        document.querySelector(".city-name").textContent = name;
        document.querySelector(".city-temp").textContent = Math.floor(temp) + "°";
        document.querySelector(".high-temp").textContent = "HIGH: " + Math.floor(temp_max) + "°";
        document.querySelector(".low-temp").textContent = "LOW: " + Math.floor(temp_min) + "°";
        document.querySelector(".description").textContent = description + " Right Now";
        document.querySelector(".humidity").textContent = Math.floor(humidity) + "%";
        document.querySelector(".feels-like").textContent = Math.floor(feels_like) + "°";

        function compareFeelsLikeTemp() {
            if ( Math.floor(feels_like) > Math.floor(temp) ) { document.querySelector(".feli-desc").textContent = "Feels much warmer than it actually is";
            } else { document.querySelector(".feli-desc").textContent = "Feels much colder than it is outside"; }
        };
        compareFeelsLikeTemp();
        
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value)
    }
};

document
.querySelector(".search-bar")
.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        weather.search()
    }
});

weather.fetchWeather("Toronto")