document.addEventListener('DOMContentLoaded', () => {
    fetchTransfers();
    setupEventListeners();
    setupTeamButtons();
});

async function fetchTransfers() {
    try {
        const response = await fetch('/api/transfers');
        const transfers = await response.json();
        updateTransferStatus(transfers);
    } catch (error) {
        console.error('Transfer verileri alınamadı:', error);
    }
}

function updateTransferStatus(transfers) {
    const gorusulen = transfers.filter(t => t.status === 'Görüşülen').length;
    const anasilan = transfers.filter(t => t.status === 'Anlaşılan').length;
    const tamamlanan = transfers.filter(t => t.status === 'Tamamlanan').length;

    document.querySelector('.status-box:nth-child(1) .status-count').textContent = gorusulen;
    document.querySelector('.status-box:nth-child(2) .status-count').textContent = anasilan;
    document.querySelector('.status-box:nth-child(3) .status-count').textContent = tamamlanan;
}

function setupTeamButtons() {
    const gsButton = document.querySelector('.team-btn');
    gsButton.addEventListener('click', (e) => {
        e.preventDefault();
        showGalatasaraySquad();
    });
}

function showGalatasaraySquad() {
    // Ana içerik bölümlerini gizle
    document.querySelector('.live-updates').style.display = 'none';
    document.querySelector('.trending-players').style.display = 'none';
    
    // Galatasaray kadrosunu göster
    const squadDiv = document.getElementById('galatasaray-squad');
    squadDiv.style.display = 'block';
    
    // Oyuncuları getir
    fetchPlayers();
    setupFilters();
}

function showMainContent() {
    // Ana içeriği göster
    document.querySelector('.live-updates').style.display = 'block';
    document.querySelector('.trending-players').style.display = 'block';
    
    // Takım kadrosunu gizle
    document.getElementById('team-squad').style.display = 'none';
}

async function fetchPlayers(teamName) {
    try {
        const response = await fetch(`/api/players/team/${teamName}`);
        const players = await response.json();
        displayPlayers(players);
    } catch (error) {
        console.error('Oyuncu verileri alınamadı:', error);
    }
}

function displayPlayers(players) {
    const tbody = document.getElementById('squad-list');
    tbody.innerHTML = '';

    players.forEach(player => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${player.number}</td>
            <td>${player.name}</td>
            <td>${player.age}</td>
            <td>${player.position}</td>
            <td>${player.foot}</td>
            <td>${new Date(player.contractStart).toLocaleDateString('tr-TR')}</td>
            <td>${new Date(player.contractEnd).toLocaleDateString('tr-TR')}</td>
            <td>${player.marketValue}M €</td>
        `;
        tbody.appendChild(row);
    });
}

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const position = button.getAttribute('data-position');
            filterPlayersByPosition(position);
        });
    });
}

function filterPlayersByPosition(position) {
    const rows = document.querySelectorAll('#playersList tr');
    
    rows.forEach(row => {
        if (position === 'all' || row.getAttribute('data-position') === position) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function setupEventListeners() {
    setupNewsFilters();
    // ... diğer event listener'lar
}

function setupNewsFilters() {
    const filterButtons = document.querySelectorAll('.live-updates .filter-btn');
    const updateCards = document.querySelectorAll('.update-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Aktif buton stilini güncelle
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Seçilen kategoriyi al
            const selectedCategory = button.getAttribute('data-category');

            // Haberleri filtrele
            filterNews(selectedCategory);
        });
    });
}

function filterNews(category) {
    const updateCards = document.querySelectorAll('.update-card');
    
    updateCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        card.style.display = category === 'all' || cardCategory === category ? 'block' : 'none';
    });
}

// Sayfa yüklendiğinde tüm haberleri göster
document.addEventListener('DOMContentLoaded', () => {
    const updateCards = document.querySelectorAll('.update-card');
    updateCards.forEach(card => card.classList.add('visible'));
});

document.addEventListener('DOMContentLoaded', function() {
    // Takımlar menüsü toggle
    const teamsMenu = document.getElementById('teams-menu');
    const teamsSubmenu = teamsMenu.querySelector('.teams-submenu');
    const teamsToggle = teamsMenu.querySelector('.teams-toggle');
    
    teamsToggle.addEventListener('click', function(e) {
        e.preventDefault();
        const isHidden = teamsSubmenu.style.display === 'none';
        teamsSubmenu.style.display = isHidden ? 'block' : 'none';
    });

    // Menü dışına tıklandığında menüyü kapat
    document.addEventListener('click', function(e) {
        if (!teamsMenu.contains(e.target)) {
            teamsSubmenu.style.display = 'none';
        }
    });

    // Takım butonlarına tıklandığında
    const teamButtons = document.querySelectorAll('.team-btn');
    teamButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Seçilen takım:', this.textContent);
            teamsSubmenu.style.display = 'none';
        });
    });
});

// Takımları yükle
async function loadTeams() {
    try {
        const response = await fetch('/api/teams');
        const teams = await response.json();
        
        const teamButtons = document.querySelector('.team-buttons');
        teamButtons.innerHTML = teams.map(team => `
            <button class="team-btn" data-team="${team.takim}">
                ${team.takim}
            </button>
        `).join('');

        // Takım butonlarına tıklama olayı ekle
        document.querySelectorAll('.team-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const teamName = btn.textContent;
                // Takım sayfasına yönlendir
                window.location.href = `/team.html?team=${encodeURIComponent(teamName)}`;
            });
        });
    } catch (err) {
        console.error('Takımlar yüklenirken hata:', err);
    }
}

// Takım istatistiklerini gösteren tooltip
function showTeamTooltip(button, stats) {
    const tooltip = document.createElement('div');
    tooltip.className = 'team-tooltip';
    tooltip.innerHTML = `
        <h3>${stats.takim}</h3>
        <p>Oyuncu Sayısı: ${stats.oyuncuSayisi}</p>
        <p>Ortalama Değer: €${stats.ortDeger}M</p>
        <p>Toplam Değer: €${stats.toplamDeger}M</p>
    `;
    
    button.appendChild(tooltip);
}

function hideTeamTooltip() {
    const tooltips = document.querySelectorAll('.team-tooltip');
    tooltips.forEach(tooltip => tooltip.remove());
}

// Sayfa yüklendiğinde takımları yükle
document.addEventListener('DOMContentLoaded', loadTeams);

// Son transferleri yükle
async function loadRecentTransfers() {
    try {
        const response = await fetch('/api/transfers/recent');
        const transfers = await response.json();
        
        const transferList = document.getElementById('recent-transfers');
        transferList.innerHTML = transfers.map(transfer => `
            <div class="transfer-item">
                <div class="transfer-header">
                    <span class="player-name">${transfer.AdSoyad}</span>
                    <span class="transfer-date">${formatDate(transfer.TransferTarihi)}</span>
                </div>
                <div class="transfer-details">
                    <div class="transfer-teams">
                        ${transfer.EskiTakim} <i class="fas fa-arrow-right"></i> ${transfer.YeniTakim}
                    </div>
                    <div class="transfer-fee">
                        ${formatMoney(transfer.Bonservis)}
                    </div>
                </div>
            </div>
        `).join('');
    } catch (err) {
        console.error('Son transferler yüklenirken hata:', err);
    }
}

// Tarih formatla
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long'
    });
}

// Para formatla
function formatMoney(amount) {
    if (!amount) return 'Bedelsiz';
    return `€${(amount/1000000).toFixed(1)}M`;
}

// Sayfa yüklendiğinde çağır
document.addEventListener('DOMContentLoaded', () => {
    loadRecentTransfers();
});

// Takım butonlarına tıklama olayı ekle
document.querySelectorAll('.team-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        const teamName = btn.textContent;
        
        // Ana içerik alanını temizle
        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML = '<div class="loading">Yükleniyor...</div>';

        try {
            // Takım detaylarını yükle
            const response = await fetch(`/api/teams/${encodeURIComponent(teamName)}`);
            const teamData = await response.json();

            // İçeriği güncelle
            mainContent.innerHTML = `
                <div class="team-header">
                    <div class="team-info">
                        <h1>${teamName}</h1>
                    </div>
                    <div class="team-stats">
                        <div class="stat-item">
                            <span class="stat-label">Kadro Değeri</span>
                            <span class="stat-value">€${teamData.toplamDeger}M</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Oyuncu Sayısı</span>
                            <span class="stat-value">${teamData.oyuncuSayisi}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Yaş Ortalaması</span>
                            <span class="stat-value">${teamData.yasOrtalamasi}</span>
                        </div>
                    </div>
                </div>

                <div class="content-grid">
                    <div class="section-card">
                        <div class="section-header">
                            <h2><i class="fas fa-users"></i> Takım Kadrosu</h2>
                        </div>
                        <div class="squad-list" id="squadList">
                            <!-- Kadro bilgileri yüklenecek -->
                        </div>
                    </div>

                    <div class="section-card">
                        <div class="section-header">
                            <h2><i class="fas fa-history"></i> Transfer Geçmişi</h2>
                        </div>
                        <div class="transfers-list" id="transfersList">
                            <!-- Transfer geçmişi yüklenecek -->
                        </div>
                    </div>
                </div>
            `;

            // Kadro ve transfer geçmişini yükle
            loadSquad(teamName);
            loadTransferHistory(teamName);

        } catch (err) {
            console.error('Takım detayları yüklenirken hata:', err);
            mainContent.innerHTML = `
                <div class="error-message">
                    <h2>Bir hata oluştu</h2>
                    <p>${err.message}</p>
                </div>
            `;
        }
    });
});

// Kadro bilgilerini yükle
async function loadSquad(teamName) {
    try {
        const response = await fetch(`/api/players/team/${encodeURIComponent(teamName)}`);
        const players = await response.json();
        
        const squadList = document.getElementById('squadList');
        squadList.innerHTML = players.map(player => `
            <div class="player-card">
                <div class="player-info">
                    <h3>${player.AdSoyad}</h3>
                    <span class="player-position">${player.Mevki}</span>
                </div>
                <div class="player-value">€${player.Deger}M</div>
            </div>
        `).join('');
    } catch (err) {
        console.error('Kadro yüklenirken hata:', err);
    }
}

// Transfer geçmişini yükle
async function loadTransferHistory(teamName) {
    try {
        const response = await fetch(`/api/transfers/team/${encodeURIComponent(teamName)}`);
        const transfers = await response.json();
        
        const transfersList = document.getElementById('transfersList');
        transfersList.innerHTML = transfers.map(transfer => `
            <div class="transfer-item">
                <div class="transfer-info">
                    <span class="player-name">${transfer.AdSoyad}</span>
                    <div class="transfer-details">
                        ${transfer.EskiTakim} → ${transfer.YeniTakim}
                    </div>
                </div>
                <div class="transfer-value">€${transfer.Bonservis}M</div>
            </div>
        `).join('');
    } catch (err) {
        console.error('Transfer geçmişi yüklenirken hata:', err);
    }
}

// Grafik yapılandırmaları
const chartConfigs = {
    ageDistribution: {
        type: 'pie',
        data: {
            labels: ['18-21', '22-25', '26-29', '30+'],
            datasets: [{
                data: [15, 35, 30, 20],
                backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#F44336']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: { display: true, text: 'Oyuncu Yaş Dağılımı' }
            }
        }
    },
    positionDistribution: {
        type: 'pie',
        data: {
            labels: ['Kaleci', 'Defans', 'Orta Saha', 'Forvet'],
            datasets: [{
                data: [10, 35, 40, 15],
                backgroundColor: ['#E91E63', '#9C27B0', '#3F51B5', '#00BCD4']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: { display: true, text: 'Pozisyonlara Göre Dağılım' }
            }
        }
    },
    performanceTrend: {
        type: 'line',
        data: {
            labels: ['Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık', 'Ocak'],
            datasets: [{
                label: 'Gol',
                data: [2, 3, 1, 4, 2, 3],
                borderColor: '#4CAF50'
            }, {
                label: 'Asist',
                data: [1, 2, 3, 1, 2, 4],
                borderColor: '#2196F3'
            }]
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true } }
        }
    }
};

// İstatistikler için tek bir event listener
document.addEventListener('DOMContentLoaded', () => {
    const statsLink = document.querySelector('a[href="/statistics.html"]');
    if (statsLink) {
        statsLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Ana içerik alanını güncelle
            const mainContent = document.querySelector('.main-content');
            mainContent.innerHTML = `
                <div class="stats-container">
                    <div class="stats-header">
                        <h1>Oyuncu İstatistikleri</h1>
                    </div>
                    
                    <div class="stats-grid">
                        <div class="chart-card">
                            <div class="chart-header">
                                <h3>Yaş Dağılımı</h3>
                            </div>
                            <canvas id="ageChart"></canvas>
                        </div>
                        
                        <div class="chart-card">
                            <div class="chart-header">
                                <h3>Pozisyon Dağılımı</h3>
                            </div>
                            <canvas id="positionChart"></canvas>
                        </div>
                        
                        <div class="chart-card">
                            <div class="chart-header">
                                <h3>Performans Trendi</h3>
                            </div>
                            <canvas id="performanceChart"></canvas>
                        </div>
                    </div>
                </div>
            `;

            // Grafikleri oluştur
            setTimeout(() => {
                createAgeChart();
                createPositionChart();
                createPerformanceChart();
            }, 100);
        });
    }
});

// Grafikleri oluşturan fonksiyon
function createCharts() {
    // Yaş Dağılımı
    new Chart(document.getElementById('ageChart'), chartConfigs.ageDistribution);

    // Pozisyon Dağılımı
    new Chart(document.getElementById('positionChart'), chartConfigs.positionDistribution);

    // Performans Grafiği
    new Chart(document.getElementById('performanceChart'), chartConfigs.performanceTrend);
}

// Yaş dağılımı grafiği
function createAgeChart() {
    const ctx = document.getElementById('ageChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['18-21 Yaş', '22-25 Yaş', '26-29 Yaş', '30+ Yaş'],
            datasets: [{
                data: [15, 35, 30, 20],
                backgroundColor: [
                    '#E91E63',  // Pembe
                    '#9C27B0',  // Mor
                    '#3F51B5',  // Lacivert
                    '#00BCD4'   // Turkuaz
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: { 
                    display: true, 
                    text: 'Yaş Dağılımı',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    position: 'right',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

// Pozisyon dağılımı grafiği
function createPositionChart() {
    const ctx = document.getElementById('positionChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Kaleci', 'Defans', 'Orta Saha', 'Forvet'],
            datasets: [{
                data: [10, 35, 40, 15],
                backgroundColor: ['#E91E63', '#9C27B0', '#3F51B5', '#00BCD4']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: { display: true, text: 'Pozisyonlara Göre Dağılım' }
            }
        }
    });
}

// Performans trendi grafiği
function createPerformanceChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
            datasets: [{
                label: 'Gol',
                data: [3, 5, 2, 4, 6],
                borderColor: '#FF6384',
                fill: false
            }, {
                label: 'Asist',
                data: [2, 3, 4, 2, 5],
                borderColor: '#36A2EB',
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Ana Sayfa butonuna tıklandığında
document.addEventListener('DOMContentLoaded', () => {
    const homeLink = document.querySelector('nav ul li:first-child a');
    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.reload();
    });
});

// Sayfa yüklendiğinde veritabanı bağlantısını test et
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/teams');
        const teams = await response.json();
        console.log('Veritabanı bağlantısı başarılı:', teams);
    } catch (error) {
        console.error('Veritabanı bağlantı hatası:', error);
    }
});

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Takımları getir
        const teamsResponse = await fetch('/api/teams');
        const teams = await teamsResponse.json();
        console.log('Takımlar:', teams);

        // Transferleri getir
        const transfersResponse = await fetch('/api/transfers');
        const transfers = await transfersResponse.json();
        console.log('Transferler:', transfers);

        // Oyuncuları getir
        const playersResponse = await fetch('/api/players');
        const players = await playersResponse.json();
        console.log('Oyuncular:', players);

    } catch (error) {
        console.error('Veri çekme hatası:', error);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Takımlar menüsü toggle
    const teamsMenu = document.getElementById('teams-menu');
    const teamsSubmenu = teamsMenu.querySelector('.teams-submenu');
    const teamsToggle = teamsMenu.querySelector('.teams-toggle');
    
    teamsToggle.addEventListener('click', function(e) {
        e.preventDefault();
        const isHidden = teamsSubmenu.style.display === 'none';
        teamsSubmenu.style.display = isHidden ? 'block' : 'none';
    });

    // Menü dışına tıklandığında menüyü kapat
    document.addEventListener('click', function(e) {
        if (!teamsMenu.contains(e.target)) {
            teamsSubmenu.style.display = 'none';
        }
    });

    // Takım butonlarına tıklandığında
    const teamButtons = document.querySelectorAll('.team-btn');
    teamButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Seçilen takım:', this.textContent);
            teamsSubmenu.style.display = 'none';
        });
    });
});

const players = [
    {
        name: 'Mauro Icardi',
        photo: 'images/players/icardi.jpg',
        position: 'Forvet'
    },
    // Diğer oyuncular...
];

players.forEach(player => {
    const playerCard = document.createElement('div');
    playerCard.classList.add('player-card');
    playerCard.innerHTML = `
        <img src="${player.photo}" alt="${player.name}" class="player-photo">
        <div class="player-info">
            <h3>${player.name}</h3>
            <p>${player.position}</p>
        </div>
    `;
    document.querySelector('.team-roster').appendChild(playerCard);
});

// En değerli oyuncuları yükle
function loadTopPlayers() {
    const topPlayers = [
        {
            name: 'Mauro Icardi',
            team: 'Galatasaray',
            value: '31.5M €',
            image: 'images/players/icardi.jpg'  // players klasöründeki fotoğraf
        },
        {
            name: 'Wilfried Zaha',
            team: 'Galatasaray',
            value: '25.2M €',
            image: 'images/players/zaha.jpg'    // players klasöründeki fotoğraf
        },
        {
            name: 'Davinson Sanchez',
            team: 'Galatasaray',
            value: '18M €',
            image: 'images/players/davinson-sanchez.jpg'  // players klasöründeki fotoğraf
        },
        {
            name: 'Dries Mertens',
            team: 'Galatasaray',
            value: '15.8M €',
            image: 'images/players/mertens.jpg'  // players klasöründeki fotoğraf
        },
        {
            name: 'Lucas Torreira',
            team: 'Galatasaray',
            value: '15M €',
            image: 'images/players/torreira.jpg'  // players klasöründeki fotoğraf
        }
    ];

    const container = document.querySelector('.top-players .grid-container');
    if (container) {
        container.innerHTML = topPlayers.map(player => `
            <div class="grid-item">
                <div class="player-image">
                    <img src="${player.image}" alt="${player.name}" onerror="this.src='images/players/default-player.jpg'">
                </div>
                <div class="player-info">
                    <h3>${player.name}</h3>
                    <span class="team">${player.team}</span>
                    <span class="value">${player.value}</span>
                </div>
            </div>
        `).join('');
    }
} 