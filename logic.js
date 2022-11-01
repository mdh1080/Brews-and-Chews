var apiKey = "8T96biN_soJ158_Zo0WNfmegfEY7wDZOcI9jZ6XrJ96KGP5kc0r8CKFyfFvPth6MkupMniKAspgfIbNvNty3zXz17BZvpVhhIWOc9i2BsjjbRmFOAc7FwUtx0W1YY3Yx"
var addressLat = ""
var addressLong = ""
var x = [0,1,2,3,4]
var searchHistory = []
searchHistory = JSON.parse(localStorage.getItem('cities')) ? JSON.parse(localStorage.getItem('cities')): []

//function to fetch first api (brewery)
function grabBrewery (addressLat, addressLong) {


    var url = `https://api.openbrewerydb.org/breweries?by_dist=${addressLat},${addressLong}&per_page=5`
    fetch(url)
    .then(response => response.json())
    .then(data => {console.log(data)
        var dataRandom = x[Math.floor(Math.random()*x.length)]
        var breweryAddress = document.querySelector('.street')
        var breweryWebsite = document.querySelector('.website')
        var breweryName = document.querySelector('.brewName')
        var breweryPhone = document.querySelector('.brewPhone')
        var breweryLocation = data[dataRandom].street
        var breweryUrl = data[dataRandom].website_url
        var breweryNameTwo = data[dataRandom].name
        var breweryPhoneTwo = data[dataRandom].phone
        breweryPhoneTwo = numberformat(breweryPhoneTwo)



        breweryName.textContent = 'Name: ' + breweryNameTwo
        breweryPhone.textContent = 'Phone: ' + breweryPhoneTwo
        breweryAddress.textContent = 'Address: ' + breweryLocation
        breweryWebsite.textContent = 'Website: ' + breweryUrl
})
}

// function for phone number 
function numberformat (number) {
   number = String(number)
   var number_string = [...number]
   var sorted = []
    if (number_string[0] === "+" && number_string.length === 12) {
        sorted = number_string.slice(2)
        sorted.splice(3, 0, "-")
        sorted.splice(7, 0, "-")
    }
    if (number_string[0] === "1" && number_string.length === 11) {
        sorted = number_string.slice(1, 11)
        sorted.splice(3, 0, "-")
        sorted.splice(7, 0, "-")
    }
    if (number_string.length === 10) {
        sorted = [...number_string]
        sorted.splice(3, 0, "-")
        sorted.splice(7, 0, "-")  
    }
    var final_number = sorted.join("")
    return final_number
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
    var url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?&location=${cityName}&categories=restaurants&open_now=true&per_page=5`
    var bug = {Authorization:'Bearer ' + apiKey,"Access-Control-Allow-Origin": "*",}
    fetch(url, {headers: bug})
    .then(response => response.json())
    .then(data => {console.log(data)
        var dataRandom = x[Math.floor(Math.random()*x.length)]
        var restaurantName = document.querySelector('.name')
        var restaurantAddress = document.querySelector('.address')
        var restaurantPrice = document.querySelector('.price')
        var restaurantPhone = document.querySelector('.phoneNumber')
        var restaurantNameTwo = data.businesses[dataRandom].name
        var restaurantPriceTwo = data.businesses[dataRandom].price
        var restaurantPhoneTwo = data.businesses[dataRandom].phone
        var restaurantAddressTwo = data.businesses[dataRandom].location.address1
        restaurantPhoneTwo = numberformat(restaurantPhoneTwo)

        restaurantName.textContent = 'Name: ' + restaurantNameTwo
        restaurantPrice.textContent = 'Price: ' + restaurantPriceTwo
        restaurantPhone.textContent = 'Phone: ' + restaurantPhoneTwo
        restaurantAddress.textContent = 'Address: ' + restaurantAddressTwo

        var restaurantLat = data.businesses[dataRandom].coordinates.latitude
        var restaurantLong = data.businesses[dataRandom].coordinates.longitude

        var addressLatStr = restaurantLat.toString()
        var addressLongStr = restaurantLong.toString()
        grabBrewery(addressLatStr, addressLongStr)

        //stringify cityName
        searchHistory.push(cityName)
        localStorage.setItem('cities', JSON.stringify(searchHistory))
        console.log(searchHistory)
})
}