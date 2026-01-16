document.addEventListener('DOMContentLoaded', () => {
    // Performans grafiği
    const perfCtx = document.getElementById('performanceChart').getContext('2d');
    new Chart(perfCtx, {
        type: 'line',
        data: {
            labels: ['Ağu', 'Eyl', 'Eki', 'Kas', 'Ara', 'Oca'],
            datasets: [{
                label: 'Maç Puanı',
                data: [7.2, 7.5, 7.8, 7.4, 7.6, 7.9],
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    min: 6,
                    max: 8,
                    ticks: {
                        stepSize: 0.2
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Piyasa değeri grafiği
    const valueCtx = document.getElementById('valueChart').getContext('2d');
    new Chart(valueCtx, {
        type: 'line',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023'],
            datasets: [{
                label: 'Piyasa Değeri (M €)',
                data: [12, 10, 8, 5, 2.5],
                borderColor: '#2196F3',
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + 'M €';
                        }
                    }
                }
            }
        }
    });

    // Radar Chart (Maç Başına İstatistikler)
    const radarCtx = document.getElementById('radarChart').getContext('2d');
    new Chart(radarCtx, {
        type: 'radar',
        data: {
            labels: [
                'Kurtarış',
                'Gol Yemediği Maç',
                'Maç Başı Kurtarış',
                'Başarılı Degaj',
                'Hava Topu',
                'Penaltı Kurtarışı'
            ],
            datasets: [{
                label: '2023/24 Sezonu',
                data: [84, 12, 3.5, 92, 85, 75],
                backgroundColor: 'rgba(227, 10, 23, 0.2)',
                borderColor: '#E30A17',
                pointBackgroundColor: '#E30A17',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#E30A17',
                borderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(0, 0, 0, 0.1)',
                        lineWidth: 1
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)',
                        circular: true
                    },
                    pointLabels: {
                        font: {
                            size: 12,
                            weight: '500'
                        },
                        color: '#666'
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: {
                        stepSize: 20,
                        backdropColor: 'transparent',
                        color: '#999'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: {
                        size: 13,
                        weight: '600'
                    },
                    bodyFont: {
                        size: 12
                    },
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return context.parsed.r + '%';
                        }
                    }
                }
            }
        }
    });

    // İstatistik kartları animasyonu
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate-in');
        }, index * 100);
    });

    // URL'den oyuncu ID'sini al ve ilgili verileri yükle
    const urlParams = new URLSearchParams(window.location.search);
    const playerId = urlParams.get('id');
    if (playerId) {
        loadPlayerData(playerId);
    }
});

// Oyuncu verilerini yükleme fonksiyonu
function loadPlayerData(playerId) {
    // Burada API'den veya veritabanından oyuncu verileri çekilecek
    // Şimdilik örnek veri kullanıyoruz
    const playerData = {
        name: "Fernando Muslera",
        position: "Kaleci",
        number: "1",
        nationality: "Uruguay",
        age: "37",
        height: "190 cm",
        weight: "84 kg",
        foot: "Sağ",
        joinDate: "1 Temmuz 2011",
        contractEnd: "30 Haziran 2024",
        value: "2.5M €"
    };

    // Oyuncu verilerini sayfaya yerleştir
    updatePlayerInfo(playerData);
}

// Oyuncu bilgilerini güncelleme fonksiyonu
function updatePlayerInfo(data) {
    document.querySelector('.player-name h1').textContent = data.name;
    document.querySelector('.player-position').textContent = data.position;
    document.querySelector('.player-number').textContent = `#${data.number}`;
    
    // Meta bilgilerini güncelle
    const metaItems = document.querySelectorAll('.meta-item');
    metaItems[0].querySelector('span').textContent = data.nationality;
    metaItems[1].querySelector('span').textContent = `${data.age} yaş`;
    metaItems[2].querySelector('span').textContent = data.height;
    metaItems[3].querySelector('span').textContent = data.value;
}