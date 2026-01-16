const { body, validationResult } = require('express-validator');

// Login validasyonu
const validateLogin = [
    body('email')
        .isEmail()
        .withMessage('Geçerli bir e-posta adresi giriniz'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Şifre en az 6 karakter olmalıdır'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                errors: errors.array() 
            });
        }
        next();
    }
];

module.exports = {
    validateLogin
}; 