const appName = "To-Do List"; 
const maxTasks = 10; 
const isPremium = false; 
let taskCount = 0; 
window.addEventListener('DOMContentLoaded', () => {
    alert(`Welcome to ${appName}!`);
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskCount = savedTasks.length;
    updateTaskCounter();
});
function updateTaskCounter() {
    const counterElement = document.getElementById('task-counter');
    if (counterElement) {
        counterElement.textContent = `${taskCount}/${maxTasks} tasks`;

        if (taskCount >= maxTasks) {
            counterElement.style.color = 'red';
            alert("You've reached your task limit!");
        } else {
            counterElement.style.color = 'inherit';
        }
    }
}

function getRandomMotivation() {
    const motivations = [
        "You got this!",
        "One task at a time!",
        "Productivity mode activated!",
        `${Math.floor(Math.random() * 100)}% awesome!`
    ];
    return motivations[Math.floor(Math.random() * motivations.length)];
}
const categories = ['Work', 'Personal', 'Shopping'];
function displayCategories() {
    const categoryList = document.getElementById('category-list');
    if (categoryList) {
        categoryList.innerHTML = '';
        categories.forEach(category => {
            const li = document.createElement('li');
            li.textContent = category;
            categoryList.appendChild(li);
        });
    }
}
function setupEventListeners() {
    const addTaskBtn = document.getElementById('add-task');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', function() {
            taskCount++;
            updateTaskCounter();
            console.log('Task ' + taskCount + ' added');
        });
    }
    const motivationBtn = document.getElementById('motivation-btn');
    if (motivationBtn) {
        motivationBtn.addEventListener('click', function() {
            const motivationElement = document.getElementById('motivation-text');
            if (motivationElement) {
                motivationElement.textContent = getRandomMotivation();
            }
        });
    }
}
displayCategories();
setupEventListeners();