const API_BASE = 'http://localhost:4000/api';

let token = null;

const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const loginSection = document.getElementById('login-section');
const appSection = document.getElementById('app-section');

const notesList = document.getElementById('notes-list');
const noteForm = document.getElementById('note-form');
const noteTitle = document.getElementById('note-title');
const noteContent = document.getElementById('note-content');

const todosList = document.getElementById('todos-list');
const todoForm = document.getElementById('todo-form');
const todoTitle = document.getElementById('todo-title');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  loginError.textContent = '';

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      loginError.textContent = 'Login inválido';
      return;
    }

    const data = await res.json();
    token = data.token;
    loginSection.style.display = 'none';
    appSection.style.display = 'block';
    loadNotes();
    loadTodos();
  } catch (err) {
    loginError.textContent = 'Error de conexión';
  }
});

async function loadNotes() {
  notesList.innerHTML = '';
  const res = await fetch(`${API_BASE}/notes`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const notes = await res.json();
  notes.forEach(n => {
    const li = document.createElement('li');
    li.textContent = `${n.title}: ${n.content || ''}`;
    notesList.appendChild(li);
  });
}

async function loadTodos() {
  todosList.innerHTML = '';
  const res = await fetch(`${API_BASE}/todos`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const todos = await res.json();
  todos.forEach(t => {
    const li = document.createElement('li');
    li.textContent = t.title;
    todosList.appendChild(li);
  });
}

noteForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = noteTitle.value;
  const content = noteContent.value;

  const res = await fetch(`${API_BASE}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title, content })
  });

  if (res.ok) {
    noteTitle.value = '';
    noteContent.value = '';
    loadNotes();
  }
});

todoForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = todoTitle.value;

  const res = await fetch(`${API_BASE}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title })
  });

  if (res.ok) {
    todoTitle.value = '';
    loadTodos();
  }
});
