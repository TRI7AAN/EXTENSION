// Select the input, add button, and tasks list elements
const taskInput = document.getElementById('newTask');
const addTaskButton = document.getElementById('addTask');
const tasksList = document.getElementById('tasks');

// Function to load tasks from Chrome storage
function loadTasks() {
  chrome.storage.sync.get(['tasks'], (result) => {
    const tasks = result.tasks || [];
    tasksList.innerHTML = '';  // Clear existing tasks
    tasks.forEach((task, index) => {
      const taskElement = createTaskElement(task, index);
      tasksList.appendChild(taskElement);
    });
  });
}

// Function to save tasks to Chrome storage
function saveTasks(tasks) {
  chrome.storage.sync.set({ tasks });
}

// Function to create a task element
function createTaskElement(task, index) {
  const li = document.createElement('li');
  li.className = 'task';
  li.textContent = task;
  
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => deleteTask(index);
  
  li.appendChild(deleteButton);
  return li;
}

// Add a new task
function addTask() {
  const task = taskInput.value.trim();
  if (task) {
    chrome.storage.sync.get(['tasks'], (result) => {
      const tasks = result.tasks || [];
      tasks.push(task);
      saveTasks(tasks);
      taskInput.value = '';  // Clear the input
      loadTasks();           // Reload the tasks
    });
  }
}

// Delete a task
function deleteTask(index) {
  chrome.storage.sync.get(['tasks'], (result) => {
    const tasks = result.tasks || [];
    tasks.splice(index, 1);  // Remove task by index
    saveTasks(tasks);
    loadTasks();             // Reload the tasks
  });
}

// Event listeners
addTaskButton.addEventListener('click', addTask);
document.addEventListener('DOMContentLoaded', loadTasks);  // Load tasks on startup
