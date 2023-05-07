import './style.css';
import Category from './category';
import Todo from './todo';

// Initialise variables
const form = document.getElementById('todoForm');

// create default home category, create active category instance, add switching
const home = new Category('home');
let activeCategory = home;

const switchCategory = (newCategory) => {
  activeCategory = newCategory;
};

// Display list of all todos in catagory on screen
function listDisplay() {
  const list = document.getElementById('list');
  list.innerHTML = '';

  // iterate through catagory
  activeCategory.list.forEach((element) => {
    const todo = document.createElement('div');
    todo.id = 'todo';

    const todoHead = document.createElement('div');
    todoHead.id = 'todoHead';

    const expanded = document.createElement('div');
    expanded.id = 'expanded';
    expanded.style.display = 'none';

    const title = document.createElement('p');
    title.innerHTML = element.title;
    todoHead.appendChild(title);
    const date = document.createElement('p');
    date.innerHTML = element.formatDate();
    todoHead.appendChild(date);
    const priority = document.createElement('p');
    priority.innerHTML = element.priority;
    todoHead.appendChild(priority);

    todo.appendChild(todoHead);

    const desciption = document.createElement('p');
    desciption.innerHTML = element.description;
    expanded.appendChild(desciption);

    todo.appendChild(expanded);

    list.appendChild(todo);
  });
}

// Expand todo to include desciption when clicked
const list = document.getElementById('list');
list.addEventListener('click', (e) => {
  if (e.target && e.target.matches('#todoHead')) {
    const expanded = e.target.nextElementSibling;
    if (expanded.style.display === 'none') {
      expanded.style.display = 'flex';
    } else {
      expanded.style.display = 'none';
    }
  }
});

// Create new todo
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formValue = event.target.elements;

  const todo = new Todo(
    formValue.title.value,
    formValue.description.value,
    formValue.dueDate.value,
    formValue.priority.value,
  );

  // Push Obj to category array.
  activeCategory.list.push(todo);
  // Reset form fields
  form.reset();
  // Hide form
  form.style.display = 'none';
  // Update the list of todos
  listDisplay();
});

const addTodo = document.getElementById('addTodo');
addTodo.addEventListener('click', () => {
  if (form.style.display === 'none') {
    form.style.display = 'block';
  } else {
    form.style.display = 'none';
  }
});
