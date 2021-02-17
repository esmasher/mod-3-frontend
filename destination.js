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
    const body = document.querySelector('.destination')

    const pTag = document.createElement('p')
    pTag.className = 'destination-tag'
    pTag.dataset.id = destination.id
    pTag.innerText = destination.city

    body.append(pTag)
}


main()
