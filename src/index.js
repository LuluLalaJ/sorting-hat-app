const localHouseUrl = "http://localhost:3000/houses/"
const wizardWorldUrl = "https://wizard-world-api.herokuapp.com/Houses/"
const hpApiUrl = "https://hp-api.onrender.com/api/characters/house/"

const houseBar = document.getElementById('house-bar')
const houseBasic = document.getElementById('house-basic-info')
const dropdownBox = document.getElementById('traits-dropdown')
const sortingAnnouncement = document.getElementById('sorted-announcement')
const passwordForm = document.getElementById('enter-password-form')


const idGryffindor = "0367baf3-1cb6-4baf-bede-48e17e1cd005/"
const idRavenclaw = "805fd37a-65ae-4fe5-b336-d767b8b7c73a/"
const idHufflepuff = "85af6295-fd01-4170-a10b-963dd51dce14/"
const idSlytherin = "a9704c47-f92e-40a4-8771-ed1899c9b9c1/"

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
    passwordForm.onsubmit = (event) => fetchApiInfo(event, house)
}

function fetchApiInfo(event, house) {
    event.preventDefault()
    let password = document.getElementById('password').value
    let wizardWorldHouseUrl = ""
    let characterUrl = ""
//check password

    if (house.id === 1) {
        wizardWorldHouseUrl = wizardWorldUrl + idGryffindor
        characterUrl = hpApiUrl + "Gryffindor"
    } else if (house.id === 2) {
        wizardWorldHouseUrl = wizardWorldUrl + idSlytherin
        characterUrl = hpApiUrl + "Slytherin"
    } else if (house.id === 3) {
        wizardWorldHouseUrl = wizardWorldUrl + idHufflepuff
        characterUrl = hpApiUrl + "Hufflepuff"
    } else {
        wizardWorldHouseUrl = wizardWorldUrl + idRavenclaw
        characterUrl = hpApiUrl + "Ravenclaw"
    }

    if (password !== house.password) {
        alert("Your password is incorrect.")
    }
    else {
        fetch(wizardWorldHouseUrl)
        .then(r => r.json())
        .then(houseData => renderWizardWorldInfo(houseData))

        fetch(characterUrl)
        .then(r => r.json())
        .then(characterData => characterData.forEach( character => renderCharacterInfo(character)))
    }

}

function renderWizardWorldInfo(house) {
    // console.log(house)
    const founder = document.getElementById('founder')
    const houseColors = document.getElementById('house-colors')
    const commonRoom = document.getElementById('common-room')
    const element = document.getElementById('element')
    const ghost = document.getElementById('ghost')
    // const head = document.getElementById('head')

    founder.textContent = `Your house founder is ${house.founder}` 
    houseColors.textContent = `Your house colors are ${house.houseColours.toLowerCase()}`
    commonRoom.textContent = `Your house's common room is the ${house.commonRoom}`
    element.textContent = `Your house's element is ${house.element.toLowerCase()}`
    ghost.textContent = `Your house ghost is ${house.ghost}`
}

function renderCharacterInfo(character) {
    console.log(character)
    if (character.image !== "") {
        const members = document.getElementById('same-house-members')
        
        const membersCard = document.createElement('div')
        membersCard.className = "members-card"
        members.appendChild(membersCard)
    
        const membersImg = document.createElement('img')
        membersImg.src = character.image
        membersImg.className = 'members-image'
        membersCard.appendChild(membersImg)
    
        const membersName = document.createElement('p')
        membersName.textContent = character.name 
        membersCard.appendChild(membersName)
    }


    
    //maybe change this to famous house members?
    //also need to change css to arrange the photos better 
}