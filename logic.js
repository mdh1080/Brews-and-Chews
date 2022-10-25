//function to fetch first api

function grabBrewery (cityName) {
    var url = `https://api.openbrewerydb.org/breweries?by_city=${cityName}&per_page=3&units=imperial`
    fetch(url)
    .then(response => response.json())
    .then(data => {console.log(data)
        var breweryCity = document.querySelector('.city')
        var breweryAddress = document.querySelector('.street')
        var breweryWebsite = document.querySelector('.website')
        var breweryLocation = data[0].street
        var breweryUrl = data[0].website_url
        var breweryCityTwo = data[0].city
        breweryCity.textContent += breweryCityTwo
        breweryAddress.textContent += breweryLocation
        breweryWebsite.textContent += breweryUrl
})
}

//button function
var searchButton = document.querySelector("#searchBtn")
searchButton.addEventListener('click', function() {
    var searchText = document.querySelector("#searchBox")
    var cityName = searchText.value
    grabBrewery(cityName)
})