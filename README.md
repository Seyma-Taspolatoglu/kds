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

<img width="955" height="463" alt="Ekran görüntüsü 2026-01-16 185409" src="https://github.com/user-attachments/assets/92fdd276-8326-460f-9af8-6aec735ead9a" />
<img width="963" height="410" alt="Ekran görüntüsü 2026-01-16 185420" src="https://github.com/user-attachments/assets/7f9a3ab5-1bb6-4ae1-9d44-3a75e4a6d523" 
<img width="961" height="454" alt="Ekran görüntüsü 2026-01-16 185432" src="https://github.com/user-attachments/assets/d9781995-28b5-460f-be7b-de5a195415dd" />
/>
<img width="955" height="468" alt="Ekran görüntüsü 2026-01-16 185446" src="https://github.com/user-attachments/assets/33a9704b-07b5-4ae9-9d91-e5156f3851c3"
<img width="956" height="383" alt="Ekran görüntüsü 2026-01-16 185511" src="https://github.com/user-attachments/assets/cef5751f-0e0b-420f-b7af-ec63acaec10c" />
 />
<img width="967" height="342" alt="Ekran görüntüsü 2026-01-16 185524" src="https://github.com/user-attachments/assets/394d0374-e59b-400c-a1f7-0144b82cd3c0" />
<img width="918" height="466" alt="Ekran görüntüsü 2026-01-16 185537" src="https://github.com/user-attachments/assets/cbd2e24c-9dc2-4d1a-9d31-9b4dc0284e5c" />

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
