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
        document.querySelector(".city-temp").textContent = Math.floor(temp);
        document.querySelector(".high-temp").textContent = Math.floor(temp_max)
        document.querySelector(".low-temp").textContent = Math.floor(temp_min)
        document.querySelector(".description").textContent = description
        document.querySelector(".humidity-per").textContent = Math.floor(humidity)
        document.querySelector(".feel-like").textContent = Math.floor(feels_like)
        document.querySelector(".pressure-per").textContent = Math.floor(pressure)
        document.querySelector(".wind-per").textContent = Math.floor(speed)

        function compareFeelsLikeTemp() {
            if ( Math.floor(feels_like) > Math.floor(temp) ) { document.querySelector(".feli-desc").textContent = "Feels warmer than it is";
            } else { document.querySelector(".feli-desc").textContent = "Feels cooler than it is"; }
        };
        compareFeelsLikeTemp();

        function humidityChart() {
            // 0 - 30 (low humidity)
            // 30 - 60 (fair humidity)
            // 60-90 (high humidity)
            if (humidity >= 0 && humidity <= 30) {
                document.querySelector(".hum-desc").textContent = "Low humidity today";
            } else if (humidity >= 30 && humidity <= 60) {
                document.querySelector(".hum-desc").textContent = "It's fair today";
            } else if (humidity >= 60 && humidity <= 100) {
                document.querySelector(".hum-desc").textContent = "Very high today";
            } else {
                console.log("..")
            }
        };
        humidityChart();
        
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
        document.querySelector('.search-bar').value=null;
    }
});

weather.fetchWeather("Toronto")