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

// Add event listener to parts of list items not yet created (when list is empty)
const list = document.getElementById('list');
list.addEventListener('click', (e) => {
  // Expand todo to include desciption when clicked
  if (e.target && e.target.matches('#todoHead')) {
    const expanded = e.target.nextElementSibling;
    if (expanded.style.display === 'none') {
      expanded.style.display = 'flex';
    } else {
      expanded.style.display = 'none';
    }
  }
  // Edit todo when edit button clicked
  if (e.target && e.target.matches('#edit')) {
    const index = e.target.parentNode.parentNode.dataset.indexNumber;
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
  // Delete todo when delete button clicked
  if (e.target && e.target.matches('#delete')) {
    const index = e.target.parentNode.parentNode.dataset.indexNumber;
    // Set todo as a variable
    activeCategory.list.splice(index, 1);
    // Update the list of todos
    listDisplay(activeCategory);
  }
});

// Create new todo
todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formValue = event.target.elements;

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
});

// Add a new todo item
const addTodo = document.getElementById('addTodo');
addTodo.addEventListener('click', () => {
  if (todoForm.style.display === 'none') {
    todoForm.style.display = 'block';
  } else {
    todoForm.style.display = 'none';
  }
});

// Add new/ edit category
categoryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formValue = event.target.elements;

  // If form is blank and there is a category to edit, delete the category
  if (formValue.title.value === '' && categories.some((cat) => cat.edit === true)) {
    const selectedCategory = categories.find((cat) => cat.edit === true);
    const index = categories.indexOf(selectedCategory) + 1;
    // Remove the div of the selected category
    const category = document.getElementById('categories').children[index];
    document.getElementById('categories').removeChild(category);
    // Delete the category
    categories.splice((index - 1));
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
    // Display new category
    displayCategory(category);
  }

  // Reset form fields
  categoryForm.reset();
  // Hide form
  categoryForm.style.display = 'none';
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
