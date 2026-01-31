// Simple To-Do App with Local Storage
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the to-do page
    const todoInput = document.getElementById('todoInput');
    if (!todoInput) return; // Not on to-do page
    
    // Get elements
    const addBtn = document.getElementById('addBtn');
    const todoList = document.getElementById('todoList');
    const emptyMessage = document.getElementById('emptyMessage');
    const totalTasksEl = document.getElementById('totalTasks');
    const completedTasksEl = document.getElementById('completedTasks');
    const pendingTasksEl = document.getElementById('pendingTasks');
    
    // Load todos from localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    
    // Display todos
    function renderTodos() {
        todoList.innerHTML = '';
        
        if (todos.length === 0) {
            emptyMessage.style.display = 'block';
            return;
        }
        
        emptyMessage.style.display = 'none';
        
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            if (todo.completed) li.classList.add('completed');
            
            li.innerHTML = `
                <span class="todo-text">${todo.text}</span>
                <div class="todo-actions">
                    <button class="complete-btn" data-index="${index}">
                        ${todo.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </div>
            `;
            
            todoList.appendChild(li);
        });
        
        updateStats();
    }
    
    // Add new todo
    function addTodo() {
        const text = todoInput.value.trim();
        if (!text) {
            alert('Please enter a task!');
            return;
        }
        
        todos.push({
            text: text,
            completed: false,
            id: Date.now()
        });
        
        saveTodos();
        todoInput.value = '';
        renderTodos();
    }
    
    // Save to localStorage
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    // Update statistics
    function updateStats() {
        const total = todos.length;
        const completed = todos.filter(todo => todo.completed).length;
        const pending = total - completed;
        
        totalTasksEl.textContent = total;
        completedTasksEl.textContent = completed;
        pendingTasksEl.textContent = pending;
    }
    
    // Event delegation for buttons
    todoList.addEventListener('click', function(e) {
        if (e.target.classList.contains('complete-btn')) {
            const index = e.target.dataset.index;
            todos[index].completed = !todos[index].completed;
            saveTodos();
            renderTodos();
        }
        
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.dataset.index;
            if (confirm('Delete this task?')) {
                todos.splice(index, 1);
                saveTodos();
                renderTodos();
            }
        }
    });
    
    // Event listeners
    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addTodo();
    });
    
    // Initial render
    renderTodos();
});

// Contact page functionality
document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submitContact');
    if (!submitBtn) return;
    
    submitBtn.addEventListener('click', function() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const contactMessage = document.getElementById('contactMessage');
        
        // Simple validation
        if (!name || !email || !message) {
            contactMessage.textContent = 'Please fill in all fields.';
            contactMessage.className = 'message error';
            return;
        }
        
        // In a real app, you would send this data to a server
        contactMessage.textContent = 'Thank you for your message!';
        contactMessage.className = 'message success';
        
        // Clear the form
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
    });
});