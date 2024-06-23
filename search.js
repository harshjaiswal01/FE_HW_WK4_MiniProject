const getFormData = async (e) => {
    e.preventDefault();
    const pokemon = e.target.pokemon.value.toLowerCase().trim();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Pokémon not found');
        }
        
        const data = await res.json();

        const name = data['name'];
        const id = data.id;
        const imgUrl = data.sprites.front_default;
        const types = data.types.map(type => type.type.name).join(', ');
        const abilities = data.abilities.map(ability => ability.ability.name).join(', ');
        const height = data.height;
        const weight = data.weight;

        const myData = {
            name: name,
            id: id,
            imgUrl: imgUrl,
            types: types,
            abilities: abilities,
            height: height,
            weight: weight
        };

        displayPokemonDetails(myData);
    } catch (error) {
        alert(error.message);
    }
};

function displayPokemonDetails(pokemon) {
    const pokemonDetails = document.getElementById('pokemonDetails');
    pokemonDetails.innerHTML = `
        <div class="card shadow-lg" style="width: 18rem; margin: auto;">
            <img src="${pokemon.imgUrl}" class="card-img-top" alt="${pokemon.name}">
            <div class="card-body">
                <h5 class="card-title">${pokemon.name}</h5>
                <p class="card-text">ID: ${pokemon.id}</p>
                <p class="card-text">Height: ${pokemon.height}</p>
                <p class="card-text">Weight: ${pokemon.weight}</p>
                <p class="card-text">Types: ${pokemon.types}</p>
                <p class="card-text">Abilities: ${pokemon.abilities}</p>
            </div>
        </div>
    `;
}

document.getElementById('searchForm').addEventListener('submit', getFormData);
