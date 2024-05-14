let currentPage = 1;
let pageSize = 20;
let heroes = [];
let filteredHeroes = [];

const loadData = (data) => {
    heroes = data;
    filteredHeroes = heroes;
    updateDisplay();
};

// récupère les données depuis l'API
fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
    .then(response => response.json())
    .then(loadData)
    .catch(error => console.error('Error fetching data:', error));

function updateDisplay() {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const selectedHeroes = filteredHeroes.slice(start, end);

    let tableHTML = "<table>";
    tableHTML += "<tr><th>Icon</th><th>Name</th><th>Full Name</th><th>Powerstats</th><th>Race</th><th>Gender</th><th>Birth Place</th><th>Weight</th><th>Alignment</th></tr>";
    selectedHeroes.forEach(hero => {
        tableHTML += `<tr>
            <td><img src="${hero.images.xs}" alt="icon" /></td>
            <td>${hero.name}</td>
            <td>${hero.biography.fullName}</td>
            <td>🧠: ${hero.powerstats.intelligence}, 🗡️: ${hero.powerstats.strength}</td>
            <td>${hero.appearance.race || 'Unknown'}</td>
            <td>${hero.appearance.gender}</td>
            <td>${hero.biography.placeOfBirth || 'Unknown'}</td>
            <td>${hero.appearance.weight[1]}</td>
            <td>${hero.biography.alignment}</td>
        </tr>`;
    });
    tableHTML += "</table>";
    document.getElementById("data").innerHTML = tableHTML;
    document.getElementById('pageNumber').innerText = currentPage;
}

function searchHeroes(query) {
    filteredHeroes = heroes.filter(hero => hero.name.toLowerCase().includes(query.toLowerCase()));
    currentPage = 1; // remet à 1 la page courante
    updateDisplay();
}

function changePage(change) {
    currentPage += change;
    if (currentPage < 1) currentPage = 1;
    if (currentPage > Math.ceil(filteredHeroes.length / pageSize)) currentPage = Math.ceil(filteredHeroes.length / pageSize);
    updateDisplay();
}

document.getElementById('search').addEventListener('keyup', (e) => {
    searchHeroes(e.target.value);
});

document.getElementById('pageSize').addEventListener('change', (e) => {
    pageSize = e.target.value === 'all' ? filteredHeroes.length : parseInt(e.target.value);
    if (e.target.value === 'all') {
        document.getElementById('pagination').style.display = 'none';
    }else {
        document.getElementById('pagination').style.display = 'block';
    }
    currentPage = 1; // remet à 1 la page courante
    updateDisplay();
});
