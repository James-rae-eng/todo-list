// Display list of all todos in catagory on screen
const listDisplay = (activeCategory) => {
  const list = document.getElementById('list');
  list.innerHTML = '';

  // iterate through catagory
  if (activeCategory.list !== undefined || activeCategory.list.length !== 0) {
    activeCategory.list.forEach((element, index) => {
      const todo = document.createElement('div');
      todo.id = 'todo';
      todo.dataset.indexNumber = index;

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

      const editBtn = document.createElement('button');
      editBtn.innerHTML = 'Edit';
      editBtn.id = 'edit';
      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = 'Delete';
      deleteBtn.id = 'delete';

      expanded.appendChild(desciption);
      expanded.appendChild(editBtn);
      expanded.appendChild(deleteBtn);

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

  document.getElementById('currentCategory').innerHTML = home.title;
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
