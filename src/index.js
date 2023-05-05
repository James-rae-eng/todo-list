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
  // Update the list of books.
});

const addTodo = document.getElementById('addTodo');
addTodo.addEventListener('click', () => {
  if (form.style.display === 'none') {
    form.style.display = 'block';
  } else {
    form.style.display = 'none';
  }
});
