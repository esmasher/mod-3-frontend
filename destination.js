
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
    const destinationContainer = document.querySelector('.destination')
    const span = document.createElement('span')
    span.innerText = destination.city
    span.className = 'destination-bar'
    span.dataset.id = destination.id
    destinationContainer.append(span)

    span.addEventListener('click', function(e){
        if (e.target.className === 'destination-bar'){
            const id = e.target.dataset.id
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

}



main()