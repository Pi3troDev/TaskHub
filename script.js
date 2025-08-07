const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;
    if (task.completed) li.classList.add('completed');

    li.addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      saveAndRender();
    });

    const delBtn = document.createElement('button');
    delBtn.textContent = 'X';
    delBtn.classList.add('delete-btn');
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveAndRender();
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

function saveAndRender() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTask = {
    text: taskInput.value,
    completed: false
  };
  tasks.push(newTask);
  taskInput.value = '';
  saveAndRender();
});

renderTasks();
