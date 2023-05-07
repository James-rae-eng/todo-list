import './style.css';
import Category from './category';
import Todo from './todo';
import { listDisplay, createHome, displayCategory } from './display-controller';

// Initialise variables
const todoForm = document.getElementById('todoForm');
const categoryForm = document.getElementById('categoryForm');

// create initial default home category
const home = new Category('Home');
let activeCategory = home;
createHome(home);

// create catagories list and add default home category
const categories = [];
categories.push(home);

const switchCategoryName = () => {
  document.getElementById('currentCategory').innerHTML = activeCategory.title;
};

const switchCategory = (newCategory) => {
  activeCategory = newCategory;
};

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
todoForm.addEventListener('submit', (event) => {
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
  todoForm.reset();
  // Hide form
  todoForm.style.display = 'none';
  // Update the list of todos
  listDisplay(activeCategory);
});

const addTodo = document.getElementById('addTodo');
addTodo.addEventListener('click', () => {
  if (todoForm.style.display === 'none') {
    todoForm.style.display = 'block';
  } else {
    todoForm.style.display = 'none';
  }
});

// Add new category
categoryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formValue = event.target.elements;

  const category = new Category(
    formValue.title.value,
  );

  // Push new category into categories list
  categories.push(category);
  // Reset form fields
  categoryForm.reset();
  // Hide form
  categoryForm.style.display = 'none';
  // Display new category
  displayCategory(category);
});

const addCategory = document.getElementById('addCategory');
addCategory.addEventListener('click', () => {
  if (categoryForm.style.display === 'none') {
    categoryForm.style.display = 'block';
  } else {
    categoryForm.style.display = 'none';
  }
});

// allow clicking & switching of categrory
const catList = document.getElementById('categories');
catList.addEventListener('click', (e) => {
  if (e.target && e.target.matches('#category')) {
    const selectedCategory = categories.find((category) => category.title === e.target.innerHTML);
    if (selectedCategory !== activeCategory) {
      switchCategory(selectedCategory);
      switchCategoryName();
      listDisplay(activeCategory);
    }
  }
});
