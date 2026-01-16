CREATE DATABASE IF NOT EXISTS superlig_transfer;
USE superlig_transfer;

CREATE TABLE takimlar (
    id INT PRIMARY KEY AUTO_INCREMENT,
    takim_adi VARCHAR(100) NOT NULL,
    logo_url VARCHAR(255),
    sehir VARCHAR(50)
);

CREATE TABLE oyuncular (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ad_soyad VARCHAR(100) NOT NULL,
    numara INT,
    yas INT,
    mevki VARCHAR(50),
    takim_id INT,
    piyasa_degeri DECIMAL(10,2),
    ulke VARCHAR(50),
    FOREIGN KEY (takim_id) REFERENCES takimlar(id)
);

CREATE TABLE oyuncu_istatistikleri (
    id INT PRIMARY KEY AUTO_INCREMENT,
    oyuncu_id INT,
    mac_sayisi INT DEFAULT 0,
    goller INT DEFAULT 0,
    asistler INT DEFAULT 0,
    sutlar INT DEFAULT 0,
    sut_hedefte INT DEFAULT 0,
    pas_basarisi_yuzdesi DECIMAL(5,2),
    top_kazanma INT DEFAULT 0,
    top_calma INT DEFAULT 0,
    sari_kartlar INT DEFAULT 0,
    kirmizi_kartlar INT DEFAULT 0,
    dakika_suresi INT DEFAULT 0,
    FOREIGN KEY (oyuncu_id) REFERENCES oyuncular(id)
);

-- Örnek takım verisi
INSERT INTO takimlar (takim_adi, sehir) VALUES
('Galatasaray', 'İstanbul'),
('Fenerbahçe', 'İstanbul'),
('Beşiktaş', 'İstanbul');

-- Örnek oyuncu verisi (Galatasaray için)
INSERT INTO oyuncular (ad_soyad, numara, yas, mevki, takim_id, piyasa_degeri, ulke) VALUES
('Mauro Icardi', 9, 30, 'Forvet', 1, 45.0, 'Arjantin'),
('Kerem Aktürkoğlu', 7, 25, 'Kanat', 1, 35.0, 'Türkiye'),
('Lucas Torreira', 34, 27, 'Orta Saha', 1, 20.0, 'Uruguay'),
('Wilfried Zaha', 10, 31, 'Kanat', 1, 32.0, 'Fildişi Sahili'),
('Davinson Sanchez', 6, 27, 'Defans', 1, 18.0, 'Kolombiya'),
('Fernando Muslera', 1, 37, 'Kaleci', 1, 8.0, 'Uruguay'),
('Victor Nelsson', 25, 25, 'Defans', 1, 22.0, 'Danimarka'),
('Hakim Ziyech', 22, 30, 'Kanat', 1, 25.0, 'Fas'),
('Dries Mertens', 10, 36, 'Forvet', 1, 15.0, 'Belçika'),
('Kaan Ayhan', 5, 29, 'Defans', 1, 12.0, 'Türkiye'); 