import './style.css';
import Category from './category';
import Todo from './todo';
import { listDisplay, createHome, displayCategory } from './display-controller';

// localStorage.clear();

// Initialise variables
const todoForm = document.getElementById('todoForm');
const categoryForm = document.getElementById('categoryForm');

// create catagories list and add default home category
const categories = localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : [];

let activeCategory = categories[0];

const styleCategory = () => {
  // Set an active id on the active category to use for styling
  const allCategories = document.getElementsByClassName('category');
  Array.from(allCategories).forEach((category) => {
    category.id = ''; // eslint-disable-line no-param-reassign
    if (category.innerHTML === activeCategory.title) {
      category.id = 'active'; // eslint-disable-line no-param-reassign
    }
  });
};

const switchCategoryName = () => {
  // Update title above todo list
  document.getElementById('currentCategory').innerHTML = activeCategory.title;
  styleCategory();
};

const switchCategory = (newCategory) => {
  activeCategory = newCategory;
};

// Add home category if there's no local storage
const addHome = () => {
  if (categories.length === 0) {
    const home = new Category('Home');
    categories.push(home);
    createHome(home);
    localStorage.setItem('categories', JSON.stringify(categories));
  }
};

// Set up initial conditions for first/ fresh load of the page
categories.forEach((category) => displayCategory(category));
addHome();
listDisplay(activeCategory);
document.getElementById('currentCategory').innerHTML = activeCategory.title;
styleCategory();

// When editing a todo fill the form and prepare it for a form submit
const editTodoFill = (e) => {
  if (e.target && e.target.matches('.edit')) {
    const index = e.target.parentNode.parentNode.parentNode.dataset.indexNumber;
    // Set todo as a variable
    const todo = activeCategory.list[index];
    // open & fill form with todo values
    todoForm.style.display = 'block';
    todoForm.title.value = todo.title;
    todoForm.description.value = todo.description;
    todoForm.dueDate.value = todo.dueDate;
    todoForm.priority.value = todo.priority;
    // Give form a data attribute of the index so the form submit can handle it
    todoForm.dataset.indexNumber = index;
  }
};

// Delete todo
const deleteTodo = (e) => {
  if (e.target && e.target.matches('.delete')) {
    const index = e.target.parentNode.parentNode.dataset.indexNumber;
    // Set todo as a variable
    activeCategory.list.splice(index, 1);
    // Update the list of todos
    listDisplay(activeCategory);
    // Update localstorage
    localStorage.setItem('categories', JSON.stringify(categories));
  }
};

// Create a new todo/ edit existing one
const createTodo = (formValue) => {
  if (todoForm.dataset.indexNumber === 'none') {
    const todo = new Todo(
      formValue.title.value,
      formValue.description.value,
      formValue.dueDate.value,
      formValue.priority.value,
    );
    // Push Obj to category array.
    activeCategory.list.push(todo);
  } else {
    // Edit existing todo item
    const todo = activeCategory.list[todoForm.dataset.indexNumber];
    todo.title = formValue.title.value;
    todo.description = formValue.description.value;
    todo.dueDate = formValue.dueDate.value;
    todo.priority = formValue.priority.value;
    todoForm.dataset.indexNumber = 'none';
  }

  // Reset form fields
  todoForm.reset();
  // Hide form
  todoForm.style.display = 'none';
  // Update the list of todos
  listDisplay(activeCategory);
  // Update localstorage
  localStorage.setItem('categories', JSON.stringify(categories));
};

// Add new/ edit existing/ delete category
const createCategory = (formValue) => {
  // If form is blank and there is a category to edit, delete the category
  if (formValue.title.value === '' && categories.some((cat) => cat.edit === true)) {
    const selectedCategory = categories.find((cat) => cat.edit === true);
    const index = categories.indexOf(selectedCategory) + 1;
    // Delete the category & reset localstorage with the new array
    categories.splice((index - 1), 1);
    localStorage.setItem('categories', JSON.stringify(categories));
    // Remove the div of the selected category
    document.getElementById('categories').innerHTML = '';
    categories.forEach((category) => displayCategory(category));
  } else if (formValue.title.value === '') { // If the form is empty and theres no category, close form
    categoryForm.style.display = 'none';
  } else if (categories.some((cat) => cat.edit === true)) { // Edit category
    // Find the category to edit & store it's index (+1 to use with div.children)
    const selectedCategory = categories.find((cat) => cat.edit === true);
    const index = categories.indexOf(selectedCategory) + 1;
    // Update the div to reflect the new category title
    document.getElementById('categories').children[index].innerHTML = formValue.title.value;
    // Update the category object title & clear its edit status
    selectedCategory.title = formValue.title.value;
    selectedCategory.edit = false;
  } else {
    // Create new category
    const category = new Category(
      formValue.title.value,
    );
    // Push new category into categories list
    categories.push(category);
    // Add to local storage
    localStorage.setItem('categories', JSON.stringify(categories));
    // Display new category
    displayCategory(category);
  }

  // Reset form fields
  categoryForm.reset();
  // Hide form
  categoryForm.style.display = 'none';
};

// Event listener on todo list, (made like this so that it works when todo's not yet created)
const list = document.getElementById('list');
list.addEventListener('click', (e) => {
  // Expand todo to include desciption when clicked
  if (e.target && e.target.matches('.todoHead, .todoHead > *')) { // Fix this to only target expanded
    const expanded = e.target.nextElementSibling;
    if (expanded.style.display === 'none') {
      expanded.style.display = 'flex';
    } else {
      expanded.style.display = 'none';
    }
  }
  // Edit todo when edit button clicked
  editTodoFill(e);

  // Delete todo when delete button clicked
  deleteTodo(e);
});

// Handle click to create new todo
todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // Capture form details & send to create todo function
  const formValue = event.target.elements;
  createTodo(formValue);
});

// Open form to add a new todo item
const addTodo = document.getElementById('addTodo');
addTodo.addEventListener('click', () => {
  if (todoForm.style.display === 'none') {
    todoForm.style.display = 'flex';
  } else {
    todoForm.style.display = 'none';
  }
});

// Add new/ edit category
categoryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // Capture form details & send to create category function
  const formValue = event.target.elements;
  createCategory(formValue);
});

// Open new category form when button clicked
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
  if (e.target && e.target.matches('.category')) {
    const selectedCategory = categories.find((category) => category.title === e.target.innerHTML);
    if (selectedCategory !== activeCategory) {
      switchCategory(selectedCategory);
      switchCategoryName();
      listDisplay(activeCategory);
    }
  }
});

// Allow renaming of a category
catList.addEventListener('dblclick', (e) => {
  if (e.target && e.target.matches('.category')) {
    const selectedCategory = categories.find((category) => category.title === e.target.innerHTML);
    selectedCategory.edit = true;
    categoryForm.style.display = 'block';
    categoryForm.title.value = selectedCategory.title;
  }
});
