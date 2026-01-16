# KDS – MVC Mimarisi ile RESTful API Tasarımı

## 📌 Proje Açıklaması
Bu proje, Sunucu Tabanlı Programlama dersi kapsamında, MVC (Model-View-Controller) mimarisi kullanılarak Node.js (Express) ile geliştirilmiş bir RESTful API uygulamasıdır. Projenin amacı, gerçekçi bir iş senaryosu üzerinden katmanlı mimariyi doğru şekilde uygulamak ve REST prensiplerine uygun API tasarımı gerçekleştirmektir.

---

## 🎯 Projenin Amacı
- Sunucu taraflı yazılım geliştirme becerisi kazanmak  
- MVC mimarisini doğru ve tutarlı şekilde uygulamak  
- RESTful API tasarlamak  
- İş mantığı, veri modeli ve controller katmanlarını ayırmak  
- Okunabilir, sürdürülebilir ve ölçeklenebilir kod yazmak  

---

## 🧩 Senaryo Tanımı
Sistem, futbol takımlarının transfer süreçlerini yönetmesine yardımcı olan bir transfer destek sistemidir.  
Takımlar bütçelerine ve ihtiyaçlarına göre oyuncu transfer önerileri alabilir, oyuncuları karşılaştırabilir ve bütçe analizleri yapabilir.

---

## ⚙️ Kullanılan Teknolojiler
- Node.js
- Express.js
- MySQL
- mysql2
- dotenv

---

## 🏗️ Mimari Yapı (MVC)
- **Model:** Veritabanı tablolarını temsil eder  
- **Controller:** HTTP isteklerini karşılar  
- **Service:** İş kurallarını ve iş mantığını içerir  
- **Route:** API uç noktalarını tanımlar  
- **Config:** Environment ve veritabanı ayarlarını içerir  

---

## 🔐 İş Kuralları (Özel Senaryolar)
1. **Bütçesi yetersiz olan takım transfer yapamaz**  
   - Takım bütçesi, belirlenen minimum transfer bütçesinin altındaysa transfer önerisi yapılmaz.

2. **Aynı pozisyonda yeterli oyuncu varsa transfer önerilmez**  
   - Bir takımda aynı pozisyonda 3 veya daha fazla oyuncu bulunuyorsa yeni transfer önerisi yapılmaz.

---

## 🔌 API Endpoint Listesi

### Transfer
| Method | Endpoint | Açıklama |
|------|---------|---------|
| GET | /api/transfers/suggestions | Transfer önerilerini getirir |
| GET | /api/transfers/compare | İki oyuncuyu karşılaştırır |
| GET | /api/transfers/budget-analysis | Takım bütçe analizi yapar |

---

## 🗄️ Veritabanı Yapısı (ER Diyagramı)

<img width="1138" height="560" alt="Ekran görüntüsü 2026-01-16 183546" src="https://github.com/user-attachments/assets/6ab9466a-69d4-42da-b565-d10962cc3f02" />


## 🚀 Kurulum Adımları

Projenin yerel makinenizde çalışması için aşağıdaki adımları izleyin:

1. **Projeyi Klonlayın:**
   Terminali açın ve projeyi indirin:
   ```bash
   git clone https://github.com/Seyma-Taspolatoglu/kds.git
   cd KDS

   npm install
   
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=futbolcu
PORT=3000
npm start
