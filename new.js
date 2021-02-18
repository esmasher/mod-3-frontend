function main(){
    fetchDestinationName()
    //createCommentFormListener()
}

function fetchDestinationName(){
    fetch("http://localhost:3000/destinations")
    .then(resp => resp.json())
    .then(destinations => {
        destinations.forEach(function(destination){
            renderDestinations(destination)
        })
    })
}

function renderDestinations(destination){
    const destinationBar = document.querySelector('#destination-bar')
    console.log(destinationBar)
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
    const h1 = document.querySelector('name')
    h1.innerHTML = destination.city

    const pTagLanguage = document.querySelector('#language-stars')
    pTagLanguage.innerText = `Language: ${destination.language}`

    const pTagPopulation = document.querySelector('#population-likes')
    pTagPopulation.innerText = `Population: ${destination.population}`

    const image = document.querySelector('#image')
    image.setAttribute('src', destination.image)

}

main()