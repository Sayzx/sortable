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
            return currentSortDirection === 'asc' ? '▼' : '▲';
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
                <td>${hero.appearance.gender || 'Unknown'}</td>
                <td>${hero.appearance.height[1] || 'Unknown'}</td>
                <td>${hero.appearance.weight[1] || 'Unknown'}</td>
                <td>${hero.biography.placeOfBirth || 'Unknown'}</td>
                <td>${hero.biography.alignment || 'Unknown'}</td>
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
                aValue = a.name || '';
                bValue = b.name || '';
                break;
            case 'fullName':
                aValue = a.biography.fullName || '';
                bValue = b.biography.fullName || '';
                break;
            case 'powerStats':
                aValue = a.powerstats.intelligence || 0;
                bValue = b.powerstats.intelligence || 0;
                break;
            case 'race':
                aValue = a.appearance.race || '';
                bValue = b.appearance.race || '';
                break;
            case 'gender':
                aValue = a.appearance.gender || '';
                bValue = b.appearance.gender || '';
                break;
            case 'height':
                aValue = parseInt(a.appearance.height[1]) || 0;
                bValue = parseInt(b.appearance.height[1]) || 0;
                break;
            case 'weight':
                aValue = parseInt(a.appearance.weight[1]) || 0;
                bValue = parseInt(b.appearance.weight[1]) || 0;
                break;
            case 'birthPlace':
                aValue = a.biography.placeOfBirth || '';
                bValue = b.biography.placeOfBirth || '';
                break;
            case 'alignment':
                aValue = a.biography.alignment || '';
                bValue = b.biography.alignment || '';
                break;
            default:
                return 0;
        }

        if (currentSortDirection === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

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

function changePage(change) {
    currentPage += change;
    if (currentPage < 1) currentPage = 1;
    if (currentPage > Math.ceil(filteredHeroes.length / pageSize)) currentPage = Math.ceil(filteredHeroes.length / pageSize);
    updateDisplay();
}
