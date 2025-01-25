document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('theme-switch');
    const passwordForm = document.getElementById('passform');
    const tableBody = document.getElementById('tableBody');
    const noPasswordsSection = document.getElementById('no-passwords');
    const passwordToggle = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    const signupBtn = document.getElementById('signup-btn');
    const signupSection = document.getElementById('signup-section');
    const signupForm = document.getElementById('signupform');
    const loginForm = document.getElementById('loginform');
    
    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeSwitch.checked = savedTheme === 'dark';
    };
    initTheme();

    themeSwitch.addEventListener('change', () => {
        const theme = themeSwitch.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });

    const icon = document.getElementById("icon");
    const featurePanel = document.getElementById("featurepanel");

    icon.addEventListener("mouseenter", () => {
      featurePanel.classList.add("show");
    });

    featurePanel.addEventListener("mouseleave", () => {
      featurePanel.classList.remove("show");
    });

    signupBtn.addEventListener('click', () => {
        signupSection.style.display = 
           signupSection.style.display === 'none' ? 'block' : 'none';
    });

    //User signup form submission in localStorage
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = signupForm.querySelector('#signup-username').value;
        const email = signupForm.querySelector('#signup-email').value.trim();
        const password = signupForm.querySelector('#signup-password').value.trim();
        const confirmPassword= signupForm.querySelector('#signup-confirm-password').value.trim();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');

        if (users.some(user => user.email === email)) {
            alert('User already exists');
            return;
        }
        
        users.push({ username, email, password, passwords: [] });
        localStorage.setItem('users',JSON.stringify(users));

        alert('Signup successful');
        signupForm.reset();
    });

    //User Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('#email-input').value.trim();
        const password = loginForm.querySelector('#password-input').value.trim();

        console.log('Entered Email:', email);
        console.log('Entered Password', password);

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        console.log('Stored Users:', users);

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'pass-org.html';
        } else {
            alert('Invalid email or password');
        }

        loginForm.reset();
    });

});
