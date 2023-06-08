const form = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
let todos = [];

// Fungsi untuk menyimpan data to-do list ke local storage
function simpanData() {
    const todos = todoList.innerHTML;
    localStorage.setItem('todos', todos);

    const currentTime = new Date().getTime();
    localStorage.setItem('lastSaveTime', currentTime.toString());
}

// Fungsi untuk memuat data to-do list dari local storage saat halaman dimuat
function loadData() {
    const todos = localStorage.getItem('todos');
    const lastSaveTime = localStorage.getItem('lastSaveTime');

    if (todos && lastSaveTime) {
        const currentTime = new Date().getTime();
        const timeDiff = currentTime - parseInt(lastSaveTime);

        // Jika data masih valid (kurang dari 1 hari)
        if (timeDiff <= 86400000) {
            todoList.innerHTML = todos;
        } else {
            localStorage.removeItem('todos');
            localStorage.removeItem('lastSaveTime');
        }
    }
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const activity = document.getElementById('activity').value;
    const priority = document.getElementById('priority').value;
    const color = document.getElementById('color').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;

    

    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');
    todoItem.innerHTML = `
    
    <h3>${activity}</h3>
        <p>Priority: ${priority}</p>
        <div class="time-range">
            <p>Time: ${startTime} - ${endTime}</p>
        </div>
        <div class="actions">
            <button onclick="editTodoItem(this)">Edit</button>
            <button onclick="deleteTodoItem(this)">Delete</button>
        </div>
      
        
    `;

    todoList.appendChild(todoItem);

    form.reset();

    simpanData(); // Panggil fungsi simpanData() setelah menambah item baru
});

function editTodoItem(button) {
    const todoItem = button.parentNode.parentNode;
    const activity = todoItem.querySelector('h3').innerText;
    const priority = todoItem.querySelector('p').innerText;
    const timeRange = todoItem.querySelector('.time-range').innerText;
    const startTime = timeRange.split(' - ')[0];
    const endTime = timeRange.split(' - ')[1];

    document.getElementById('activity').value = activity;
    document.getElementById('priority').value = priority;
    document.getElementById('startTime').value = startTime;
    document.getElementById('endTime').value = endTime;

    todoItem.remove();

    simpanData(); // Panggil fungsi simpanData() setelah mengedit item
}

function deleteTodoItem(button) {
    const todoItem = button.parentNode.parentNode;
    const index = Array.from(todoList.children).indexOf(todoItem);
    todos.splice(index, 1);
    renderTodoList();
    todoItem.remove();

    simpanData(); // Panggil fungsi simpanData() setelah menghapus item
}

// Panggil fungsi loadData() saat halaman dimuat
loadData();