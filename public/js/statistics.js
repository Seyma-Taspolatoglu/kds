document.addEventListener('DOMContentLoaded', async () => {
    // Transfer Harcamaları Grafiği
    const transferCtx = document.getElementById('transferChart').getContext('2d');
    new Chart(transferCtx, {
        type: 'line',
        data: {
            labels: ['Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık', 'Ocak'],
            datasets: [{
                label: 'Transfer Harcamaları (M€)',
                data: [450, 280, 150, 90, 75, 120],
                borderColor: '#3464d3',
                backgroundColor: 'rgba(52, 100, 211, 0.1)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Aylık Transfer Harcamaları'
                }
            }
        }
    });

    // Takım Değerleri Grafiği
    const teamCtx = document.getElementById('teamValuesChart').getContext('2d');
    new Chart(teamCtx, {
        type: 'bar',
        data: {
            labels: ['Galatasaray', 'Fenerbahçe', 'Beşiktaş', 'Trabzonspor', 'Adana Demirspor'],
            datasets: [{
                label: 'Takım Değeri (M€)',
                data: [165.8, 152.3, 89.5, 75.2, 45.8],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)'
                ]
            }]
        }
    });

    // Yaş Dağılımı Grafiği
    const ageCtx = document.getElementById('ageDistributionChart').getContext('2d');
    new Chart(ageCtx, {
        type: 'pie',
        data: {
            labels: ['18-21', '22-25', '26-29', '30-33', '34+'],
            datasets: [{
                data: [15, 30, 25, 20, 10],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF'
                ]
            }]
        }
    });

    // Pozisyon Dağılımı Grafiği
    const posCtx = document.getElementById('positionChart').getContext('2d');
    new Chart(posCtx, {
        type: 'doughnut',
        data: {
            labels: ['Kaleci', 'Defans', 'Orta Saha', 'Forvet'],
            datasets: [{
                data: [10, 35, 40, 15],
                backgroundColor: [
                    '#FF9F40',
                    '#4BC0C0',
                    '#36A2EB',
                    '#FF6384'
                ]
            }]
        }
    });
}); 