function list(countries) {
  const characterList = document.getElementById('character-list');
  characterList.innerHTML = '';
  for (let i = 0; i < countries.length; i += 1) {
    const listItem = document.createElement('li');
    characterList.appendChild(listItem);
    const content = `

        <div id="${countries[i].name}titulo">
          <h2>${countries[i].name}</h2>
        </div>
        <div id = "${countries[i].name}fondoModal" class= "fondModal">
          <div id="${countries[i].name}modal" class= "estilosModal">
            <img src="${countries[i].flag}" alt="${countries[i].name}">
            <p> Capital: ${countries[i].capital}</p>
            <p> Region: ${countries[i].region}</p>
            <p> Subregion: ${countries[i].subregion}</p>
            <p> Poblacion: ${countries[i].population}</p>
            <p> Area: ${countries[i].area} Km<sup>2</sup></p>
            <p id = "${countries[i].name}idioma"></p>
            <p id = "${countries[i].name}moneda"></p>
            <button id="${countries[i].name}cerrar" class = "botoncerrar">X</button>
          </div>
        </div>
      `;
    listItem.innerHTML = content;

    let languaje = '';
    for (let a = 0; a < countries[i].languages.length; a += 1) {
      const languajes = `
        <p> Idiomas: ${countries[i].languages[a].name}</p>
      `;
      languaje = languaje.concat(languajes);
    }

    const leng = document.getElementById(`${countries[i].name}idioma`);
    leng.innerHTML = languaje;

    let money = '';
    for (let a = 0; a < countries[i].currencies.length; a += 1) {
      const moneys = `
        <p> Moneys: ${countries[i].currencies[a].name}</p>
      `;
      money = money.concat(moneys);
    }

    const mon = document.getElementById(`${countries[i].name}moneda`);
    mon.innerHTML = money;

    const foundModal = document.getElementById(`${countries[i].name}foundModal`);

    const modal = document.getElementById(`${countries[i].name}modal`);
    modal.style.display = 'none';
    const title = document.getElementById(`${countries[i].name}titulo`);
    title.addEventListener('click', () => {
      modal.style.display = 'block';
      foundModal.style.display = 'block';
    });

    const x = document.getElementById(`${countries[i].name}cerrar`);
    x.addEventListener('click', () => {
      modal.style.display = 'none';
      foundModal.style.display = 'none';
    });
  }
}

const form = document.getElementById('form');
fetch('https://restcountries.eu/rest/v2/all')
  .then((response) => response.json())
  .then((data) => {
    list(data);
    form.addEventListener('input', (event) => {
      event.preventDefault();
      const search = form.elements[0].value;
      const searchcount = data.filter((element) => element.name.toLowerCase().includes(`${search.toLowerCase()}`));
      if (!searchcount) {
        list(data);
      } else {
        list(searchcount);
      }
    });
  });
