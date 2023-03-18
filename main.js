// Objeto que almacena la clave de la API y la URL base de la API de OpenWeatherMap
const api = {
    key: '512b2f54eeaf5b63ad278fe3dd592b70',
    url: 'https://api.openweathermap.org/data/2.5/weather'
}

// Variables que hacen referencia a varios elementos HTML
const city = document.getElementById('city');
const date = document.getElementById('date');
const tempImg = document.getElementById('temp-img');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const range = document.getElementById('range');

// Variable que hace referencia a la tarjeta que muestra toda la información
const card = document.getElementById('card');

// Función que actualiza la imagen de temperatura según la temperatura actual
function updateImage(data) {
    const temp = toCelsius(data.main.temp);
    let src = 'images/temp-mid.png';
    if (temp > 26){
        src = 'images/temp-high.png';
    } else if (temp < 20) {
        src = 'images/temp-low.png'
    }
    tempImg.src = src
}

// Función asíncrona que utiliza la función fetch() para obtener los datos meteorológicos de OpenWeatherMap
async function search(query){
    try {
        const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
        const data = await response.json();
        
        // Actualización de los elementos HTML con la información relevante
        city.innerHTML = `${data.name}, ${data.sys.country}`;
        date.innerHTML = (new Date()).toLocaleDateString();
        temp.innerHTML = `${toCelsius(data.main.temp)} c°`;
        weather.innerHTML = data.weather[0].description;
        range.innerHTML = ` ${toCelsius(data.main.temp_min)} c° / ${toCelsius(data.main.temp_max)} c°`;
        updateImage(data);
        // Mostrar la tarjeta de información que se encuentra oculta
        card.style.display = 'block';
    } catch(err){
        console.log(err);
        alert('Hubo un error')
    }
}

// Función que convierte la temperatura de Kelvin a Celsius
function toCelsius(kelvin) {
    return Math.round(kelvin - 273.15)
}

// Función que se ejecuta cuando se envía el formulario de búsqueda
function onSubmit(event){
    event.preventDefault();
    // Llamada a la función search() con el valor del cuadro de búsqueda como parámetro
    search(searchbox.value)
}

// Variable que hace referencia al formulario de búsqueda HTML
const form = document.getElementById('search-form');
// Variable que hace referencia al cuadro de búsqueda HTML
const searchbox = document.getElementById('searchbox');
// Agregar un escucha de eventos al formulario HTML para detectar cuando se envía el formulario y llamar a la función onSubmit()
form.addEventListener('submit', onSubmit, true)