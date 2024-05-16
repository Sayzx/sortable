let currentPage = 1;
let pageSize = 20;
let heroes = [];
let filteredHeroes = [];
let latestSearchValue = '';

const loadData = (data) => {
    heroes = data;
    filteredHeroes = heroes;
    updateDisplay();
};

fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
    .then(response => response.json())
    .then(loadData)
    .catch(error => console.error('Error fetching data:', error));

function updateDisplay() {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const selectedHeroes = filteredHeroes.slice(start, end);

    let tableHTML = "<table>";

    tableHTML +=
        `<tr>
            <th class="thClickable">Icon</th>
            <th class="thClickable" id="name">Name <span class="arrow">▲</span> </th>
            <th class="thClickable" id="fullName">Full Name <span class="arrow">▲</span> </th>
            <th class="thClickable" id="powerStats">Powerstats <span class="arrow">▲</span> </th>
            <th class="thClickable" id="race">Race <span class="arrow">▲</span> </th>
            <th class="thClickable" id="gender">Gender <span class="arrow">▲</span> </th>
            <th class="thClickable" id="birthPlace">Birth Place <span class="arrow">▲</span> </th>
            <th class="thClickable" id="weight">Weight <span class="arrow">▲</span> </th>
            <th class="thClickable" id="alignment">Alignment <span class="arrow">▼</span> </th>
        </tr>`;

    /*▼ ▲*/

    selectedHeroes.forEach(hero => {
        tableHTML +=
            `<tr>
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
    filteredHeroes = heroes.filter(hero =>
        (hero.name && hero.name.toLowerCase().includes(query.toLowerCase())) ||
        (hero.biography && hero.biography.fullName && hero.biography.fullName.toLowerCase().includes(query.toLowerCase())) ||
        (hero.powerstats && hero.powerstats.intelligence !== null && hero.powerstats.intelligence !== undefined && hero.powerstats.intelligence.toString().toLowerCase().includes(query.toLowerCase())) ||
        (hero.powerstats && hero.powerstats.strength !== null && hero.powerstats.strength !== undefined && hero.powerstats.strength.toString().toLowerCase().includes(query.toLowerCase())) ||
        (hero.appearance && hero.appearance.race && hero.appearance.race.toLowerCase().includes(query.toLowerCase())) ||
        (hero.appearance && hero.appearance.gender && hero.appearance.gender.toLowerCase().includes(query.toLowerCase())) ||
        (hero.biography && hero.biography.placeOfBirth && hero.biography.placeOfBirth.toLowerCase().includes(query.toLowerCase())) ||
        (hero.appearance && hero.appearance.weight && hero.appearance.weight[1] && hero.appearance.weight[1].toLowerCase().includes(query.toLowerCase())) ||
        (hero.biography && hero.biography.alignment && hero.biography.alignment.toLowerCase().includes(query.toLowerCase()))
    );

    currentPage = 1;
    updateDisplay();
}

function changePage(change) {
    currentPage += change;
    if (currentPage < 1) currentPage = 1;
    if (currentPage > Math.ceil(filteredHeroes.length / pageSize)) currentPage = Math.ceil(filteredHeroes.length / pageSize);
    updateDisplay();
}

document.getElementById('search').addEventListener('keyup', (e) => {
    if (latestSearchValue !== e.target.value){
        latestSearchValue = e.target.value;
        searchHeroes(e.target.value);
    }
});

document.getElementById('pageSize').addEventListener('change', (e) => {
    pageSize = e.target.value === 'all' ? filteredHeroes.length : parseInt(e.target.value);
    if (e.target.value === 'all') {
        document.getElementById('pagination').style.display = 'none';
    }else {
        document.getElementById('pagination').style.display = 'block';
    }
    currentPage = 1;
    updateDisplay();
});

