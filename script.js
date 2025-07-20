// ===== DOM ELEMENTS =====
const userlocation = document.getElementById('userLocation')
const search = document.querySelector('.fa-search')
const city = document.querySelector('.location')
const date = document.querySelector('.date')
const weathericon = document.querySelector('.weathericon')
const temperature = document.querySelector('.temperature')
const feelslike = document.querySelector('.feelslike')
const description = document.querySelector('.description')

// ===== VALUE FIELDS =====
const HValue = document.getElementById('HValue')
const WValue = document.getElementById('WValue') 
const CValue = document.getElementById('CValue')

// ===== WEATHER API CONFIG =====
const WEATHER_API_KEY = "a431e8d0b60f489d9e2173023251807";
const WEATHER_API_ENDPOINT = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&days=3&q=`;

// ===== MAIN FUNCTION =====
function findUserLocation() {
  const userInput = userlocation.value

  // Fetch data from Weather API
  fetch(WEATHER_API_ENDPOINT + userInput)
    .then(r => r.json())
    .then(data => {
      // If API returns error, alert and stop
      if (data.error) {
        alert(data.error.message)
        return
      }

      // Extract data from API response
      const region = data.location.name
      const country = data.location.country
      const thedate = data.location.localtime 
      const temp = data.current.temp_c
      const fl = data.current.feelslike_c
      const des = data.current.condition.text
      const hum = data.current.humidity + "%"
      const wind = data.current.wind_kph + " km/h"
      const cloud = data.current.cloud + "%"

      // Update DOM
      city.innerHTML = `${region}, ${country}`
      date.innerHTML = thedate
      temperature.innerHTML = temp + "°C"
      feelslike.innerHTML = `Feels like: <strong>${fl}°C</strong>`
      description.innerHTML = des
      HValue.innerHTML = hum
      WValue.innerHTML = wind
      CValue.innerHTML = cloud

      // Set weather icon
      const iconURL = 'https:' + data.current.condition.icon	
      weathericon.style.backgroundImage = `url(${iconURL})`
      weathericon.style.backgroundRepeat = `no-repeat`
      weathericon.style.backgroundSize = `contain`
      weathericon.style.backgroundPosition = `center`
    })
}

// ===== EVENT LISTENERS =====
// On search icon click
search.addEventListener('click', () => {
  findUserLocation()
})

// On Enter key press
userlocation.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    findUserLocation()
  }
})

// Accessibility
userlocation.tabIndex = 0

