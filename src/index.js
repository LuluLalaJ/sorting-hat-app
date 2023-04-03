const localHouseUrl = "http://localhost:3000/houses"
const houseBar = document.getElementById('house-bar')
const houseBasic = document.getElementById('house-basic-info')

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