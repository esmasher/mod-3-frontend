
function main(){
    fetchName()
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
    const span = document.createElement('span')
    span.innerText = destination.city
    span.className = 'destination-span'
    span.dataset.id = destination.id
    destinationBar.append(span)

    span.addEventListener('click', function(e){
        if (e.target.className === 'destination-span'){
            const id = e.target.dataset.id
            // console.log(e.target)
            fetchDestination(id)
            fetchRestaurants(id)
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
    const h4Hotel = document.querySelector('#hotel')
    h4Hotel.innerText = `Hotels: ${destination.hotel.toString()}`


    const h4Restaurant = document.querySelector('#restaurant')
    h4Restaurant.innerText = `Restaurants: ${destination.restaurant}`

    const pTagLanguage = document.querySelector('#language')
    pTagLanguage.innerText = `Language: ${destination.language}`


    const pTagPopulation = document.querySelector('#population')
    pTagPopulation.innerText = `Population: ${destination.population}`

    const pTagAttraction = document.querySelector('#population')
    pTagAttraction.innerText = `Attraction: ${destination.attraction}`



}

function fetchRestaurants(id){

    fetch("http://localhost:3000/restaurants")
    .then(resp => resp.json())
    .then(data => console.log(data))
    // if (id === res)

}



main()
