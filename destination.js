
function main(){
    fetchName()
    restClick()
    addNote()
    createNewHotel()
}


function fetchName(){
    fetch("http://localhost:3000/destinations")
    .then(resp => resp.json())
    .then(destinations => {
        destinations.forEach(function(destination){
            renderDestinations(destination)
        })
    })
}

// change from P Tag
function renderDestinations(destination){
    const destinationBar = document.querySelector('#destination-bar')
    // console.log(destinationBar)
    const span = document.createElement('span')
    span.innerText = destination.city
    span.className = 'destination-span'
    span.dataset.id = destination.id
    destinationBar.append(span)

    span.addEventListener('click', function(e){
        if (e.target.className === 'destination-span'){
            const id = e.target.dataset.id
            fetchRestaurants(id)
            // console.log(e.target)
            fetchDestination(id)
            fetchItinerary(id)
        }
    })
}

function fetchDestination(id){
    fetch(`http://localhost:3000/destinations/${id}`)
    .then(resp => resp.json())
    .then(destination => {
        showDestination(destination)
    })
}

function showDestination(destination){
    const destinationContainer = document.querySelector('.destination')
    const h1 = document.querySelector('#city')
    h1.innerHTML = destination.city
    const image = document.querySelector('#image')
    image.setAttribute('src', destination.image)
    // console.log(destination.hotels)
    //const ul = document.querySelector('#hotel')

    //ul.append(hotelNames(destination))



        function hotelNames(destination){
            destination.hotels.forEach(function(hotel){
                const div = document.querySelector('#hotel')
                const pTag = document.createElement('p')
                pTag.className = 'hotel-list'
                pTag.innerText = hotel.name
                pTag.dataset.id = hotel.id
                div.append(pTag)

                renderItineraryHotel(hotel)

                pTag.addEventListener('click', function(e){
                    //console.log(e.target)
                    //debugger
                    if (e.target.className === 'hotel-list'){
                        const id = e.target.dataset.id
                        fetchHotelDetails(id)
                    }
                })
            })
        }

        hotelNames(destination)

    // console.log(destination.hotels[0])

    // const h4Restaurant = document.querySelector('#restaurant')
    // h4Restaurant.innerText = `Restaurants: ${destination.restaurant}`

    const pTagLanguage = document.querySelector('#language')
    pTagLanguage.innerText = `Language: ${destination.language}`

    const pTagPopulation = document.querySelector('#population')
    pTagPopulation.innerText = `Population: ${destination.population}`

    // const pTagAttraction = document.querySelector('#population')
    // pTagAttraction.innerText = `Attraction: ${destination.attraction}`

}

function fetchHotelDetails(id){
    fetch(`http://localhost:3000/hotels/${id}`)
    .then(resp => resp.json())
    .then(hotel => {
        renderHotel(hotel)
    })
}




function renderHotel(hotel){
    console.log(hotel)
    const destinationContainer = document.querySelector('.destination')
    const h1 = document.querySelector('#city')
    h1.innerHTML = hotel.name
    const pTag = document.createElement('p')
    h1.append(pTag)
    pTag.innerText = hotel.rating

    function displayComments(hotel){
        hotel.reviews.forEach(function(review){
            const div = document.querySelector('#hotel')
            const pTagComment = document.createElement('p')
            pTagComment.innerText = review.comment
            div.append(pTagComment)

        })
    }

    displayComments(hotel)
    //const image = document.querySelector('#image')
    //image.setAttribute('src', destination.image)
}

function fetchRestaurants(id){
    const p = document.createElement('p')

    fetch("http://localhost:3000/restaurants")
    .then(resp => resp.json())
    .then(restaurants => restaurants.forEach(function(restaurant){
        dest_id = parseInt(restaurant.destination_id)
        if ( parseInt(id) === dest_id) {

        const h4_rest = document.getElementById("restaurant")

        p.setAttribute("class", "rest-details")
        p.innerHTML = `Restaurants: ${restaurant.name}`
        p.dataset.id = restaurant.id

        h4_rest.append(p)
        renderItineraryRestaurant(restaurant)

        }
    }))
}

function restClick(){
    const h4_rest = document.getElementById("restaurant")

    h4_rest.addEventListener("click", function(event){

        console.log(event.target.dataset.id)
        if(event.target.className === "rest-details"){
            const id = event.target.dataset.id

            fetch(`http://localhost:3000/restaurants/${id}`)
            .then(resp => resp.json())
            .then(restaurant => renderRestaurantDetails(restaurant))
        }


    })
}

function renderRestaurantDetails(restaurant){
    const h4_rest = document.getElementById("restaurant")
    const pName = document.createElement("p")
    const pCuisine = document.createElement('p')
    const pReview = document.createElement('p')

    pName.innerHTML = `Restaurant Name: ${restaurant.name}`
    pCuisine.innerHTML = `Restaurant Cuisine: ${restaurant.cuisine}`
    pReview.innerHTML = `Restaurant review: ${restaurant.review}`

    h4_rest.append(pName, pCuisine, pReview)

}

function fetchItinerary(id){
    const div = document.querySelector(".itinerary")
    const h3 = document.querySelector(".iti-details")
    const city = document.createElement('p')


    h3.innerHTML = ("")
    // const hotel = document.createElement('p')

    fetch("http://localhost:3000/itineraries")
    .then(resp => resp.json())
    .then(itineraries => itineraries.forEach(function(itinerary){
        dest_id = parseInt(itinerary.destination_id)
        if ( parseInt(id) === dest_id){
            city.dataset.id = itinerary.destination_id
            // hotel.dataset.id = itinerary.id
            // h4.dataset.id = itinerary.id

            city.innerHTML = `Itinerary for: ${itinerary.destination.city}`
            // hotel.innerHTML = `Hotel: ${itinerary.destination.hotel}`
            h3.append(city)

        }

    }))

}

function renderItineraryRestaurant(restaurant){
    const div = document.querySelector(".itinerary")
    const h4 = document.querySelector("#itinerary-restaurant")
    // const h4Tag = document.createElement("h4")
    h4.innerHTML = ("")
    const rest = document.createElement('p')

    rest.dataset.id = restaurant.id
    rest.innerHTML = `Restaurant: ${restaurant.name}`

    h4.append(rest)
    // h4.append(h4Tag)
}

function renderItineraryHotel(hotel){
    const h4Hotel = document.querySelector("#itinerary-hotel")
    // const  = document.createElement("h4")
    h4Hotel.innerHTML = ("")
    const hotell = document.createElement('p')
    hotell.dataset.id = hotel.id
    hotell.innerHTML = `Hotel: ${hotel.name}`

    h4Hotel.append(hotell)
    deleteHotel(hotel, hotell)
    // div.append(h4Hotel)
}



function addNote(){
    const newNote = document.querySelector(".itinerary")
    const noteTag = document.querySelector("#new-note-created")
    const destinationId = document.querySelector(".iti-details")

    h5 = document.createElement("h5")
    h5.id = "note-details"



      newNote.addEventListener("submit", function(event){
        event.preventDefault()
        console.log(destinationId.firstChild.dataset.id)
        const noteNew = event.target["new-note"].value
        console.log(noteNew)
        const id = destinationId.firstChild.dataset.id
        // const noteTag = (event.target.previousSibling.previousSibling.previousSibling.previousSibling)


        const reqObj = {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              note: noteNew

            })
          }

          fetch(`http://localhost:3000/itineraries/${id}`, reqObj)
            .then(resp => resp.json())
            .then(data => {
                event.target.reset()
                console.log(data)
                const p = document.createElement('p')
                p.innerText = `Notes: ${data.note}`
                h5.append(p)
                noteTag.append(h5)
            })

        })

}

function deleteHotel(hotel, hotell){
    const button = document.createElement('BUTTON')
    button.innerHTML= "Remove Hotel"
    hotell.append(button)

    const id = hotel.id

    hotell.addEventListener("click", function(event){
        const reqObj = {
            method: 'DELETE'
          }

        fetch(`http://localhost:3000/hotels/${id}`, reqObj)
          .then(resp => resp.json())
          .then(data => {
            event.target.parentNode.parentNode.remove()
          })
    })
}

function createNewHotel(){
    const form = document.querySelector('#create-hotel')
    const h4Hotel = document.querySelector("#new-hotel-created")
    const destination = document.querySelector('.iti-details')

    h4Hotel.innerHTML = ("")
    const hotell = document.createElement('p')


    form.addEventListener('submit', function(event){
        event.preventDefault()


        const newHotel = {
            name: event.target['name'].value,
            rating: event.target['rating'].value,
            destination_id: destination.dataset.id,
        }
        form.reset()
        const reqObj = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newHotel)
          }
    fetch('http://localhost:3000/hotels', reqObj)
    .then(resp => resp.json())
    .then(hotel => {
        hotell.dataset.id = hotel.id
        hotell.innerHTML = `Hotel: ${hotel.name}`
        h4Hotel.append(hotell)
        deleteHotel(hotel, hotell)
        })
    })
}

main()
