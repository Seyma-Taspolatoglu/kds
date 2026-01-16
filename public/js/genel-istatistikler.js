document.addEventListener('DOMContentLoaded', () => {
    // Tab değiştirme işlevi
    const tabs = document.querySelectorAll('.tab-btn');
    const panes = document.querySelectorAll('.tab-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));
            
            tab.classList.add('active');
            document.querySelector(`#${tab.dataset.tab}`).classList.add('active');
        });
    });

    // Gol İstatistikleri Grafikleri
    const goalsChart = new Chart(document.getElementById('goalsChart'), {
        type: 'bar',
        data: {
            labels: ['Galatasaray', 'Fenerbahçe', 'Beşiktaş', 'Samsunspor', 'Göztepe', 'Eyüpspor'],
            datasets: [{
                label: 'Atılan Goller',
                data: [44, 59, 35, 28, 25, 22],
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }, {
                label: 'Yenilen Goller',
                data: [16, 17, 27, 35, 30, 32],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '2023-24 Sezonu Gol İstatistikleri'
                }
            }
        }
    });

    // Top Hakimiyeti ve Pas İstatistikleri
    const possessionChart = new Chart(document.getElementById('possessionChart'), {
        type: 'bar',
        data: {
            labels: ['Galatasaray', 'Fenerbahçe', 'Beşiktaş', 'Samsunspor', 'Göztepe', 'Eyüpspor'],
            datasets: [{
                label: 'Top Hakimiyeti (%)',
                data: [65, 63, 58, 52, 50, 48],
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }, {
                label: 'Pas İsabet (%)',
                data: [88, 87, 84, 80, 78, 76],
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Top Hakimiyeti ve Pas İstatistikleri'
                }
            }
        }
    });

    // Şut ve İsabet Profili
    const shotsChart = new Chart(document.getElementById('shotsChart'), {
        type: 'line',
        data: {
            labels: ['Galatasaray', 'Fenerbahçe', 'Beşiktaş', 'Samsunspor', 'Göztepe', 'Eyüpspor'],
            datasets: [{
                label: 'Toplam Şut',
                data: [265, 285, 245, 210, 195, 180],
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            }, {
                label: 'İsabetli Şut',
                data: [128, 132, 115, 95, 85, 78],
                borderColor: 'rgb(54, 162, 235)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Şut İstatistikleri'
                }
            }
        }
    });

    // Gol Dakika Dağılımı
    const goalTimingChart = new Chart(document.getElementById('goalTimingHeatmap'), {
        type: 'bar',
        data: {
            labels: ['0-15', '16-30', '31-45', '45+', '46-60', '61-75', '76-90', '90+'],
            datasets: [{
                label: 'Atılan Goller',
                data: [42, 55, 48, 12, 58, 65, 72, 18],
                backgroundColor: 'rgba(255, 159, 64, 0.5)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Gol Dakika Dağılımı'
                }
            }
        }
    });

    // Gol Krallığı ve Asist Sıralaması
    const scorersChart = new Chart(document.getElementById('scorersChart'), {
        type: 'bar',
        data: {
            labels: ['Edin Dzeko', 'Mauro Icardi', 'Fred', 'Sebastian Szymanski', 'Michy Batshuayi'],
            datasets: [{
                label: 'Goller',
                data: [15, 13, 11, 10, 10],
                backgroundColor: 'rgba(255, 159, 64, 0.5)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }, {
                label: 'Asistler',
                data: [3, 4, 5, 7, 2],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '2023-24 Sezonu Gol ve Asist Krallığı'
                },
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Sayı'
                    }
                }
            }
        }
    });

    // Kart İstatistikleri
    const cardsRadarChart = new Chart(document.getElementById('cardsRadarChart'), {
        type: 'bar',
        data: {
            labels: ['Galatasaray', 'Fenerbahçe', 'Beşiktaş', 'Samsunspor', 'Göztepe', 'Eyüpspor'],
            datasets: [{
                label: 'Sarı Kart',
                data: [45, 48, 57, 52, 50, 49],
                backgroundColor: 'rgba(255, 206, 86, 0.5)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            }, {
                label: 'Kırmızı Kart',
                data: [2, 1, 3, 4, 3, 2],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '2023-24 Sezonu Kart İstatistikleri'
                },
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Kart Sayısı'
                    }
                }
            }
        }
    });
}); 