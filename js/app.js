// MATERIALIZE
$(document).ready(function() {
    // Side nav
    $('.sidenav').sidenav({edge: 'right'});
    // Material box
    $('.materialboxed').materialbox();
    // Tooltips
    $('.tooltipped').tooltip();
    // Carousel slider
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
      }); 
      
    setInterval( ()=> {
        $('.carousel').carousel('next');
      }, 4000);
  });

// Fetch API
  function getCountry(e) {
    e.preventDefault();
    const query = document.getElementById('country-name').value;
    fetch(`https://disease.sh/v3/covid-19/countries/${query}`)
    .then (response => response.json())
    .then(countryResults)
    .catch(failedResults);
  };
// Catch Function
  function failedResults() {
    const results = document.getElementById('search-results');
    const query = document.getElementById('country-name').value;

    results.innerHTML = `<h4>Sorry, we cannot identify your input. Please try again.</h4>`
// Easteregg
    if(query === 'WAKANDA')
    results.innerHTML = `<img src="media/king.gif" class="responsive-img"><p>Long live the King! Wakanda Forevah!</p>`
  }
// Then Function
  function countryResults(data) {
    const results = document.getElementById('search-results');
    const clear = document.getElementById('country-name');

    // Clearing the search bar
    clear.value='';
    // Displaying the results
    results.innerHTML = `    
    <div class="row">
        <div class="col s12 m4">
          <div class="card-panel grey lighten-2 center-align">
              <img id="flag" src="${data.countryInfo.flag}" class="responsive-img">
          </div>
        </div>

        <div class="col s12 m8">
          <div class="card-panel center-align">
              <h4>${data.country} (${data.countryInfo.iso2})</h4>
              <h6 class="center-align"><i>${data.continent} | Population: ${data.population.toLocaleString("en")}</i></h6>
              <div style="height: 10px;"></div>
          </div>
        </div>
    </div>

    <div class="row">
      <div class="col s12 m3">
        <div class="card-panel"><h6 class="center-align">Total Number of Cases:</h6> <h5 class="center-align" style="font-weight: bold;">${data.cases.toLocaleString("en")}</h6></div>
      </div>

      <div class="col s12 m3">
        <div class="card-panel"><h6 class="center-align">Number of Active Cases:</h6> <h5 class="center-align" style="font-weight: bold;">${data.active.toLocaleString("en")}</h6></div>
      </div>

      <div class="col s12 m3">
        <div class="card-panel"><h6 class="center-align">Total Number of Deaths:</h6> <h5 class="center-align" style="font-weight: bold;">${data.deaths.toLocaleString("en")}</h6></div>
      </div>

      <div class="col s12 m3">
        <div class="card-panel"><h6 class="center-align">Number of Recoveries:</h6> <h5 class="center-align" style="font-weight: bold;">${data.recovered.toLocaleString("en")}</h6></div>
      </div>

    </div>
    <p class="center-align"><a href="search.html" class="reset btn red">Reset</a> <br><br>
    <i>Data API used is from <a href="https://disease.sh/" target="_blank">disease.sh - Open Disease Data</i></a></p>
  </div>
  `
  };

// Load Function
  function loadPage() {
  const form = document.getElementById('search-form');
  form.addEventListener('submit', getCountry);
  };
  
  window.addEventListener('load', loadPage);