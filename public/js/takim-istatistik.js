document.addEventListener('DOMContentLoaded', () => {
    // Aylık Maç Sonuçları Grafiği
    const monthlyResultsCtx = document.getElementById('monthlyResults').getContext('2d');
    new Chart(monthlyResultsCtx, {
        type: 'bar',
        data: {
            labels: ['Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
            datasets: [
                {
                    label: 'Galibiyet',
                    data: [2, 3, 4, 3, 4, 3],
                    backgroundColor: '#4CAF50',
                    borderRadius: 5
                },
                {
                    label: 'Beraberlik',
                    data: [1, 1, 0, 1, 0, 2],
                    backgroundColor: '#FFC107',
                    borderRadius: 5
                },
                {
                    label: 'Mağlubiyet',
                    data: [0, 0, 0, 1, 0, 0],
                    backgroundColor: '#F44336',
                    borderRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                        stepSize: 1
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

    // Gol ve Asist Krallığı Grafiği
    const scorersCtx = document.getElementById('scorersChart').getContext('2d');
    new Chart(scorersCtx, {
        type: 'bar',
        data: {
            labels: ['Icardi', 'Zaha', 'Mertens', 'Kerem', 'Barış'],
            datasets: [
                {
                    label: 'Goller',
                    data: [15, 8, 6, 7, 5],
                    backgroundColor: '#2196F3',
                    borderRadius: 5
                },
                {
                    label: 'Asistler',
                    data: [5, 7, 9, 6, 4],
                    backgroundColor: '#9C27B0',
                    borderRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Gol Trendi Grafiği
    const goalTrendCtx = document.getElementById('goalTrend').getContext('2d');
    new Chart(goalTrendCtx, {
        type: 'line',
        data: {
            labels: ['Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
            datasets: [
                {
                    label: 'Atılan Goller',
                    data: [8, 12, 15, 10, 14, 11],
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Yenilen Goller',
                    data: [2, 4, 3, 6, 2, 5],
                    borderColor: '#F44336',
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 20
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Gol Krallığı Listesi
    const topScorers = [
        { name: 'Mauro Icardi', goals: 12, assists: 3 },
        { name: 'Wilfried Zaha', goals: 8, assists: 5 },
        { name: 'Kerem Aktürkoğlu', goals: 6, assists: 7 },
        { name: 'Hakim Ziyech', goals: 5, assists: 8 },
        { name: 'Dries Mertens', goals: 4, assists: 4 }
    ];

    const topScorersContainer = document.querySelector('.top-scorers');
    if (topScorersContainer) {
        topScorersContainer.innerHTML = `
            <table class="scorers-table">
                <thead>
                    <tr>
                        <th>Oyuncu</th>
                        <th>Gol</th>
                        <th>Asist</th>
                    </tr>
                </thead>
                <tbody>
                    ${topScorers.map(player => `
                        <tr>
                            <td>${player.name}</td>
                            <td>${player.goals}</td>
                            <td>${player.assists}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    // Genel Takım İstatistikleri Pasta Grafiği
    const generalStatsCtx = document.getElementById('generalStats').getContext('2d');
    new Chart(generalStatsCtx, {
        type: 'pie',
        data: {
            labels: [
                'Maç Başı Atılan Gol (2.94)',
                'Maç Başı Yenilen Gol (1.19)',
                'Karşılıklı Gol Oranı (%75)',
                'Toplam Gol Ortalaması (4.13)'
            ],
            datasets: [{
                data: [2.94, 1.19, 75, 4.13],
                backgroundColor: [
                    'rgba(76, 175, 80, 0.8)',  // Yeşil
                    'rgba(244, 67, 54, 0.8)',  // Kırmızı
                    'rgba(33, 150, 243, 0.8)', // Mavi
                    'rgba(255, 193, 7, 0.8)'   // Sarı
                ],
                borderColor: [
                    'rgba(76, 175, 80, 1)',
                    'rgba(244, 67, 54, 1)',
                    'rgba(33, 150, 243, 1)',
                    'rgba(255, 193, 7, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw;
                            if (label.includes('Karşılıklı')) {
                                return `${value}%`;
                            }
                            return value.toFixed(2);
                        }
                    }
                }
            }
        }
    });

    // Maaş Dağılımı Grafiği
    const salaryCtx = document.getElementById('salaryChart').getContext('2d');
    new Chart(salaryCtx, {
        type: 'bar',
        data: {
            labels: ['Forvet', 'Orta Saha', 'Savunma', 'Kaleci'],
            datasets: [
                {
                    label: 'Mevcut Maaş',
                    data: [15, 12, 10, 8],
                    backgroundColor: '#2196F3'
                },
                {
                    label: 'Projeksiyon',
                    data: [18, 14, 5, 9],
                    backgroundColor: '#4CAF50'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 20,
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
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

    // Maaş Projeksiyonu ve Limit Analizi Grafiği
    const skillsCtx = document.getElementById('skillsChart').getContext('2d');
    new Chart(skillsCtx, {
        type: 'line',
        data: {
            labels: ['2024', '2025', '2026', '2027'],
            datasets: [
                {
                    label: 'Toplam Maaş',
                    data: [45.2, 42.5, 37.8, 35.2], // Milyon Euro
                    borderColor: '#2196F3',
                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                    tension: 0.4,
                    fill: false,
                    pointRadius: 5,
                    pointBackgroundColor: '#2196F3'
                },
                {
                    label: 'Garanti Sözleşmeler',
                    data: [39.5, 35.2, 30.1, 25.8], // Milyon Euro
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.4,
                    fill: false,
                    pointRadius: 5,
                    pointBackgroundColor: '#4CAF50'
                },
                {
                    label: 'Maaş Limiti',
                    data: [57.0, 57.0, 57.0, 57.0], // Milyon Euro
                    borderColor: '#F44336',
                    borderDash: [5, 5],
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    tension: 0,
                    fill: false,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 60,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        stepSize: 15,
                        callback: function(value) {
                            return value + 'M €';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + 'M €';
                        }
                    }
                }
            }
        }
    });
}); 