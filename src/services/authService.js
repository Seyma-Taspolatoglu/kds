const jwt = require('jsonwebtoken');
const config = require('../config/config');
const logger = require('../utils/logger');

class AuthService {
    login(email, password) {
        try {
            // Gerçek uygulamada veritabanından kullanıcı kontrolü yapılır
            if (email === 'admin@gmail.com' && password === 'admintaspolat') {
                const token = jwt.sign(
                    { id: 1, email: email },
                    config.jwt.secret,
                    { expiresIn: config.jwt.expiresIn }
                );

                return {
                    success: true,
                    token,
                    user: { id: 1, email }
                };
            }
            return { success: false, message: 'Geçersiz kimlik bilgileri' };
        } catch (error) {
            logger.error('Login hatası:', error);
            throw new Error('Giriş işlemi başarısız');
        }
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, config.jwt.secret);
        } catch (error) {
            logger.error('Token doğrulama hatası:', error);
            return false;
        }
    }
}

module.exports = new AuthService(); 