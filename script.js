


let todoInput, addBtn, todoList, emptyMessage;
let totalTasksEl, completedTasksEl, pendingTasksEl;


if (document.getElementById('todoInput')) {
    todoInput = document.getElementById('todoInput');
    addBtn = document.getElementById('addBtn');
    todoList = document.getElementById('todoList');
    emptyMessage = document.getElementById('emptyMessage');
    totalTasksEl = document.getElementById('totalTasks');
    completedTasksEl = document.getElementById('completedTasks');
    pendingTasksEl = document.getElementById('pendingTasks');
}


let todos = JSON.parse(localStorage.getItem('todos')) || [];


document.addEventListener('DOMContentLoaded', function() {
  
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'todo.html' || currentPage === '') {
        initTodoPage();
    } else if (currentPage === 'contact.html') {
        initContactPage();
    }
});


function initTodoPage() {
 
    renderTodos();
    updateStats();
    
   
    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    
   
    toggleEmptyMessage();
}


function initContactPage() {
    const submitBtn = document.getElementById('submitContact');
    const contactMessage = document.getElementById('contactMessage');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            
            if (!name || !email || !message) {
                showMessage('Please fill in all fields.', 'error');
                return;
            }
            
            
            
            showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
            
           
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';
        });
    }
    
    function showMessage(text, type) {
        contactMessage.textContent = text;
        contactMessage.className = 'message ' + type;
        
       
        setTimeout(function() {
            contactMessage.textContent = '';
            contactMessage.className = 'message';
        }, 5000);
    }
}


function addTodo() {
    const text = todoInput.value.trim();
    
    if (text === '') {
        alert('Please enter a task!');
        return;
    }
    
   
    const todo = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
   
    todos.push(todo);
    
    
    saveTodos();
    
   
    todoInput.value = '';
    
   
    renderTodos();
    updateStats();
    toggleEmptyMessage();
    
    
    todoInput.focus();
}


function renderTodos() {
    
    todoList.innerHTML = '';
    
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.dataset.id = todo.id;
        
        if (todo.completed) {
            li.classList.add('completed');
        }
        
        li.innerHTML = `
            <span class="todo-text">${todo.text}</span>
            <div class="todo-actions">
                <button class="complete-btn">${todo.completed ? 'Undo' : 'Complete'}</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        
      
        const completeBtn = li.querySelector('.complete-btn');
        const deleteBtn = li.querySelector('.delete-btn');
        
        completeBtn.addEventListener('click', () => toggleComplete(todo.id));
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
        
        todoList.appendChild(li);
    });
}


function toggleComplete(id) {

    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex !== -1) {
        
        todos[todoIndex].completed = !todos[todoIndex].completed;
        
       
        saveTodos();
        
       
        renderTodos();
        updateStats();
    }
}


function deleteTodo(id) {
    if (confirm('Are you sure you want to delete this task?')) {
      
        todos = todos.filter(todo => todo.id !== id);
        
     
        saveTodos();
        
     
        renderTodos();
        updateStats();
        toggleEmptyMessage();
    }
}


function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}


function updateStats() {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const pending = total - completed;
    
    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
    pendingTasksEl.textContent = pending;
}


function toggleEmptyMessage() {
    if (todos.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
    }
}