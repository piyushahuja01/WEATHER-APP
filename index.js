
const cityName = document.querySelector("#cityName");
const searchCity = document.querySelector("#searchCity");
const btn = document.querySelector("#btn");

const API_KEY = "8875f59985620e2c424c4875c5c465b3";

async function fetchWeather(city = "delhi") {
    try {
        btn.textContent = "Loading...";

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            btn.textContent = "Search";
            return;
        }

        const weather = data.list[0];
        document.querySelector("#feelsLike").textContent =
            "Feels like " + Math.round(weather.main.feels_like) + "°C";
        document.querySelector("#weatherCity").textContent = data.city.name;
        document.querySelector("#temperature").textContent =
            Math.round(weather.main.temp) + "°C";
        document.querySelector("#description").textContent =
            weather.weather[0].description;
        document.querySelector("#humidity").textContent =
            weather.main.humidity + "%";
        document.querySelector("#wind").textContent =
            (weather.wind.speed * 3.6).toFixed(1) + " km/h";
        document.querySelector("#pressure").textContent =
            weather.main.pressure + " hPa";
        document.querySelector("#visibility").textContent =
            (weather.visibility / 1000) + " km";

        const forecast = document.querySelector("#forecast");
        forecast.innerHTML = "";

        for (let i = 0; i < data.list.length; i += 8) {
            const item = data.list[i];
            const day = new Date(item.dt_txt).toLocaleDateString("en-US", {
                weekday: "long"
            });

            forecast.innerHTML += `
                <div class="grid grid-cols-3 items-center py-3 gap-2">
                    <span class="text-left">${day}</span>
                    <span class="text-center text-slate-500 capitalize">${item.weather[0].description}</span>
                    <span class="text-right font-medium">${Math.round(item.main.temp)}°C</span>
                </div>
            `;
        }

        btn.textContent = "Search";

    } catch (error) {
        console.log(error);
        alert("Something went wrong!");
        btn.textContent = "Search";
    }
}
fetchWeather();
searchCity.addEventListener("submit", (e) => {
    e.preventDefault();

    const city = cityName.value.trim();

    if (city) {
        fetchWeather(city);
    }
});
