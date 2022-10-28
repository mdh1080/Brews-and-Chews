var apiKey = "8T96biN_soJ158_Zo0WNfmegfEY7wDZOcI9jZ6XrJ96KGP5kc0r8CKFyfFvPth6MkupMniKAspgfIbNvNty3zXz17BZvpVhhIWOc9i2BsjjbRmFOAc7FwUtx0W1YY3Yx"
var addressLat = ""
var addressLong = ""

//function to fetch first api (brewery)
function grabBrewery (addressLat, addressLong) {


    var url = `https://api.openbrewerydb.org/breweries?by_dist=${addressLat},${addressLong}&per_page=3`
    fetch(url)
    .then(response => response.json())
    .then(data => {console.log(data)
        var breweryCity = document.querySelector('.city')
        var breweryAddress = document.querySelector('.street')
        var breweryWebsite = document.querySelector('.website')
        var breweryName = document.querySelector('.brewName')
        var breweryPhone = document.querySelector('.brewPhone')
        var breweryLocation = data[0].street
        var breweryUrl = data[0].website_url
        var breweryCityTwo = data[0].city
        var breweryNameTwo = data[0].name
        var breweryPhoneTwo = data[0].phone




        breweryName.textContent = breweryNameTwo
        breweryPhone.textContent = breweryPhoneTwo
        breweryCity.textContent = breweryCityTwo
        breweryAddress.textContent = breweryLocation
        breweryWebsite.textContent = breweryUrl
})
}

//button function
var searchButton = document.querySelector("#searchBtn")
searchButton.addEventListener('click', function() {
    var searchText = document.querySelector("#searchBox")
    var cityName = searchText.value
   
    grabRestaurant(cityName)
})

//function to fetch second api (restaurant)
//check is_closed:true
function grabRestaurant (cityName) {
    var url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?&location=${cityName}&categories=restaurants&open_now=true&per_page=3`
    var bug = {Authorization:'Bearer ' + apiKey,"Access-Control-Allow-Origin": "*",}
    fetch(url, {headers: bug})
    .then(response => response.json())
    .then(data => {console.log(data)
        var restaurantName = document.querySelector('.name')
        var restaurantCity = document.querySelector('.restCity')
        var restaurantAddress = document.querySelector('.address')
        var restaurantRating = document.querySelector('.rating')
        var restaurantPrice = document.querySelector('.price')
        var restaurantPhone = document.querySelector('.phoneNumber')
        var restaurantRatingTwo = data.businesses[0].rating
        restaurantRating.textContent = restaurantRatingTwo
        var restaurantNameTwo = data.businesses[0].name
        restaurantName.textContent = restaurantNameTwo
        var restaurantPriceTwo = data.businesses[0].price
        restaurantPrice.textContent = restaurantPriceTwo
        var restaurantCityTwo = data.businesses[0].location.city
        restaurantCity.textContent = restaurantCityTwo
        var restaurantPhoneTwo = data.businesses[0].phone
        restaurantPhone.textContent = restaurantPhoneTwo
        var restaurantAddressTwo = data.businesses[0].location.address1
        restaurantAddress.textContent = restaurantAddressTwo
        var restaurantLat = data.businesses[0].coordinates.latitude
        var restaurantLong = data.businesses[0].coordinates.longitude
        var addressLatStr = restaurantLat.toString()
        var addressLongStr = restaurantLong.toString()
        grabBrewery(addressLatStr, addressLongStr)
})
}

