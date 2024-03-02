async function getWeather(city) {
  //Write you code logic here

  // Error should be very specific
  // Error: Failed to fetch weather data,   should always fetch this error in case of any failure otherwise you test cases will get failed.

  const API_KEY = "0cce174fa93ce03a582e635ddbf39d3f";
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  const weatherElement = document.querySelector("#weather-data");


  await fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      const { name, main, visibility, wind, weather } = data;
      const temperature = main?.temp;
      const description = weather[0]?.description;
      const windSpeed = wind?.speed;

      const weatherContent = `
      <p>City: ${name} </p>
      <p>Temp: ${temperature} °C</p>
      <p>Visibility: ${visibility} </p>
      <p>Wind Speed: ${windSpeed} KMPH </p>
      <p>Weather: ${description} </p>
    `;

      weatherElement.innerHTML = weatherContent;
    })
    .catch((error) => {
      const weatherContent = `
      <p class='error-msg'>Error: City not found </p>
    `;
      weatherElement.innerHTML = weatherContent;
      setTimeout(() => {
        weatherElement.innerHTML = '';
        weatherElement.classList.toggle('isOpen');
      }, 2000);
    });

    weatherElement.classList.toggle('isOpen');
}

// submit event of form
document.getElementById("location-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const inputElement = document.querySelector("#location-input")
  const text = inputElement.value;
  inputElement.value = "";
  getWeather(text);
});

function handleOnChange(e){
  if(e.value.length === 0){
    const weatherElement = document.querySelector("#weather-data");
    weatherElement.innerHTML = "";
    weatherElement.classList.toggle('isOpen');
  }
}

const inputElement = document.getElementById('location-input');
inputElement.addEventListener('focus', () => {
  const weatherElement = document.querySelector("#weather-data");
  weatherElement.classList.remove('isOpen')
})
