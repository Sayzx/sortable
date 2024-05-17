

// i get id on url link beacuse hero id is on link page
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// On page load i get api and i take the all information of the hero by id
document.addEventListener('DOMContentLoaded', () => {
    const heroId = getQueryParam('id');
    if (heroId) {
        fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
            .then(response => response.json())
            .then(data => {
                const hero = data.find(h => h.id.toString() === heroId);
                if (hero) {
                    const heroInfoDiv = document.getElementById('hero-info');
                    heroInfoDiv.innerHTML = `
                <div class="hero-card">
                    <img src="${hero.images.sm}" alt="${hero.name}" class="hero-image">
                    <h2>${hero.name}</h2>
                    <p><strong>Full Name:</strong> ${hero.biography.fullName || 'Unknown'}</p>
                    <p><strong>Power Stats:</strong>
                     🧠 ${hero.powerstats.intelligence}, 
                     💪 ${hero.powerstats.strength}, 
                     🏃 ${hero.powerstats.speed}, 
                     🛡️ ${hero.powerstats.durability}, 
                     ⚡ ${hero.powerstats.power}, 
                     🗡️ ${hero.powerstats.combat}</p>
                    <p><strong>Race:</strong> ${hero.appearance.race || 'Unknown'}</p>
                    <p><strong>Gender:</strong> ${hero.appearance.gender}</p>
                    <p><strong>Height:</strong> ${hero.appearance.height.join(' / ')}</p>
                    <p><strong>Weight:</strong> ${hero.appearance.weight.join(' / ')}</p>
                    <p><strong>Birth Place:</strong> ${hero.biography.placeOfBirth || 'Unknown'}</p>
                    <p><strong>Alignment:</strong> ${hero.biography.alignment}</p>
                    <p><strong>Occupation:</strong> ${hero.work.occupation}</p>
                    <p><strong>Base:</strong> ${hero.work.base}</p>
                    <p id="group"><strong>Group Affiliation:</strong> ${hero.connections.groupAffiliation}</p>
                    <p id="group"><strong>Relatives:</strong> ${hero.connections.relatives}</p>

                    <h3>Biography</h3>
                    <p>${hero.biography.publisher}</p>
                    <p>${hero.biography.firstAppearance}</p>
                </div>
            `;
                } else {
                    document.getElementById('hero-info').innerText = 'Hero not found.';
                }
            })
            .catch(error => {
                console.error('Error fetching hero data:', error);
            });
    } else {
        document.getElementById('hero-info').innerText = 'No hero ID provided in the URL.';
    }
});