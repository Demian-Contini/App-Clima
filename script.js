// Constantes globales
const urlBase= `https://api.openweathermap.org/data/2.5/weather`
const API_KEY= '21e2816742d266b46510619a21e9f3ef'
const diffKelvin = 273.15

// Evento del botón de búsqueda
document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if(city){
        fetchWeather(city)
        // Llamar API para Info
    }else{
        alert('Ingrese una ciudad válida')
    }
})

// Función que consulta la API
function fetchWeather(city){
    fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
    .then(data => data.json())
    .then(data => showWeatherData(data))
}

// Función que muestra los datos en pantalla
function showWeatherData(data){
    const divResponseData = document.getElementById('responseData')
    divResponseData.innerHTML = '' // Se inicializa en vacio o limpia resultados previos

// --- Datos básicos ---
    const cityName = data.name
    const countryName = data.sys.country
    const temp = data.main.temp
    const humidity = data.main.humidity
    const description = data.weather[0].description
    const icon = data.weather[0].icon
    const wind = data.wind.speed
    const feelsLike = data.main.feels_like

// --- Elementos HTML ---
    const cityInfo = document.createElement('h2')
    cityInfo.textContent = `${cityName}, ${countryName}`

    const tempInfo = document.createElement('p')
    tempInfo.textContent = `Temperatura: ${Math.floor(temp-diffKelvin)}ºC`// ${Math.floor(temp-diffKelvin)} Hace un redondeo hacia abajo

    const windInfo = document.createElement('p')
    windInfo.textContent = `Viento: ${Math.floor(wind * 3.6)} km/h` // convertimos de m/s a km/h

    const feelsLikeInfo = document.createElement('p')
    feelsLikeInfo.textContent = `Sensación térmica: ${Math.floor(feelsLike - diffKelvin)}ºC`

    const humidityInfo = document.createElement('p')
    humidityInfo.textContent = `Humedad: ${humidity}%`

    const icoInfo = document.createElement('img') //Agregamos imagen
    icoInfo.src = `https://openweathermap.org/img/wn/${icon}@2x.png`

    const descriptionInfo = document.createElement('p')
    descriptionInfo.textContent = `Estado: ${description}`
    
 // --- Agregar todo al div ---
    divResponseData.appendChild(cityInfo)
    divResponseData.appendChild(icoInfo)
    divResponseData.appendChild(descriptionInfo)
    divResponseData.appendChild(tempInfo)
    divResponseData.appendChild(feelsLikeInfo)
    divResponseData.appendChild(humidityInfo)
    divResponseData.appendChild(windInfo)
}