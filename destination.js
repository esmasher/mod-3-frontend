
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
            console.log(e.target)
            fetchDestination(id)
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
    console.log(destination.hotels)
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

    console.log(destination.hotels[0])

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

main()
