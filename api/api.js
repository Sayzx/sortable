let currentPage = 1;
let currentHeroes = [];

async function fetchData() {
    const response = await fetch('../data/all.json');
    const data = await response.json();
    return data;
}

async function displayData(pageNumber = 1, pageSize = 20) {
    const heroes = await fetchData();
    currentHeroes = heroes; // sauvegarde les héros dans une variable globale
    updateDisplay(pageNumber, pageSize);
}

function updateDisplay(pageNumber = 1, pageSize = 20) {
    const start = (pageNumber - 1) * pageSize;
    const selectedHeroes = currentHeroes.slice(start, start + pageSize);
    let tableHTML = "<table>";
    tableHTML += "<tr><th>Icon</th><th>Name</th><th>Full Name</th><th>Powerstats</th><th>Race</th><th>Gender</th><th>Birth Place</th><th>Weight</th><th>Alignment</th></tr>";
    selectedHeroes.forEach(hero => {
        tableHTML += `<tr>
            <td><img src="${hero.images.xs}" alt="icon" /></td>
            <td>${hero.name}</td>
            <td>${hero.biography.fullName}</td>
            <td>Intelligence: ${hero.powerstats.intelligence}, Strength: ${hero.powerstats.strength}</td>
            <td>${hero.appearance.race || 'Unknown'}</td>
            <td>${hero.appearance.gender}</td>
            <td>${hero.biography.placeOfBirth || 'Unknown'}</td>
            <td>${hero.appearance.weight[1]}</td>
            <td>${hero.biography.alignment}</td>
        </tr>`;
    });
    tableHTML += "</table>";
    document.getElementById("data").innerHTML = tableHTML;
}

function searchHeroes(query) {
    const filteredHeroes = heroes.filter(hero => hero.name.toLowerCase().includes(query.toLowerCase()));
    currentHeroes = filteredHeroes;
    updateDisplay();
}

function changePage(change) {
    currentPage += change;
    updateDisplay(currentPage, document.getElementById('pageSize').value);
    document.getElementById('pageNumber').innerText = currentPage;
}

document.getElementById('search').addEventListener('keyup', (e) => {
    searchHeroes(e.target.value);
});

document.getElementById('pageSize').addEventListener('change', (e) => {
    updateDisplay(1, e.target.value);
});

displayData();