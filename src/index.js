const localHouseUrl = "http://localhost:3000/houses/"
const houseBar = document.getElementById('house-bar')
const houseBasic = document.getElementById('house-basic-info')
const dropdownBox = document.getElementById('traits-dropdown')
const sortingAnnouncement = document.getElementById('sorted-announcement')
const passwordForm = document.getElementById('enter-password-form')

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
        fetchChosenSchool("1")
    } else if (option === "c" || option === "e") {
        fetchChosenSchool("2")
    } else if (option === "b" || option === "d") {
        fetchChosenSchool("3")
    } else {
        fetchChosenSchool("4")
    }

    houseBar.style.display = "none"
    document.getElementById('sorting-question').style.display = "none"
}

function fetchChosenSchool(id) {
    fetch(localHouseUrl + id)
    .then(r => r.json())
    .then(data => announceHouseAndPassword(data) ) 
}
    
function announceHouseAndPassword(house) {
    const houseImg = document.getElementById('house-img')
    houseImg.src = house.crest 
    houseImg.alt = `${house.name}'s crest`
    
    const houseName = document.getElementById('house-name')
    houseName.textContent = house.name
    
    const houseAnimal = document.getElementById('house-animal')
    houseAnimal.textContent = house.animal
    
    const message = document.getElementById('announcement-message')
    message.textContent = `YOU ARE A ${house.name.toUpperCase()}!!!`

    const password = document.createElement('h3')
    password.textContent = `Your house common room password is ${house.password}!`
    message.appendChild(password)

    passwordForm.style.display = "block"
}
