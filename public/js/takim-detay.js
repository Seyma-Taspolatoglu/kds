document.addEventListener('DOMContentLoaded', () => {
    // Sekme değiştirme işlevi
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Aktif sekme butonunu değiştir
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // İlgili içeriği göster
            const tabId = button.getAttribute('data-tab');
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === tabId) {
                    pane.classList.add('active');
                }
            });

            // İçeriği yükle
            loadTabContent(tabId);
        });
    });

    // Sekme içeriğini yükleme fonksiyonu
    function loadTabContent(tabId) {
        switch(tabId) {
            case 'squad':
                loadSquad();
                break;
            case 'stats':
                loadStats();
                break;
            case 'transfers':
                loadTransfers();
                break;
        }
    }

    // İlk içeriği yükle
    loadSquad();
});

// Kadro yükleme fonksiyonu
function loadSquad() {
    const players = [
        // Kaleciler
        {
            name: "Fernando Muslera",
            position: "Kaleci",
            number: "1",
            nationality: "Uruguay",
            age: "37",
            value: "2.5M €",
            image: "images/players/muslera.jpg"
        },
        {
            name: "Günay Güvenç",
            position: "Kaleci",
            number: "34",
            nationality: "Türkiye",
            age: "32",
            value: "1.2M €",
            image: "images/players/gunay.jpg"
        },
        {
            name: "Batuhan Şen",
            position: "Kaleci",
            number: "61",
            nationality: "Türkiye",
            age: "21",
            value: "0.5M €",
            image: "images/players/batuhan.jpg"
        },
        // Defans
        {
            name: "Davinson Sanchez",
            position: "Defans",
            number: "6",
            nationality: "Kolombiya",
            age: "27",
            value: "18M €",
            image: "public/images/players/davinson-sanchez.jpg"
        },
        {
            name: "Victor Nelsson",
            position: "Defans",
            number: "25",
            nationality: "Danimarka",
            age: "25",
            value: "15M €",
            image: "images/players/nelsson.jpg"
        },
        {
            name: "Abdülkerim Bardakcı",
            position: "Defans",
            number: "42",
            nationality: "Türkiye",
            age: "29",
            value: "5M €",
            image: "images/players/bardakci.jpg"
        },
        {
            name: "Kaan Ayhan",
            position: "Defans",
            number: "5",
            nationality: "Türkiye",
            age: "29",
            value: "6M €",
            image: "images/players/ayhan.jpg"
        },
        {
            name: "Elias Jelert",
            position: "Defans",
            number: "2",
            nationality: "Danimarka",
            age: "20",
            value: "4M €",
            image: "images/players/jelert.jpg"
        },
        // Orta Saha
        {
            name: "Lucas Torreira",
            position: "Orta Saha",
            number: "34",
            nationality: "Uruguay",
            age: "27",
            value: "20M €",
            image: "images/players/torreira.jpg"
        },
        {
            name: "Kerem Demirbay",
            position: "Orta Saha",
            number: "21",
            nationality: "Türkiye",
            age: "30",
            value: "12M €",
            image: "images/players/demirbay.jpg"
        },
        {
            name: "Berkan Kutlu",
            position: "Orta Saha",
            number: "18",
            nationality: "Türkiye",
            age: "25",
            value: "3.5M €",
            image: "images/players/kutlu.jpg"
        },
        {
            name: "Hakim Ziyech",
            position: "Orta Saha",
            number: "7",
            nationality: "Fas",
            age: "30",
            value: "15M €",
            image: "images/players/ziyech.jpg"
        },
        // Forvet
        {
            name: "Mauro Icardi",
            position: "Forvet",
            number: "9",
            nationality: "Arjantin",
            age: "30",
            value: "25M €",
            image: "images/players/icardi.jpg"
        },
        {
            name: "Dries Mertens",
            position: "Forvet",
            number: "10",
            nationality: "Belçika",
            age: "36",
            value: "4M €",
            image: "images/players/mertens.jpg"
        },
        {
            name: "Barış Alper Yılmaz",
            position: "Forvet",
            number: "11",
            nationality: "Türkiye",
            age: "23",
            value: "8M €",
            image: "images/players/baris.jpg"
        },
        {
            name: "Michy Batshuayi",
            position: "Forvet",
            number: "23",
            nationality: "Belçika",
            age: "30",
            value: "10M €",
            image: "images/players/batshuayi.jpg"
        }
    ];

    // Pozisyon filtreleme işlevi
    const filterButtons = document.querySelectorAll('.squad-filters .filter-btn');
    let currentFilter = 'Tümü';

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Aktif filtre butonunu güncelle
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filtre değerini al ve oyuncuları filtrele
            currentFilter = button.textContent.trim();
            displayPlayers(currentFilter);
        });
    });

    function displayPlayers(filter) {
        let filteredPlayers;
        
        switch(filter) {
            case 'Kaleciler':
                filteredPlayers = players.filter(player => player.position === 'Kaleci');
                break;
            case 'Defans':
                filteredPlayers = players.filter(player => player.position === 'Defans');
                break;
            case 'Orta Saha':
                filteredPlayers = players.filter(player => player.position === 'Orta Saha');
                break;
            case 'Forvet':
                filteredPlayers = players.filter(player => player.position === 'Forvet');
                break;
            default:
                filteredPlayers = players;
        }

        const container = document.getElementById('playersContainer');
        
        if (filteredPlayers.length === 0) {
            container.innerHTML = '<div class="no-players">Bu pozisyonda oyuncu bulunamadı.</div>';
            return;
        }

        container.innerHTML = filteredPlayers.map(player => {
            // Oyuncunun ID'sini adından oluştur
            const playerId = player.name.toLowerCase().replace(/\s+/g, '');
            
            return `
                <div class="player-card ${player.position.toLowerCase().replace(' ', '-')}" 
                     onclick="window.location.href='oyuncu-detay.html?id=${playerId}'">
                    <div class="player-image">
                        <img src="${player.image}" alt="${player.name}">
                        <span class="player-number">${player.number}</span>
                    </div>
                    <div class="player-info">
                        <h3>${player.name}</h3>
                        <div class="player-details">
                            <span class="position">${player.position}</span>
                            <span class="nationality">${player.nationality}</span>
                            <span class="age">${player.age} yaş</span>
                            <span class="value">${player.value}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // İlk yükleme
    displayPlayers('Tümü');
}

// İstatistik yükleme fonksiyonu
function loadStats() {
    // İstatistikler burada yüklenecek
}

// Transfer yükleme fonksiyonu
function loadTransfers() {
    // Transferler burada yüklenecek
}