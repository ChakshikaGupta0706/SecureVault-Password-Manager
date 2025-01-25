document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('theme-switch');
    const passwordForm = document.getElementById('passform');
    const tableBody = document.getElementById('tableBody');
    const noPasswordsSection = document.getElementById('no-passwords');
    const passwordToggle = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
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

    passwordToggle.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        passwordToggle.querySelector('i').classList.toggle('fa-eye');
        passwordToggle.querySelector('i').classList.toggle('fa-eye-slash');
    });
    const generatePasswordBtn = document.getElementById('generate-password');
    const passwordLengthInput = document.getElementById('password-length');
    const uppercaseCheckbox = document.getElementById('include-uppercase');
    const lowercaseCheckbox = document.getElementById('include-lowercase');
    const numbersCheckbox = document.getElementById('include-numbers');
    const symbolsCheckbox = document.getElementById('include-symbols');
    const generatedPasswordDisplay = document.getElementById('generated-password-display');

    generatePasswordBtn.addEventListener('click', () => {
        const length = parseInt(passwordLengthInput.value);
        const includeUppercase = uppercaseCheckbox.checked;
        const includeLowercase = lowercaseCheckbox.checked;
        const includeNumbers = numbersCheckbox.checked;
        const includeSymbols = symbolsCheckbox.checked;

        const password = generatePassword(length, {
            uppercase: includeUppercase,
            lowercase: includeLowercase,
            numbers: includeNumbers,
            symbols: includeSymbols
        });

        generatedPasswordDisplay.textContent = password;
        passwordInput.value = password;
    });

    function generatePassword(length, options) {
        const charset = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
        };

        let validChars = '';
        if (options.uppercase) validChars += charset.uppercase;
        if (options.lowercase) validChars += charset.lowercase;
        if (options.numbers) validChars += charset.numbers;
        if (options.symbols) validChars += charset.symbols;

        if (validChars === '') {
            alert('Please select at least one character type');
            return '';
        }

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * validChars.length);
            password += validChars[randomIndex];
        }

        return password;
    }

    const savePasswords = (passwords) => {
        localStorage.setItem('savedPasswords', JSON.stringify(passwords));
    };

    const loadPasswords = () => {
        const savedPasswords = JSON.parse(localStorage.getItem('savedPasswords') || '[]');
        renderPasswords(savedPasswords);
        return savedPasswords;
    };

    const renderPasswords = (passwords) => {
        tableBody.innerHTML = '';

        if (passwords.length === 0) {
            noPasswordsSection.style.display = 'block';
            return;
        }

        noPasswordsSection.style.display = 'none';

        passwords.forEach((pass, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${pass.website}</td>
                <td>${pass.username}</td>
                <td>
                    <span class="password-mask">*******</span>
                    <span class="password-reveal" style="display:none;">${pass.password}</span>
                    <button class="reveal-password">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
                <td>
                    <button class="delete-password" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            const revealBtn = row.querySelector('.reveal-password');
            const passwordMask = row.querySelector('.password-mask');
            const passwordReveal = row.querySelector('.password-reveal');
            
            revealBtn.addEventListener('click', () => {
                passwordMask.style.display = passwordMask.style.display === 'none' ? 'inline' : 'none';
                passwordReveal.style.display = passwordReveal.style.display === 'none' ? 'inline' : 'none';
            });

            tableBody.appendChild(row);
        });
        tableBody.querySelectorAll('.delete-password').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.currentTarget.getAttribute('data-index');
                deletePassword(index);
            });
        });
    };

    const deletePassword = (index) => {
        let passwords = loadPasswords();
        passwords.splice(index, 1);
        savePasswords(passwords);
        renderPasswords(passwords);
    };

    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const website = document.getElementById('website').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        let passwords = loadPasswords();
        passwords.push({ website, username, password });
        savePasswords(passwords);
        renderPasswords(passwords);
        passwordForm.reset();
    });
    loadPasswords();


    const icon = document.getElementById("icon");
    const featurePanel = document.getElementById("featurepanel");

    icon.addEventListener("mouseenter", () => {
      featurePanel.classList.add("show");
    });

    featurePanel.addEventListener("mouseleave", () => {
      featurePanel.classList.remove("show");
    });

    const usericon = document.getElementById("usericon");
    const profilePanel = document.getElementById("profilepanel");

    usericon.addEventListener("mouseenter", () => {
      profilePanel.classList.add("show");
    });

    profilePanel.addEventListener("mouseleave", () => {
      profilePanel.classList.remove("show");
    });

    //Adds and reveals hidden notes
    const encryptedTextInput = document.getElementById('encryptedText');
    const toggleEncryptionIcon = document.querySelector('.toggle-encryption i');
    const addNoteButton = document.getElementById('addnote');
    const viewNoteButton = document.getElementById('viewnote');

    viewNoteButton.addEventListener('click',() =>{
        const savedNotes = JSON.parse(localStorage.getItem('secureNotes') || '[]');

        if (savedNotes.length === 0) {
            alert('No saved notes found');
            return;
        }

        const notesDisplay = savedNotes.map((note, index) => 
            `Note ${index + 1}:\n${note.text}\nAdded: ${note.timestamp}`
        ).join('\n\n');

        alert(notesDisplay);

    });

    toggleEncryptionIcon.addEventListener('click', () => {
        if (encryptedTextInput.type === 'password') {
            encryptedTextInput.type = 'text';
            toggleEncryptionIcon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            encryptedTextInput.type = 'password';
            toggleEncryptionIcon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    });

    addNoteButton.addEventListener('click', () => {
        const noteText = encryptedTextInput.value;
        if (!noteText) return;

        const savedNotes = JSON.parse(localStorage.getItem('secureNotes') || '[]');
        
        savedNotes.push({
            text: noteText,
            timestamp: new Date().toLocaleString()
        });

        localStorage.setItem('secureNotes', JSON.stringify(savedNotes));

        encryptedTextInput.value = '';
        
        alert('Note added successfully!');
    });
});