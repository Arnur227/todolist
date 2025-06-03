
const header = document.getElementById('main-header');
const taskItems = document.getElementsByClassName('task-item');
const firstTask = document.querySelector('.task-item');
const themeToggle = document.querySelector('#theme-toggle');
function applyInitialStyles() {
    if (header) {
        header.style.backgroundColor = '#2c3e50';
        header.style.padding = '20px';
        header.style.color = 'white';
    }

    if (firstTask) {
        firstTask.style.borderLeft = '4px solid #3498db';
    }
}
function updateWelcomeMessage() {
    const welcomeMsg = document.querySelector('.welcome-message');
    if (welcomeMsg) {
        welcomeMsg.textContent = localStorage.getItem('username') 
            ? `Welcome back, ${localStorage.getItem('username')}!` 
            : 'Welcome to your To-Do List!';
    }
}
function setupThemeToggle() {
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const icon = this.querySelector('i');
            if (document.body.classList.contains('dark-theme')) {
                icon.className = 'fas fa-sun';
                this.title = 'Switch to light mode';
            } else {
                icon.className = 'fas fa-moon';
                this.title = 'Switch to dark mode';
            }
        });
    }
}
function setupEventListeners() {
    const completeSound = new Audio('sounds/complete.mp3');
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('toggle-status')) {
            if (e.target.getAttribute('data-status') === 'done') {
                completeSound.play();
            }
        }
    });
    document.addEventListener('dblclick', function(e) {
        if (e.target.classList.contains('task-text')) {
            enableTaskEditing(e.target);
        }
    });
}
function handleInteraction(element, eventType, callback) {
    element.addEventListener(eventType, callback);
}
function playAddTaskSound() {
    const addSound = new Audio('sounds/add.mp3');
    addSound.play();
}
const appSettings = {
    theme: 'light',
    soundEnabled: true,
    notifications: true,
    toggleSound: function() {
        this.soundEnabled = !this.soundEnabled;
        updateSettingsDisplay();
    },
    toggleNotifications: function() {
        this.notifications = !this.notifications;
        updateSettingsDisplay();
    }
};

function updateSettingsDisplay() {
    const soundStatus = document.getElementById('sound-status');
    const notifyStatus = document.getElementById('notify-status');
    
    if (soundStatus) soundStatus.textContent = appSettings.soundEnabled ? 'ON' : 'OFF';
    if (notifyStatus) notifyStatus.textContent = appSettings.notifications ? 'ON' : 'OFF';
}
function initDOM() {
    applyInitialStyles();
    updateWelcomeMessage();
    setupThemeToggle();
    setupEventListeners();
    updateSettingsDisplay();
    
    const settingsBtn = document.getElementById('settings-btn');
    if (settingsBtn) {
        handleInteraction(settingsBtn, 'click', function() {
            document.getElementById('settings-panel').classList.toggle('show');
        });
    }
}
document.addEventListener('DOMContentLoaded', initDOM);