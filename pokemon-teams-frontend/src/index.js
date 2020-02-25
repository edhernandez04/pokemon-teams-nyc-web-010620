const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

Board = document.getElementsByTagName('main')[0]

document.addEventListener('DOMContentLoaded', () => {

    fetch(TRAINERS_URL).then(resp => resp.json()).then(trainers => displayTrainers(trainers))

})
    const trainersPokemon = pokemon => {
        return `<li>${pokemon.nickname}(${pokemon.species})
        <button class="release" id="${pokemon.id}">Release</button></li>`
    }

    function displayTrainers(trainers){
        for (let i=0; i < trainers.length; i++){
            let tCard = document.createElement('div')
            tCard.className = 'card'
            tCard.id = `${trainers[i].id}`
            tCard.innerHTML = `
                <p>${trainers[i].name}</p>
                <button class="add" id="${trainers[i].id}"> Add Pokemon </button>
                <ul>${trainers[i].pokemons.map(trainersPokemon).join("")}
                </ul>
                `
            Board.append(tCard)

        }      
    }

    document.addEventListener('click', function(e){
        if (e.target.className === "release"){
            fetch(`${POKEMONS_URL}/${e.target.id}`, {
                method: "DELETE"
            }).then(resp => resp.json())
            .then(
                e.target.parentNode.remove()
            )
        } else {
            (e.target.className === "add")
                fetch(`${POKEMONS_URL}`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "trainer_id": e.target.id
                    })
                }).then(resp => resp.json())
                    .then(pokemon => {
                        e.target.parentElement.children[2].innerHTML += `<li>${pokemon.nickname}(${pokemon.species})
                        <button class="release" id="${pokemon.id}">Release</button></li>`
                    })
            }
        })