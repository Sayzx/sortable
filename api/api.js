let currentPage = 1;
let pageSize = 20;
let heroes = [];
let filteredHeroes = [];
let latestSearchValue = '';
let currentSortColumn = '';
let currentSortDirection = 'asc';

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

    const getArrow = (column) => {
        if (column === currentSortColumn) {
            return currentSortDirection === 'asc' ? '▲' : '▼';
        }
        return '';
    };

    tableHTML +=
        `<tr>
            <th id="icon">Icon</th>
            <th class="thClickable" id="name" onclick="sortTable('name')">Name <span class="arrow">${getArrow('name')}</span></th>
            <th class="thClickable" id="fullName" onclick="sortTable('fullName')">Full Name <span class="arrow">${getArrow('fullName')}</span></th>
            <th class="thClickable" id="powerStats" onclick="sortTable('powerStats')">Powerstats <span class="arrow">${getArrow('powerStats')}</span></th>
            <th class="thClickable" id="race" onclick="sortTable('race')">Race <span class="arrow">${getArrow('race')}</span></th>
            <th class="thClickable" id="gender" onclick="sortTable('gender')">Gender <span class="arrow">${getArrow('gender')}</span></th>
            <th class="thClickable" id="height" onclick="sortTable('height')">Height <span class="arrow">${getArrow('height')}</span></th>
            <th class="thClickable" id="weight" onclick="sortTable('weight')">Weight <span class="arrow">${getArrow('weight')}</span></th>
            <th class="thClickable" id="birthPlace" onclick="sortTable('birthPlace')">Birth Place <span class="arrow">${getArrow('birthPlace')}</span></th>
            <th class="thClickable" id="alignment" onclick="sortTable('alignment')">Alignment <span class="arrow">${getArrow('alignment')}</span></th>
        </tr>`;

    selectedHeroes.forEach(hero => {
        tableHTML +=
            `<tr>
                <td><a href="info.html?id=${hero.id}"><img src="${hero.images.xs}" alt="icon" /></a></td>
                <td>${hero.name || 'Unknown'}</td>
                <td>${hero.biography.fullName || 'Unknown'}</td>
                <td>
                    🧠 : ${hero.powerstats.intelligence || 'Unknown'},
                    💪 : ${hero.powerstats.strength || 'Unknown'},
                    🏃 :${hero.powerstats.speed || 'Unknown'},
                    <br>
                    🛡️ :${hero.powerstats.durability || 'Unknown'},
                    ⚡ :${hero.powerstats.power || 'Unknown'},
                    🗡️:${hero.powerstats.combat || 'Unknown'}
                </td>
                <td>${hero.appearance.race || 'Unknown'}</td>
                <td>${hero.appearance.gender === '-' ? 'Unknown' : hero.appearance.gender}</td>
                <td>${hero.appearance.height[1] === '0 cm' ? 'Unknown' : hero.appearance.height[1]}</td>
                <td>${hero.appearance.weight[1] === '0 kg' ? 'Unknown' : hero.appearance.weight[1]}</td>
                <td>${hero.biography.placeOfBirth === '-' ? 'Unknown' : hero.biography.placeOfBirth}</td>
                <td>${hero.biography.alignment === '-' ? 'Unknown' : hero.biography.alignment}</td>
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
        (hero.appearance && hero.appearance.height && hero.appearance.height[1] && hero.appearance.height[1].toLowerCase().includes(query.toLowerCase())) ||
        (hero.appearance && hero.appearance.weight && hero.appearance.weight[1] && hero.appearance.weight[1].toLowerCase().includes(query.toLowerCase())) ||
        (hero.biography && hero.biography.placeOfBirth && hero.biography.placeOfBirth.toLowerCase().includes(query.toLowerCase())) ||
        (hero.biography && hero.biography.alignment && hero.biography.alignment.toLowerCase().includes(query.toLowerCase()))
    );

    currentPage = 1;
    updateDisplay();
}

function sortTable(column) {
    if (currentSortColumn === column) {
        currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        currentSortColumn = column;
        currentSortDirection = 'asc';
    }

    filteredHeroes.sort((a, b) => {
        let aValue, bValue;

        switch (column) {
            case 'name':
                aValue = a.name || 'Unknown';
                bValue = b.name || 'Unknown';
                break;
            case 'fullName':
                aValue = a.biography.fullName || 'Unknown';
                bValue = b.biography.fullName || 'Unknown';
                break;
            case 'powerStats':
                aValue = a.powerstats.intelligence || 'Unknown';
                bValue = b.powerstats.intelligence || 'Unknown';
                break;
            case 'race':
                aValue = a.appearance.race || 'Unknown';
                bValue = b.appearance.race || 'Unknown';
                break;
            case 'gender':
                aValue = (a.appearance.gender && a.appearance.gender !== '-') ? a.appearance.gender : 'Unknown';
                bValue = (b.appearance.gender && b.appearance.gender !== '-') ? b.appearance.gender : 'Unknown';
                break;
            case 'height':
                aValue = (a.appearance.height[1] !== '0 cm') ? a.appearance.height[1] : 'Unknown';
                bValue = (b.appearance.height[1] !== '0 cm') ? b.appearance.height[1] : 'Unknown';
                break;
            case 'weight':
                aValue = (a.appearance.weight[1] !== '0 kg') ? a.appearance.weight[1] : 'Unknown';
                bValue = (b.appearance.weight[1] !== '0 kg') ? b.appearance.weight[1] : 'Unknown';
                break;
            case 'birthPlace':
                aValue = a.biography.placeOfBirth !== '-' ? a.biography.placeOfBirth : 'Unknown';
                bValue = b.biography.placeOfBirth !== '-' ? b.biography.placeOfBirth : 'Unknown';
                break;
            case 'alignment':
                aValue = (a.biography.alignment && a.biography.alignment !== '-') ? a.biography.alignment : 'Unknown';
                bValue = (b.biography.alignment && b.biography.alignment !== '-') ? b.biography.alignment : 'Unknown';
                break;
        }

        if (aValue === "Unknown" && bValue !== "Unknown") {
            return 1;
        } else if (bValue === "Unknown" && aValue !== "Unknown") {
            return -1;
        } else if (aValue === "Unknown" && bValue === "Unknown") {
            return 0;
        } else {
            if (currentSortDirection === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        }
    });

    updateDisplay();
}

function changePage(change) {
    currentPage += change;
    if (currentPage < 1) currentPage = 1;
    if (currentPage > Math.ceil(filteredHeroes.length / pageSize)) currentPage = Math.ceil(filteredHeroes.length / pageSize);
    updateDisplay();
}






document.getElementById('search').addEventListener('keyup', (e) => {
    if (latestSearchValue !== e.target.value) {
        latestSearchValue = e.target.value;
        searchHeroes(e.target.value);
    }
});

document.getElementById('pageSize').addEventListener('change', (e) => {
    pageSize = e.target.value === 'all' ? filteredHeroes.length : parseInt(e.target.value);
    if (e.target.value === 'all') {
        document.getElementById('pagination').style.display = 'none';
    } else {
        document.getElementById('pagination').style.display = 'block';
    }
    currentPage = 1;
    updateDisplay();
});
