const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")

fetch(TRAINERS_URL)
.then(response => response.json())
.then(trainerdata =>{
  renderTrainerData(trainerdata)
})

function renderTrainerData(data){

    data.forEach(function(trainer){
      const trainerli = document.createElement("li")
      trainerli.innerHTML =
        `<div class="card" data-id=${trainer.id}>
        <p>${trainer.name}</p>
        <button data-trainer-id=${trainer.id}>Add Pokemon</button>`
      main.append(trainerli)

      trainer.pokemons.forEach(function(pokemon){
        const pokemonli = document.createElement("li")
        const card = document.querySelector(`div[data-id='${trainer.id}']`)
          pokemonli.innerHTML =
            `<ul>
              <li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>
            </ul>`
          card.append(pokemonli)
      })
    })
}

main.addEventListener("click", function(event){
  // debugger
  if (event.target.textContent === "Add Pokemon"){
      fetch(POKEMONS_URL,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "trainer_id": parseInt(event.target.dataset.trainerId)
      })
    })
    .then(response => response.json())
    .then(pokemon =>{
      const pokemonli = document.createElement("li")

        const card = document.querySelector(`div[data-id='${event.target.dataset.trainerId}']`)
      // debugger
        pokemonli.innerHTML =
            `<ul>
              <li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>
            </ul>`
          card.append(pokemonli)
      })
  }
})






