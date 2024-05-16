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
        return '▲';
    };

    tableHTML +=
        `<tr>
            <th class="thClickable" onclick="sortTable('icon')">Icon</th>
            <th class="thClickable" onclick="sortTable('name')">Name <span class="arrow">${getArrow('name')}</span></th>
            <th class="thClickable" onclick="sortTable('fullName')">Full Name <span class="arrow">${getArrow('fullName')}</span></th>
            <th class="thClickable" onclick="sortTable('powerStats')">Powerstats <span class="arrow">${getArrow('powerStats')}</span></th>
            <th class="thClickable" onclick="sortTable('race')">Race <span class="arrow">${getArrow('race')}</span></th>
            <th class="thClickable" onclick="sortTable('gender')">Gender <span class="arrow">${getArrow('gender')}</span></th>
            <th class="thClickable" onclick="sortTable('birthPlace')">Birth Place <span class="arrow">${getArrow('birthPlace')}</span></th>
            <th class="thClickable" onclick="sortTable('weight')">Weight <span class="arrow">${getArrow('weight')}</span></th>
            <th class="thClickable" onclick="sortTable('alignment')">Alignment <span class="arrow">${getArrow('alignment')}</span></th>
        </tr>`;

    selectedHeroes.forEach(hero => {
        tableHTML +=
            `<tr>
                <td><a href="info.html?id=${hero.id}"><img src="${hero.images.xs}" alt="icon" /></a></td>
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
            case 'birthPlace':
                aValue = a.biography.placeOfBirth || '';
                bValue = b.biography.placeOfBirth || '';
                break;
            case 'weight':
                aValue = parseInt(a.appearance.weight[1]) || 0;
                bValue = parseInt(b.appearance.weight[1]) || 0;
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
