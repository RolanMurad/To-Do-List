// !Searching Elements
const newTasks = document.querySelector('.new-tasks');
const addNewTask = document.querySelector('.todo__tasks-btn');
const removeTask = document.querySelectorAll('[data-remove]');
const perfomedTaskBtn = document.querySelector('.btn-remove');
const input = document.querySelector('.todo__list-input');
const image = document.querySelector('.todo__img');
const removeAllTasksBtn = document.querySelector('[data-remove-all-tasks]');
const headerBtn = document.querySelector('.header__content-btn');
const todoTasks = document.getElementById('todo-tasks');

// !Adding a new task
addNewTask.addEventListener('click', addingNewTask);

// !Adding a new task by pressing Enter 
input.addEventListener('keyup', pressingEnter);

// !Delete tasks
document.addEventListener('click', deleteTasks);

// !Perfomed tasks
document.addEventListener('click', performedTasks);

// !Delete all completed tasks
perfomedTaskBtn.addEventListener('click', deleteAllComletedTasks);

// !Remove all tasks 
removeAllTasksBtn.addEventListener('click', removeAllTasks);

// !Scroll To Section
headerBtn.addEventListener('click', scrollToSection);

// !Saving to LS
if (localStorage.getItem('tasksHTML')) {
  newTasks.innerHTML = localStorage.getItem('tasksHTML');
}

// !Functions
function addingNewTask() {
  if (input.value !== '') {
    let newTask = `
          <li class="new-tasks__item">
            <span class="new-task__text">${input.value}</span>
            <div class="new-tasks__control">
              <button class="new-tasks__btn" data-performed="performed"><img src="./images/complete-btn.svg" alt="Compete Task Button"></button>
              <button class="new-tasks__btn" data-remove="remove"><img src="./images/remove-btn.svg" alt="Remove Task Button"></button>
            </div>
          </li>
    `
    // !Rendering
    newTasks.insertAdjacentHTML('beforeend', newTask);
    // !Clear input
    input.value = ' '
    // !Foocus Input
    input.focus()
    // !Hide The Image
    hideImage();
  } else {
    input.placeholder = 'You cannot add an empty task !'
  }
  saveHTMLtoLocalStorage();
}

function pressingEnter(event) {
  if (event.keyCode === 13 && this.value !== '') {
    addingNewTask()
  } else {
    input.placeholder = 'You cannot add an empty task !'
  }
  saveHTMLtoLocalStorage();
}

function deleteTasks(event) {
  if (event.target.hasAttribute('data-remove')) {
    event.target.closest('.new-tasks__item').remove();
  }
  showImage();
  saveHTMLtoLocalStorage();
}

function removeAllTasks() {
  let newTasksItem = document.querySelectorAll('.new-tasks__item');
  newTasksItem.forEach(function (item) {
    item.remove();
  })
  saveHTMLtoLocalStorage();
}

function performedTasks(event) {
  if (event.target.hasAttribute('data-performed')) {
    event.target.closest('.new-tasks__item').classList.toggle('performed');
  }
  saveHTMLtoLocalStorage();
}

function deleteAllComletedTasks() {
  let allPerformedTasks = document.querySelectorAll('.new-tasks__item');
  allPerformedTasks.forEach(function (item) {
    if (item.classList.contains('performed')) {
      item.remove();
    }
  })
  showImage();
  saveHTMLtoLocalStorage();
}

function hideImage() {
  if (newTasks.children.length > 0) {
    image.classList.add('hidden');
  }
}

function showImage() {
  if (newTasks.children.length == 0) {
    image.classList.remove('hidden');
  }
  saveHTMLtoLocalStorage();
}

function scrollToSection() {
  todoTasks.scrollIntoView({
    behavior: "smooth"
  })
}

function saveHTMLtoLocalStorage() {
  localStorage.setItem('tasksHTML', newTasks.innerHTML);
}

window.addEventListener('DOMContentLoaded', function () {
  if (newTasks.children.length > 0) {
    image.classList.add('hidden');
  }
})
