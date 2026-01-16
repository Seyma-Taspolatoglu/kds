document.addEventListener('DOMContentLoaded', () => {
    const positionSelect = document.getElementById('positionSelect');
    const minBudget = document.getElementById('minBudget');
    const maxBudget = document.getElementById('maxBudget');
    const findPlayersBtn = document.getElementById('findPlayers');
    const suggestionsContainer = document.getElementById('suggestionsContainer');
    let selectedTeam = ''; // Seçili takımı tutacak değişken

    // Örnek oyuncu veritabanı
    const playerDatabase = {
        kaleci: [
            {
                name: "David De Gea",
                age: 33,
                team: "Serbest",
                position: "Kaleci",
                value: "12M €",
                stats: {
                    Kurtarış: 87,
                    Refleks: 89,
                    "Pozisyon Alma": 84
                }
            },
            {
                name: "Hugo Lloris",
                age: 37,
                team: "Serbest",
                position: "Kaleci",
                value: "8M €",
                stats: {
                    Kurtarış: 85,
                    Refleks: 86,
                    "Pozisyon Alma": 85
                }
            },
            {
                name: "Kasper Schmeichel",
                age: 37,
                team: "Anderlecht",
                position: "Kaleci",
                value: "7M €",
                stats: {
                    Kurtarış: 84,
                    Refleks: 85,
                    "Pozisyon Alma": 86
                }
            },
            {
                name: "Jack Butland",
                age: 30,
                team: "Rangers",
                position: "Kaleci",
                value: "6M €",
                stats: {
                    Kurtarış: 83,
                    Refleks: 85,
                    "Pozisyon Alma": 82
                }
            }
        ],
        defans: [
            {
                name: "Eric Bailly",
                age: 29,
                team: "Beşiktaş",
                position: "Defans",
                value: "12M €",
                stats: {
                    Hız: 86,
                    Fizik: 85,
                    Kesici: 88
                }
            },
            {
                name: "Victor Lindelöf",
                age: 29,
                team: "Manchester United",
                position: "Defans",
                value: "18M €",
                stats: {
                    "Top Çalma": 85,
                    "Pozisyon Alma": 86,
                    "Pas": 87
                }
            },
            {
                name: "Phil Jones",
                age: 31,
                team: "Serbest",
                position: "Defans",
                value: "5M €",
                stats: {
                    Fizik: 85,
                    "Hava Topu": 86,
                    Kesici: 84
                }
            },
            {
                name: "Clement Lenglet",
                age: 28,
                team: "Aston Villa",
                position: "Defans",
                value: "15M €",
                stats: {
                    "Top Çalma": 86,
                    "Pas": 87,
                    "Pozisyon Alma": 85
                }
            }
        ],
        ortasaha: [
            {
                name: "Jesse Lingard",
                age: 31,
                team: "Serbest",
                position: "Orta Saha",
                value: "10M €",
                stats: {
                    Çabukluk: 85,
                    Teknik: 86,
                    Şut: 84
                }
            },
            {
                name: "Dele Alli",
                age: 27,
                team: "Serbest",
                position: "Orta Saha",
                value: "15M €",
                stats: {
                    "Orta Saha": 85,
                    "Pas": 86,
                    "Şut": 87
                }
            },
            {
                name: "Tanguy Ndombele",
                age: 27,
                team: "Galatasaray",
                position: "Orta Saha",
                value: "18M €",
                stats: {
                    Teknik: 88,
                    "Top Sürme": 87,
                    "Pas": 85
                }
            },
            {
                name: "Gedson Fernandes",
                age: 24,
                team: "Beşiktaş",
                position: "Orta Saha",
                value: "16M €",
                stats: {
                    Çabukluk: 86,
                    "Pas": 85,
                    Teknik: 85
                }
            }
        ],
        forvet: [
            {
                name: "Marcus Thuram",
                age: 26,
                team: "Inter",
                position: "Forvet",
                value: "30M €",
                stats: {
                    Bitiricilik: 86,
                    Hız: 88,
                    Güç: 85
                }
            },
            {
                name: "Divock Origi",
                age: 28,
                team: "Nottingham Forest",
                position: "Forvet",
                value: "15M €",
                stats: {
                    Bitiricilik: 85,
                    "Hava Topu": 86,
                    Hız: 85
                }
            },
            {
                name: "Mariano Diaz",
                age: 30,
                team: "Serbest",
                position: "Forvet",
                value: "8M €",
                stats: {
                    Bitiricilik: 84,
                    "Hava Topu": 85,
                    Güç: 86
                }
            },
            {
                name: "Diego Costa",
                age: 35,
                team: "Serbest",
                position: "Forvet",
                value: "5M €",
                stats: {
                    Bitiricilik: 85,
                    Güç: 88,
                    "Hava Topu": 86
                }
            }
        ]
    };

    // Takımların ihtiyaç analizi
    const teamNeeds = {
        galatasaray: {
            kaleci: { priority: 'düşük', idealAge: '25-30', maxBudget: '15M' },
            defans: { priority: 'orta', idealAge: '24-28', maxBudget: '25M' },
            ortasaha: { priority: 'yüksek', idealAge: '23-27', maxBudget: '30M' },
            forvet: { priority: 'düşük', idealAge: '24-29', maxBudget: '35M' }
        },
        fenerbahce: {
            kaleci: { priority: 'orta', idealAge: '25-30', maxBudget: '18M' },
            defans: { priority: 'yüksek', idealAge: '23-28', maxBudget: '28M' },
            ortasaha: { priority: 'düşük', idealAge: '22-27', maxBudget: '25M' },
            forvet: { priority: 'orta', idealAge: '24-28', maxBudget: '30M' }
        },
        besiktas: {
            kaleci: { priority: 'yüksek', idealAge: '25-32', maxBudget: '12M' },
            defans: { priority: 'yüksek', idealAge: '24-29', maxBudget: '20M' },
            ortasaha: { priority: 'orta', idealAge: '23-28', maxBudget: '22M' },
            forvet: { priority: 'yüksek', idealAge: '24-29', maxBudget: '25M' }
        },
        trabzonspor: {
            kaleci: { priority: 'düşük', idealAge: '25-30', maxBudget: '10M' },
            defans: { priority: 'orta', idealAge: '23-28', maxBudget: '15M' },
            ortasaha: { priority: 'yüksek', idealAge: '22-27', maxBudget: '18M' },
            forvet: { priority: 'orta', idealAge: '23-28', maxBudget: '20M' }
        },
        basaksehir: {
            kaleci: { priority: 'orta', idealAge: '25-30', maxBudget: '12M' },
            defans: { priority: 'yüksek', idealAge: '23-28', maxBudget: '20M' },
            ortasaha: { priority: 'düşük', idealAge: '22-27', maxBudget: '18M' },
            forvet: { priority: 'orta', idealAge: '24-29', maxBudget: '25M' }
        },
        adanademirspor: {
            kaleci: { priority: 'düşük', idealAge: '25-32', maxBudget: '8M' },
            defans: { priority: 'orta', idealAge: '24-29', maxBudget: '15M' },
            ortasaha: { priority: 'yüksek', idealAge: '23-28', maxBudget: '20M' },
            forvet: { priority: 'yüksek', idealAge: '23-28', maxBudget: '22M' }
        }
    };

    // Takımların oyun stilleri ve ihtiyaçları
    const teamStyles = {
        galatasaray: {
            style: 'hücum',
            kaleci: {
                traits: ['Ayakla Oyun', 'Refleks'],
                minHeight: 188
            },
            defans: {
                traits: ['Hız', 'Pas', 'Top Çıkarma'],
                preferredFoot: 'both'
            },
            ortasaha: {
                traits: ['Teknik', 'Pas', 'Yaratıcılık'],
                workRate: 'high'
            },
            forvet: {
                traits: ['Bitiricilik', 'Hız', 'Teknik'],
                preferredFoot: 'both'
            }
        },
        fenerbahce: {
            style: 'possession',
            kaleci: {
                traits: ['Ayakla Oyun', 'Pozisyon'],
                minHeight: 185
            },
            defans: {
                traits: ['Pas', 'Pozisyon', 'Top Çalma'],
                preferredFoot: 'left'
            },
            ortasaha: {
                traits: ['Pas', 'Vizyon', 'Kontrol'],
                workRate: 'high'
            },
            forvet: {
                traits: ['Bitiricilik', 'Teknik', 'Pas'],
                preferredFoot: 'right'
            }
        },
        besiktas: {
            style: 'kontratak',
            kaleci: {
                traits: ['Refleks', 'Kurtarış'],
                minHeight: 190
            },
            defans: {
                traits: ['Güç', 'Hız', 'Kesici'],
                preferredFoot: 'right'
            },
            ortasaha: {
                traits: ['Çabukluk', 'Şut', 'Pas'],
                workRate: 'medium'
            },
            forvet: {
                traits: ['Güç', 'Hava Topu', 'Bitiricilik'],
                preferredFoot: 'any'
            }
        },
        basaksehir: {
            style: 'possession',
            kaleci: { traits: ['Ayakla Oyun', 'Pozisyon'] },
            defans: { traits: ['Pas', 'Top Çıkarma'] },
            ortasaha: { traits: ['Teknik', 'Vizyon'] },
            forvet: { traits: ['Bitiricilik', 'Teknik'] }
        },
        adanademirspor: {
            style: 'kontratak',
            kaleci: { traits: ['Refleks', 'Kurtarış'] },
            defans: { traits: ['Hız', 'Güç'] },
            ortasaha: { traits: ['Çabukluk', 'Pas'] },
            forvet: { traits: ['Hız', 'Bitiricilik'] }
        }
    };

    // Takım butonlarını seç ve tıklama olaylarını ekle
    const teamButtons = document.querySelectorAll('.team-btn');
    teamButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Diğer butonlardan active sınıfını kaldır
            teamButtons.forEach(btn => btn.classList.remove('active'));
            // Tıklanan butona active sınıfı ekle
            button.classList.add('active');
            // Seçili takımı güncelle
            selectedTeam = button.dataset.team;
        });
    });

    // Arama butonuna tıklandığında
    findPlayersBtn.addEventListener('click', () => {
        const position = positionSelect.value;
        const minValue = parseInt(minBudget.value);
        const maxValue = parseInt(maxBudget.value);

        if (!selectedTeam) {
            alert('Lütfen bir takım seçin');
            return;
        }

        if (!position) {
            alert('Lütfen bir pozisyon seçin');
            return;
        }

        showSuggestions(position, minValue, maxValue);
    });

    // Oyuncu önerilerini göster
    function showSuggestions(position, minValue, maxValue) {
        const players = playerDatabase[position] || [];
        
        let filteredPlayers = players.filter(player => {
            const playerValue = parseInt(player.value);
            const valueMatch = (!minValue || playerValue >= minValue) && 
                             (!maxValue || playerValue <= maxValue);

            // Takım stiline göre filtreleme
            if (selectedTeam && teamStyles[selectedTeam]) {
                const teamStyle = teamStyles[selectedTeam][position];
                const teamNeed = teamNeeds[selectedTeam][position];
                const playerStats = Object.entries(player.stats);
                
                // Takımın istediği özelliklere sahip oyuncuları bul
                const traitMatch = teamStyle.traits.some(trait => 
                    playerStats.some(([key, value]) => 
                        key.toLowerCase().includes(trait.toLowerCase()) && value >= 85
                    )
                );

                // Yaş kontrolü
                const [minAge, maxAge] = teamNeed.idealAge.split('-').map(Number);
                const ageMatch = player.age >= minAge && player.age <= maxAge;

                // Bütçe kontrolü
                const budgetMatch = playerValue <= parseInt(teamNeed.maxBudget);
                
                return valueMatch && traitMatch && (ageMatch || budgetMatch);
            }
            
            return valueMatch;
        });

        // Takım ihtiyaçlarına göre sıralama
        if (selectedTeam && teamNeeds[selectedTeam]) {
            const teamNeed = teamNeeds[selectedTeam][position];
            const teamStyle = teamStyles[selectedTeam][position];

            filteredPlayers = filteredPlayers.sort((a, b) => {
                const aScore = calculateMatchScore(a, teamNeed, teamStyle);
                const bScore = calculateMatchScore(b, teamNeed, teamStyle);
                return bScore - aScore;
            });
        }

        // En uygun 4 oyuncuyu göster
        filteredPlayers = filteredPlayers.slice(0, 4);

        // HTML oluştur
        suggestionsContainer.innerHTML = filteredPlayers.map(player => `
            <div class="player-suggestion ${getMatchClass(player, selectedTeam, position)}">
                <div class="player-info">
                    <h3>${player.name}</h3>
                    <div class="team-info">${player.team}</div>
                    <div class="position-age">
                        <span class="position">${player.position} • ${player.age} yaş</span>
                    </div>
                    <div class="value">${player.value}</div>
                </div>
                <div class="player-strengths">
                    <div class="strengths-title">Güçlü Yönler:</div>
                    <div class="strength-tags">
                        ${Object.entries(player.stats)
                            .filter(([key, value]) => value >= 85)
                            .map(([key, value]) => `
                                <span class="strength-tag ${isKeyTraitForTeam(key, selectedTeam, position) ? 'key-trait' : ''}">
                                    ${key}
                                </span>
                            `).join('')}
                    </div>
                </div>
                <div class="match-info">
                    ${getMatchBadge(player, selectedTeam, position)}
                    <div class="match-description">
                        ${getTeamSpecificDescription(player, selectedTeam, position)}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Eşleşme sınıfını belirle
    function getMatchClass(player, team, position) {
        if (!team || !teamStyles[team]) return '';
        
        const teamStyle = teamStyles[team][position];
        const teamNeed = teamNeeds[team][position];
        const score = calculateMatchScore(player, teamNeed, teamStyle);
        
        if (score >= 60) return 'perfect-match';
        if (score >= 30) return 'good-match';
        return 'partial-match';
    }

    // Eşleşme rozetini oluştur
    function getMatchBadge(player, team, position) {
        if (!team || !teamStyles[team]) return '';
        
        const teamStyle = teamStyles[team][position];
        const teamNeed = teamNeeds[team][position];
        const score = calculateMatchScore(player, teamNeed, teamStyle);
        
        if (score >= 60) {
            return '<span class="match-badge perfect">Mükemmel Eşleşme</span>';
        } else if (score >= 30) {
            return '<span class="match-badge good">İyi Eşleşme</span>';
        } else {
            return '<span class="match-badge partial">Kısmi Eşleşme</span>';
        }
    }

    // Oyuncunun takıma uygunluk puanını hesapla
    function calculateMatchScore(player, teamNeed, teamStyle) {
        let score = 0;
        
        // Yaş uyumu
        const [minAge, maxAge] = teamNeed.idealAge.split('-').map(Number);
        if (player.age >= minAge && player.age <= maxAge) score += 30;
        
        // Değer uyumu
        const playerValue = parseInt(player.value);
        if (playerValue <= parseInt(teamNeed.maxBudget)) score += 20;
        
        // Özellik uyumu
        const playerStats = Object.entries(player.stats);
        teamStyle.traits.forEach(trait => {
            if (playerStats.some(([key, value]) => 
                key.toLowerCase().includes(trait.toLowerCase()) && value >= 85)) {
                score += 15;
            }
        });
        
        return score;
    }

    // Takıma özel açıklama oluştur
    function getTeamSpecificDescription(player, team, position) {
        if (!team || !teamStyles[team]) return '';
        
        const style = teamStyles[team].style;
        const traits = teamStyles[team][position].traits;
        
        let description = `${team.charAt(0).toUpperCase() + team.slice(1)}'nin `;
        
        switch(style) {
            case 'hücum':
                description += 'hücum odaklı oyun stiline ';
                break;
            case 'possession':
                description += 'top kontrollü oyun stiline ';
                break;
            case 'kontratak':
                description += 'kontratak odaklı oyun stiline ';
                break;
        }
        
        const matchingTraits = traits.filter(trait => 
            Object.entries(player.stats).some(([key, value]) => 
                key.toLowerCase().includes(trait.toLowerCase()) && value >= 85
            )
        );
        
        if (matchingTraits.length > 0) {
            description += `uygun ${matchingTraits.join(', ')} özellikleriyle öne çıkıyor`;
        } else {
            description += 'kısmen uygun bir profil';
        }
        
        return description;
    }

    // Özelliğin takım için önemli olup olmadığını kontrol et
    function isKeyTraitForTeam(trait, team, position) {
        if (!team || !teamStyles[team]) return false;
        
        return teamStyles[team][position].traits.some(keyTrait => 
            trait.toLowerCase().includes(keyTrait.toLowerCase())
        );
    }
}); 