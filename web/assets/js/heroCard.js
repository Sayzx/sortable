function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

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
                    <p id="group"><strong>Slug:</strong> ${hero.slug}</p>
                    <p id="group"><strong>Power Stats:</strong>
                     🧠 ${hero.powerstats.intelligence}, 
                     💪 ${hero.powerstats.strength}, 
                     🏃 ${hero.powerstats.speed}, 
                     🛡️ ${hero.powerstats.durability}, 
                     ⚡ ${hero.powerstats.power}, 
                     🗡️ ${hero.powerstats.combat}</p>

                    <h3>Appearance</h3>
                    <p id="group"><strong>Gender:</strong> ${hero.appearance.gender}</p>
                    <p id="group"><strong>Race:</strong> ${hero.appearance.race || 'Unknown'}</p>
                    <p id="group"><strong>Height:</strong> ${hero.appearance.height.join(' / ')}</p>
                    <p id="group"><strong>Weight:</strong> ${hero.appearance.weight.join(' / ')}</p>
                    <p id="group"><strong>Eye Color:</strong> ${hero.appearance.eyeColor}</p>
                    <p id="group"><strong>Hair Color:</strong> ${hero.appearance.hairColor}</p>

                    <h3>Biography</h3>
                    <p id="group"><strong>Full Name:</strong> ${hero.biography.fullName || 'Unknown'}</p>
                    <p id="group"><strong>Alter Egos:</strong> ${hero.biography.alterEgos}</p>
                    <p id="group"><strong>Aliases:</strong> ${hero.biography.aliases.join(', ')}</p>
                    <p id="group"><strong>Place of Birth:</strong> ${hero.biography.placeOfBirth || 'Unknown'}</p>
                    <p id="group"><strong>First Appearance:</strong> ${hero.biography.firstAppearance}</p>
                    <p id="group"><strong>Publisher:</strong> ${hero.biography.publisher}</p>
                    <p id="group"><strong>Alignment:</strong> ${hero.biography.alignment}</p>

                    <h3>Work</h3>
                    <p id="group"><strong>Occupation:</strong> ${hero.work.occupation}</p>
                    <p id="group"><strong>Base:</strong> ${hero.work.base}</p>

                    <h3>Connections</h3>
                    <p id="group"><strong>Group Affiliation:</strong> ${hero.connections.groupAffiliation}</p>
                    <p id="group"><strong>Relatives:</strong> ${hero.connections.relatives}</p>
                </div>
            `;
                } else {
                    window.location.href = 'http://localhost:8080/t-essaye-de-faire-quoi-la-enzo-une-fois-mais-pas-2';
                }
            })
            .catch(error => {
                console.error('Error fetching hero data:', error);
            });
    } else {
        window.location.href = 'http://localhost:8080/t-essaye-de-faire-quoi-la-enzo-une-fois-mais-pas-2';
    }
});