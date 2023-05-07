import format from 'date-fns/format';

class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  formatDate() {
    return format(new Date(this.dueDate), 'dd/MM/yyyy');
  }
}

export default Todo;
