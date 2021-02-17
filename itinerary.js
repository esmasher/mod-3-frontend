function main(){
    fetchItinerary()
    addNewNote()
}


// need id so that it doesn't render itineraries for each destination
//render will be tied to destination render so conditional where destination.id === destination.id
function fetchItinerary(){
    fetch("http://localhost:3000/itineraries")
    .then(resp => resp.json())
    .then(itinerary => itinerary.forEach(function(itinerary){
        renderItinerary(itinerary)
    }))
}

function renderItinerary(itinerary){
    const div = document.querySelector(".itinerary")
    const city = document.createElement('p')
    const hotel = document.createElement('p')
    const restaurant = document.createElement('p')
    const attraction = document.createElement('p')

    city.dataset.id = itinerary.id
    hotel.dataset.id = itinerary.id
    restaurant.dataset.id = itinerary.id
    attraction.dataset.id = itinerary.id

    const id = itinerary.destination_id

    fetch(`http://localhost:3000/destinations/${id}`)
    .then(resp => resp.json())
    .then(destination => {
        city.innerHTML = `City: ${destination.city}`
        hotel.innerHTML = `Hotel: ${destination.hotel}`
        restaurant.innerHTML = `Restaurant: ${destination.restaurant}`
        attraction.innerHTML = `Attraction: ${destination.attraction}`
        div.append(city, hotel, restaurant, attraction)
    })
}

//form id will be itinerary id

function addNewNote(){

  const newNote = document.querySelector("form")

  newNote.addEventListener("submit", function(event){
    event.preventDefault()

    const note = document.querySelector("#new-note")
    const div = document.querySelector(".itinerary")
    const p = document.createElement('p')

    p.innerHTML = note.value

    div.append(p)
   console.log(event.target)

  })

}




main()
