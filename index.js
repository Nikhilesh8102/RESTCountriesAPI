const countriesContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-container input')
const themeChanger = document.querySelector('.theme-changer')

let allCountriesData;


function applyModePreference() {
  const modePreference = getModePreference();
  if (modePreference === 'dark') {
      document.body.classList.add('dark');
  } else {
      document.body.classList.remove('dark');
  }
}

// Apply the mode preference when the page loads
window.addEventListener('DOMContentLoaded', applyModePreference);


fetch('https://restcountries.com/v3.1/all')
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data)
    allCountriesData = data
  })

filterByRegion.addEventListener('change', (e) => {
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries)
})

function renderCountries(data) {
  countriesContainer.innerHTML = ''
  data.forEach((country) => {
    const countryCard = document.createElement('a')
    countryCard.classList.add('country-card')
    countryCard.href = `./country.html?name=${country.name.common}`
    countryCard.innerHTML = `
        <div class="wrapper">
          <img src="${country.flags.svg}" alt="${country.name.common} flag" />
          <div class="spacer"></div>
        </div>  
          <div class="card-text">
              <h3 class="card-title">${country.name.common}</h3>
              <p><b>Population: </b>${country.population.toLocaleString(
                'en-IN'
              )}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Capital: </b>${country.capital?.[0]}</p>
          </div>
  `
    countriesContainer.append(countryCard)
  })
}


searchInput.addEventListener('input',  (e) => {
  const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
  renderCountries(filteredCountries)
})

themeChanger.addEventListener('click', () => {
  document.body.classList.toggle('dark')
  if(document.body.classList.contains('dark')){
  saveModePreference('dark');
  }
  else{
    saveModePreference('light');
  }
  
})

// Function to save the mode preference to localStorage
function saveModePreference(mode) {
  localStorage.setItem('mode', mode);
}

// Function to retrieve the mode preference from localStorage
function getModePreference() {
  return localStorage.getItem('mode');
}







