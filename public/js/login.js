document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Kullanıcı adı ve şifre kontrolü
        if (email === 'admin@gmail.com' && password === 'admintaspolat') {
            // Başarılı giriş
            window.location.href = '/index.html';
        } else {
            // Başarısız giriş
            alert('Hatalı kullanıcı adı veya şifre!');
        }
    });
}); 