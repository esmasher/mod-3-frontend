//main function
//fetch request for rest. in destination user clicked on

function main(){
    fetchRestaurants()
}

function fetchRestaurants(){
    const div = document.querySelector(".destination-bar")
    div.addEventListener("click", function(event){
        event.preventDefault()
        console.log(div)
        console.log(event)

    })
}

main()
