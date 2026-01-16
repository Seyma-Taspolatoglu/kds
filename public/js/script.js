// Gündem haberlerini yükle
function loadNews() {
    const news = [
        {
            title: "Zaha Galatasaray'da!",
            content: "Wilfried Zaha, Crystal Palace'tan bedelsiz olarak transfer edildi.",
            date: "2024-01-28",
            image: "https://img.a.transfermarkt.technology/portrait/big/145988-1689247821.jpg",
            type: "official",
            source: "Galatasaray"
        },
        {
            title: "Boey Bayern Münih'e Transfer Oldu",
            content: "Sacha Boey, 30 milyon Euro bonservis bedeliyle Bayern Münih'e transfer oldu.",
            date: "2024-01-28",
            image: "https://img.a.transfermarkt.technology/portrait/big/593802-1705945485.jpg",
            type: "official",
            source: "Galatasaray"
        },
        {
            title: "Fenerbahçe'den Sürpriz Transfer",
            content: "Sarı-lacivertliler, Premier Lig'den yıldız oyuncuyla görüşüyor.",
            date: "2024-01-27",
            image: "/images/news/transfer-news.jpg",
            type: "rumor",
            source: "Fanatik"
        },
        {
            title: "Beşiktaş'ta Ayrılık",
            content: "Siyah-beyazlıların yıldız oyuncusu için resmi teklif yapıldı.",
            date: "2024-01-26",
            image: "/images/news/transfer-news2.jpg",
            type: "rumor",
            source: "BeIN Sports"
        }
    ];

    renderNews(news);

    // Haber filtreleme butonlarını aktifleştir
    document.querySelectorAll('[data-news-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('[data-news-filter]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterNews(btn.dataset.newsFilter, news);
        });
    });
}

function renderNews(news) {
    const newsContainer = document.getElementById('newsList');
    newsContainer.innerHTML = '';

    news.forEach(item => {
        const newsCard = document.createElement('div');
        newsCard.className = `news-item ${item.type}`;
        newsCard.innerHTML = `
            <div class="news-image">
                <img src="${item.image}" alt="${item.title}" 
                     onerror="this.src='/images/news/default-news.jpg'">
                <span class="news-tag tag-${item.type}">
                    ${item.type === 'official' ? 'Resmi' : 'Söylenti'}
                </span>
            </div>
            <div class="news-content">
                <h4>${item.title}</h4>
                <p>${item.content}</p>
                <div class="news-meta">
                    <span class="news-date">${formatDate(item.date)}</span>
                    <span class="news-source">${item.source}</span>
                </div>
            </div>
        `;
        newsContainer.appendChild(newsCard);
    });
}

function filterNews(type, news) {
    if (type === 'all') {
        renderNews(news);
    } else {
        const filteredNews = news.filter(item => item.type === type);
        renderNews(filteredNews);
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
}

// DOMContentLoaded event listener'ına loadNews'i ekle
document.addEventListener('DOMContentLoaded', () => {
    // ... diğer kodlar ...
    loadNews();
}); 