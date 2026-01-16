document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsList = document.getElementById('newsList');
    let currentFilter = 'all';

    // Ana haberler (Sadece Tümü kısmında görünecek)
    const mainNews = [
        {
            title: "Galatasaray'da Davinson Sanchez Şoku",
            content: "Sarı-kırmızılıların Kolombiyalı stoperi Davinson Sanchez, Pendikspor maçında yaşadığı sakatlık sonrasında yapılan kontrollerde menüskü yırtığı tespit edildi.",
            date: "2024-12-18",
            type: "resmi"
        },
        {
            title: "Fenerbahçe'de Dzeko İle Yola Devam",
            content: "Sarı-lacivertlilerin Boşnak golcüsü Edin Dzeko'nun sözleşmesi 1 yıl uzatıldı.",
            date: "2024-12-15",
            type: "resmi"
        },
        {
            title: "Beşiktaş'a Premier Lig'den Stoper",
            content: "Siyah-beyazlılar, Crystal Palace'ın Danimarkalı savunmacısı Joachim Andersen için girişimlere başlandı.",
            date: "2024-12-20",
            type: "soylenti"
        }
    ];

    // Ek resmi haberler (Sadece Resmi kısmında görünecek)
    const additionalOfficialNews = [
        {
            title: "Galatasaray'dan Dev Yatırım: Zaniolo Transferi Resmiyet Kazandı",
            content: "Galatasaray, Roma'nın yıldızı Nicolo Zaniolo'yu kadrosuna kattı. İtalya'dan transfer edilen 25 yaşındaki ofansif orta saha oyuncusu ile 4,5 yıllık sözleşme imzalandı. Zaniolo'nun transferi için Galatasaray, Roma'ya 25 milyon euro bonservis bedeli ödeyecek.",
            date: "2024-12-10",
            type: "resmi"
        },
        {
            title: "Fenerbahçe'de Samatta'nın Durumu Netleşti",
            content: "Fenerbahçe'nin Tanzanyalı golcüsü Mbwana Samatta, transfer dönemi öncesi kulüple yaptığı görüşmede 2025 yılına kadar yeni sözleşme imzaladı. Teknik direktörün güvenini kazanan Samatta, gelecek sezon için büyük beklentiler taşıyor.",
            date: "2024-12-12",
            type: "resmi"
        },
        {
            title: "Beşiktaş'tan Sürpriz Transfer: Wout Weghorst",
            content: "Beşiktaş, Hollandalı santrfor Wout Weghorst'u kiralık olarak kadrosuna kattı. Burnley'den 1 yıllık kiralık olarak gelen 31 yaşındaki oyuncu, forvet hattına önemli bir güç katacak. Weghorst'un Beşiktaş'taki performansı merakla bekleniyor.",
            date: "2024-12-14",
            type: "resmi"
        },
        {
            title: "Trabzonspor'dan Yeni Sağ Bek Transferi: Milos Degenek",
            content: "Trabzonspor, Avustralyalı sağ bek Milos Degenek'i kadrosuna katmak için anlaşma sağladı. Olympiakos'tan transfer edilen 29 yaşındaki oyuncu, bordo-mavili ekibin savunmasını güçlendirecek. Degenek, Süper Lig'deki ilk maçına önümüzdeki hafta çıkacak.",
            date: "2024-12-16",
            type: "resmi"
        }
    ];

    // Ek söylenti haberleri (Sadece Söylenti kısmında görünecek)
    const additionalRumorNews = [
        {
            title: "Galatasaray'dan Dev Yatırım: Zaniolo Transferi Resmiyet Kazandı",
            content: "Galatasaray, Roma'nın yıldızı Nicolo Zaniolo'yu kadrosuna kattı. İtalya'dan transfer edilen 25 yaşındaki ofansif orta saha oyuncusu ile 4,5 yıllık sözleşme imzalandı.",
            date: "2024-12-10",
            type: "soylenti"
        },
        {
            title: "Fenerbahçe'de Samatta'nın Durumu Netleşti",
            content: "Fenerbahçe'nin Tanzanyalı golcüsü Mbwana Samatta, transfer dönemi öncesi kulüple yaptığı görüşmede 2025 yılına kadar yeni sözleşme imzaladı.",
            date: "2024-12-12",
            type: "soylenti"
        },
        {
            title: "Beşiktaş'tan Sürpriz Transfer: Wout Weghorst",
            content: "Beşiktaş, Hollandalı santrfor Wout Weghorst'u kiralık olarak kadrosuna kattı. Burnley'den 1 yıllık kiralık olarak gelen 31 yaşındaki oyuncu, forvet hattına önemli bir güç katacak.",
            date: "2024-12-14",
            type: "soylenti"
        },
        {
            title: "Trabzonspor'dan Yeni Sağ Bek Transferi: Milos Degenek",
            content: "Trabzonspor, Avustralyalı sağ bek Milos Degenek'i kadrosuna katmak için anlaşma sağladı. Olympiakos'tan transfer edilen 29 yaşındaki oyuncu, bordo-mavili ekibin savunmasını güçlendirecek.",
            date: "2024-12-16",
            type: "soylenti"
        }
    ];

    // Filtreleme fonksiyonu
    function filterNews(type) {
        let newsToShow;
        if (type === 'resmi') {
            // Resmi seçildiğinde tüm resmi haberleri göster
            newsToShow = [...mainNews.filter(item => item.type === 'resmi'), ...additionalOfficialNews];
        } else if (type === 'soylenti') {
            // Söylenti seçildiğinde tüm söylenti haberlerini göster
            newsToShow = [...mainNews.filter(item => item.type === 'soylenti'), ...additionalRumorNews];
        } else {
            // Tümü seçildiğinde sadece ana haberleri göster
            newsToShow = mainNews;
        }

        newsList.innerHTML = newsToShow.map(item => `
            <div class="news-card" data-type="${item.type}">
                <div class="news-time">
                    <i class="far fa-clock"></i>
                    ${formatDate(item.date)}
                </div>
                <span class="news-tag ${item.type}">
                    <i class="fas ${item.type === 'resmi' ? 'fa-check-circle' : 'fa-comment-dots'}"></i>
                    ${item.type === 'resmi' ? 'Resmi' : 'Söylenti'}
                </span>
                <h3 class="news-title">${item.title}</h3>
                <p class="news-content">${item.content}</p>
            </div>
        `).join('');
    }

    // Filtre butonları için event listener
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.getAttribute('data-type');
            filterNews(currentFilter);
        });
    });

    // Sayfa yüklendiğinde tüm haberleri göster
    filterNews('all');
});

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
}

function loadMarketValues() {
    const players = [
        {
            name: "Victor Nelsson",
            team: "Galatasaray",
            value: "€30M",
            position: "Stoper",
            image: "https://img.a.transfermarkt.technology/portrait/big/263243-1672304216.jpg"
        },
        {
            name: "Mauro Icardi",
            team: "Galatasaray",
            value: "€25M",
            position: "Forvet",
            image: "https://img.a.transfermarkt.technology/portrait/big/68863-1672304197.jpg"
        },
        {
            name: "Dries Mertens",
            team: "Galatasaray",
            value: "€20M",
            position: "Ofansif Orta Saha",
            image: "https://img.a.transfermarkt.technology/portrait/big/56178-1672304158.jpg"
        },
        {
            name: "Enner Valencia",
            team: "Fenerbahçe",
            value: "€18M",
            position: "Forvet",
            image: "https://img.a.transfermarkt.technology/portrait/big/139503-1690231220.jpg"
        },
        {
            name: "Enzo Fernández",
            team: "Galatasaray",
            value: "€18M",
            position: "Orta Saha",
            image: "https://img.a.transfermarkt.technology/portrait/big/624158-1673101391.jpg"
        }
    ];

    const valueList = document.getElementById('valueList');
    valueList.innerHTML = players.map(player => `
        <div class="value-card">
            <img src="${player.image}" alt="${player.name}" onerror="this.src='/images/default-player.jpg'">
            <div class="value-info">
                <h4>${player.name}</h4>
                <span class="team">${player.team}</span>
                <span class="position">${player.position}</span>
                <span class="value">${player.value}</span>
            </div>
        </div>
    `).join('');
}

function loadTopTransfers() {
    const transfers = [
        {
            player: "Mauro Icardi",
            from: "Paris Saint-Germain",
            to: "Galatasaray",
            fee: "€25M",
            image: "https://img.a.transfermarkt.technology/portrait/big/68863-1672304197.jpg"
        },
        {
            player: "Timo Werner",
            from: "RB Leipzig",
            to: "Fenerbahçe",
            fee: "€22M",
            image: "https://img.a.transfermarkt.technology/portrait/big/170527-1657711923.jpg"
        },
        {
            player: "Dries Mertens",
            from: "Napoli",
            to: "Galatasaray",
            fee: "€18M",
            image: "https://img.a.transfermarkt.technology/portrait/big/56178-1672304158.jpg"
        },
        {
            player: "Sergio Ramos",
            from: "Paris Saint-Germain",
            to: "Galatasaray",
            fee: "€15M",
            image: "https://img.a.transfermarkt.technology/portrait/big/25557-1672304338.jpg"
        },
        {
            player: "Enzo Fernández",
            from: "Benfica",
            to: "Galatasaray",
            fee: "€12M",
            image: "https://img.a.transfermarkt.technology/portrait/big/624158-1673101391.jpg"
        }
    ];

    const transferList = document.getElementById('transferList');
    transferList.innerHTML = transfers.map(transfer => `
        <div class="transfer-card">
            <div class="transfer-info">
                <img src="${transfer.image}" alt="${transfer.player}" onerror="this.src='/images/default-player.jpg'">
                <div class="transfer-details-container">
                    <h4>${transfer.player}</h4>
                    <div class="transfer-details">
                        <span>${transfer.from}</span>
                        <i class="fas fa-arrow-right"></i>
                        <span>${transfer.to}</span>
                    </div>
                </div>
            </div>
            <div class="transfer-fee">${transfer.fee}</div>
        </div>
    `).join('');
}