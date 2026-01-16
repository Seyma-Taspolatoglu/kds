document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const playerId = urlParams.get('id');

    // Örnek oyuncu verileri (gerçek uygulamada API'den gelecek)
    const players = {
        '1': {
            name: 'Mauro Icardi',
            team: 'Galatasaray',
            age: 30,
            position: 'Forvet',
            value: '€45M',
            image: '/images/players/icardi.jpg',
            stats: {
                matches: 28,
                goals: 22,
                assists: 7,
                minutes: 2520
            }
        },
        // Diğer oyuncular...
    };

    const player = players[playerId];
    if (player) {
        document.getElementById('playerImage').src = player.image;
        document.getElementById('playerImage').alt = player.name;
        document.getElementById('playerName').textContent = player.name;
        document.getElementById('playerTeam').textContent = player.team;
        document.getElementById('playerAge').textContent = `${player.age} yaş`;
        document.getElementById('playerPosition').textContent = player.position;
        document.getElementById('playerValue').textContent = player.value;
        
        document.getElementById('matchCount').textContent = player.stats.matches;
        document.getElementById('goals').textContent = player.stats.goals;
        document.getElementById('assists').textContent = player.stats.assists;
        document.getElementById('minutes').textContent = player.stats.minutes;
    }
}); 