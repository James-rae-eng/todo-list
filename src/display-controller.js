// eslint-disable-next-line import/no-extraneous-dependencies
import format from 'date-fns/format';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@fortawesome/fontawesome-free/js/fontawesome';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@fortawesome/fontawesome-free/js/solid';

const formatDate = (date) => format(new Date(date), 'eee do MMM'); // 'dd/MM/yyyy'

// Display list of all todos in catagory on screen
const listDisplay = (activeCategory) => {
  const list = document.getElementById('list');
  list.innerHTML = '';

  // iterate through catagory
  if (activeCategory.list.length !== 0 || activeCategory.list !== undefined) {
    activeCategory.list.forEach((element, index) => {
      const todo = document.createElement('div');
      todo.className = 'todo';
      todo.dataset.indexNumber = index;

      const todoHead = document.createElement('div');
      todoHead.className = 'todoHead';

      const expanded = document.createElement('div');
      expanded.className = 'expanded';
      expanded.style.display = 'none';

      const title = document.createElement('p');
      title.innerHTML = element.title;
      title.className = 'title';
      todoHead.appendChild(title);

      const container = document.createElement('div');
      container.className = 'extra';
      const date = document.createElement('p');
      date.innerHTML = formatDate(element.dueDate);
      container.appendChild(date);
      const priority = document.createElement('p');
      priority.innerHTML = element.priority;
      container.appendChild(priority);
      todoHead.appendChild(container);

      todo.appendChild(todoHead);

      const desciption = document.createElement('p');
      desciption.innerHTML = element.description;

      const expandButtons = document.createElement('div');
      expandButtons.className = 'expandButtons';
      const editBtn = document.createElement('button');
      editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
      editBtn.className = 'edit';
      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
      deleteBtn.className = 'delete';

      expanded.appendChild(desciption);

      expanded.appendChild(expandButtons);
      expandButtons.appendChild(editBtn);
      expandButtons.appendChild(deleteBtn);

      todo.appendChild(expanded);

      list.appendChild(todo);
    });
  }
};

// setup initial home page category
const createHome = (home) => {
  const cat = document.getElementById('categories');
  const newCategory = document.createElement('h3');
  newCategory.className = 'category';
  newCategory.innerHTML = home.title;

  cat.appendChild(newCategory);
};

// display category
const displayCategory = (category) => {
  const categories = document.getElementById('categories');
  const newCategory = document.createElement('h3');
  newCategory.className = 'category';
  newCategory.innerHTML = category.title;

  categories.appendChild(newCategory);
};

export { listDisplay, createHome, displayCategory };
