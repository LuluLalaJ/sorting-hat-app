const localHouseUrl = "http://localhost:3000/houses"
const houseBar = document.getElementById('house-bar')
const houseBasic = document.getElementById('house-basic-info')
const dropdownBox = document.getElementById('traits-dropdown')
const sortingAnnouncement = document.getElementById('sorted-announcement')

function fetchLocalHouses() {
    fetch(localHouseUrl)
    .then(r => r.json())
    .then(data => data.forEach(house => renderLocalHouse(house)))
}

fetchLocalHouses()

function renderLocalHouse(house) {
    const houseCrest = document.createElement('img')
    houseCrest.src = house.crest 
    houseCrest.onclick = (event) => displayCrestAndInfo(event, house)
    houseBar.appendChild(houseCrest)
    // console.log(houseCrest)
}

function displayCrestAndInfo(event, house) {
    const houseImg = document.getElementById('house-img')
    houseImg.src = house.crest 
    houseImg.alt = `${house.name}'s crest`
    
    const houseName = document.getElementById('house-name')
    houseName.textContent = house.name
    
    const houseAnimal = document.getElementById('house-animal')
    houseAnimal.textContent = house.animal
}

dropdownBox.onchange = (event) => displayChosenHouse(event)

function displayChosenHouse(event) {
    const option = event.target.value 

    if (option === 'a' || option === "h" ) {
        console.log('Gryffindor')
        // fetchChosenSchool(1)
        announceHouseAndPassword('Gryffindor')
        // THEN HOUSE1 
        // 1) ANNOUNCING THE CHOSEN HOUSE + PASSWORD 
        // 3) HIDE THE DROPDOWN BOX 
    
    } else if (option === "c" || option === "e") {
        console.log('Slytherin')
        // THEN HOUSE2 
        // 1) ANNOUNCING THE CHOSEN HOUSE + PASSWORD 
        // 3) HIDE THE DROPDOWN BOX 
    } else if (option === "b" || option === "d") {
        console.log('Hufflepuff')

    } else {
        console.log('Ravenclaw')
    }

    //hiding the house bar 
    houseBar.style.display = "none"

}

function fetchChosenSchool(id) {
    fetch(localHouseUrl)
    .then(r => r.json())
    .then(data => data.forEach(house => )) 
}
    
function announceHouseAndPassword(houseName) {
    const announcement = document.getElementById('sorted-announcement')

    const message = document.createElement('p')
    message.textContent = `${houseName}!!!`

    announcement.appendChild(message)
    

}
