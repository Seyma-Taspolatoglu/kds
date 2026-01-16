document.addEventListener('DOMContentLoaded', () => {
    // Oyuncu verileri
    const players = {
        icardi: {
            name: 'Mauro Icardi',
            skills: [82, 92, 70, 78, 75, 28],
            form: [9.2, 8.5, 8.8, 9.0, 8.7]
        },
        zaha: {
            name: 'Wilfried Zaha',
            skills: [90, 82, 78, 89, 76, 45],
            form: [7.8, 8.3, 7.9, 8.5, 8.1]
        },
        mertens: {
            name: 'Dries Mertens',
            skills: [85, 84, 86, 88, 65, 42],
            form: [7.5, 7.8, 8.2, 7.6, 7.9]
        },
        dzeko: {
            name: 'Edin Dzeko',
            skills: [65, 88, 75, 72, 88, 52],
            form: [7.2, 7.8, 7.5, 7.9, 7.4]
        },
        tadic: {
            name: 'Dusan Tadic',
            skills: [78, 85, 90, 86, 72, 48],
            form: [8.1, 7.9, 8.4, 8.0, 8.2]
        },
        aboubakar: {
            name: 'Vincent Aboubakar',
            skills: [82, 86, 72, 78, 85, 38],
            form: [7.4, 7.8, 7.2, 7.6, 7.5]
        },
        enesdemir: {
            name: 'Enes Demir',
            skills: [75, 70, 85, 82, 78, 65],
            form: [7.6, 7.9, 8.0, 7.8, 8.1]
        }
    };

    let skillsChart = null;
    let formChart = null;

    // Oyuncu ID'sini bulmak için yardımcı fonksiyon
    function findPlayerId(playerName) {
        // Parantez içindeki mevkiyi kaldır
        const nameWithoutPosition = playerName.split('(')[0].trim();
        
        // Oyuncu adından ID'yi bul
        for (let id in players) {
            if (players[id].name === nameWithoutPosition) {
                return id;
            }
        }
        return null;
    }

    function createSkillsChart(player1, player2) {
        const ctx = document.getElementById('skillsChart').getContext('2d');
        return new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Hız', 'Şut', 'Pas', 'Dribling', 'Fizik', 'Savunma'],
                datasets: [
                    {
                        label: player1.name,
                        data: player1.skills,
                        backgroundColor: 'rgba(227, 10, 23, 0.2)',
                        borderColor: '#E30A17',
                        pointBackgroundColor: '#E30A17'
                    },
                    {
                        label: player2.name,
                        data: player2.skills,
                        backgroundColor: 'rgba(33, 150, 243, 0.2)',
                        borderColor: '#2196F3',
                        pointBackgroundColor: '#2196F3'
                    }
                ]
            },
            options: {
                scales: {
                    r: {
                        min: 0,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                }
            }
        });
    }

    function createFormChart(player1, player2) {
        const ctx = document.getElementById('formChart').getContext('2d');
        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Maç 1', 'Maç 2', 'Maç 3', 'Maç 4', 'Maç 5'],
                datasets: [
                    {
                        label: player1.name,
                        data: player1.form,
                        borderColor: '#E30A17',
                        backgroundColor: 'rgba(227, 10, 23, 0.1)',
                        fill: true
                    },
                    {
                        label: player2.name,
                        data: player2.form,
                        borderColor: '#2196F3',
                        backgroundColor: 'rgba(33, 150, 243, 0.1)',
                        fill: true
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        min: 6,
                        max: 10,
                        ticks: {
                            stepSize: 0.5
                        }
                    }
                }
            }
        });
    }

    function updateCharts() {
        const player1Name = document.getElementById('player1').value;
        const player2Name = document.getElementById('player2').value;

        if (!player1Name || !player2Name) return;

        const player1Id = findPlayerId(player1Name);
        const player2Id = findPlayerId(player2Name);

        if (!player1Id || !player2Id) return;

        const player1 = players[player1Id];
        const player2 = players[player2Id];

        if (skillsChart) skillsChart.destroy();
        if (formChart) formChart.destroy();

        skillsChart = createSkillsChart(player1, player2);
        formChart = createFormChart(player1, player2);
    }

    // Event Listeners
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');

    player1Input.addEventListener('change', updateCharts);
    player2Input.addEventListener('change', updateCharts);
}); 