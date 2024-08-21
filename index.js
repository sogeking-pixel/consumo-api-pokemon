function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const text_name = document.getElementById("name");
const text_description = document.getElementById("description");
const text_type = document.getElementById("type");
const imgElement = document.getElementById("img");

let randomNum = getRandomIntInclusive(1, 1025);

fetch(`https://pokeapi.co/api/v2/pokemon/${randomNum}/`)
  .then((response) => response.json())
  .then((data) => {
    text_name.innerText = data.name;
    imgElement.src = data.sprites.front_default;
    imgElement.alt = data.name;

    // Obtener los nombres de los tipos
    let typePromises = data.types.map((type) =>
      fetch(type.type.url)
        .then((response) => response.json())
        .then((typeData) => {
          return typeData.names.find((entry) => entry.language.name === "es")
            .name;
        })
    );

    // Esperar a que todas las promesas de tipos se resuelvan
    return Promise.all(typePromises).then((typeNames) => {
      text_type.innerText = typeNames.join(", ");
      return fetch(data.species.url);
    });
  })
  .then((response) => response.json())
  .then((speciesData) => {
    text_description.innerText = speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === "es"
    ).flavor_text;
  })
  .catch((error) => console.error("Error:", error));
