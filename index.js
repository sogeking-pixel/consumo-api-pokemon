function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const text_name = document.getElementById("name");
const text_description = document.getElementById("description");
const text_type = document.getElementById("type");

let randomNum = getRandomIntInclusive(1, 1025);

fetch("https://pokeapi.co/api/v2/pokemon/1/")
  .then((response) => response.json())
  .then((data) => {
    text_name.innerText = data.name;
    text_description.innerText = data.name;
    text_type.innerText = data.name;
  })
  .catch((error) => console.error("Error:", error));