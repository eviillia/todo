import React from "react";
import './ToDo-list.css';
import Todo from './Todo.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      priority: "",
      todos: [],
      isFilterCompleteOn: false, 
    };
  }

  handleChangeName = (e) => {
    this.setState({ name: e.target.value });
  };

  handleChangeDescription = (e) => {
    this.setState({ description: e.target.value });
  };

  handleChangePriority = (e) => {
    this.setState({ priority: e.target.value });
  };

  handleAddTodos = () => {
    const trimmedName = this.state.name.trim();
    const trimmedDescription = this.state.description.trim();
  
    if (trimmedName === "") {
      alert("Название задачи не может быть пустым!");
      return;
    }
  
    if (trimmedName.length > 50) {
      alert("Название задачи слишком длинное! Максимум 50 символов.");
      return;
    }

    if (trimmedDescription === "") {
      alert("Описание задачи не может быть пустым!");
      return;
    }
  
    if (trimmedDescription.length > 500) {
      alert("Описание задачи слишком длинное! Максимум 500 символов.");
      return;
    }
  
    const newTodo = {
      name: trimmedName,
      description: trimmedDescription,
      checked: false,
      createdAt: +(new Date()),
      priority: this.state.priority,
    };
  
    this.setState({
      todos: [newTodo, ...this.state.todos],
      name: "",
      description: "",
      priority: ""
    });
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.handleAddTodos();
    }
  };

  handleCheckedTodos = (index) => (e) => {
    const newTodo = { ...this.state.todos[index], checked: e.target.checked };
    const newTodos = this.state.todos
      .map((todo, i) => (i === index ? newTodo : todo))
      .sort((a, b) => a.checked - b.checked);
    this.setState({ todos: newTodos });
  };

  handleDeleteTodos = (index) => () => {
    const newTodos = this.state.todos.filter((_, i) => i !== index);
    this.setState({ todos: newTodos });
  };

  handleChangeCompletionStatus = () => {
    this.setState({ isFilterCompleteOn: !this.state.isFilterCompleteOn });
  };

  calculatePercentage = () => {
    const amountTodos = this.state.todos.length;
    const completedTodos = this.state.todos.filter((todo) => todo.checked).length;
    return amountTodos === 0 ? 0 : Math.round((completedTodos / amountTodos) * 100);
  };

  render() {
    const filteredTodos = this.state.isFilterCompleteOn
      ? this.state.todos.filter((todo) => !todo.checked)
      : this.state.todos;

    return (
      <div className="main">
        <h1>Список задач</h1>
        <div>
          <input
            className="input-field"
            value={this.state.name}
            onChange={this.handleChangeName}
            onKeyDown={this.handleKeyDown} 
            placeholder="Введите название задачи"
          />
          <input
            className="input-field"
            value={this.state.description}
            onChange={this.handleChangeDescription}
            onKeyDown={this.handleKeyDown} 
            placeholder="Введите описание задачи"
          />
          <button className="add-button" onClick={this.handleAddTodos}>
            Добавить
          </button>
        </div>

        <div className="priority-section">
          <label>
            <input
              type="radio"
              value="critical"
              checked={this.state.priority === "critical"}
              onChange={this.handleChangePriority}
            />
            Критически важно
          </label>
          <label>
            <input
              type="radio"
              value="recommended"
              checked={this.state.priority === "recommended"}
              onChange={this.handleChangePriority}
            />
            Рекомендуется
          </label>
          <label>
            <input
              type="radio"
              value="normal"
              checked={this.state.priority === "normal"}
              onChange={this.handleChangePriority}
            />
            На будущее
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={this.state.isFilterCompleteOn}
              onChange={this.handleChangeCompletionStatus}
            />
            Только невыполненные
          </label>
        </div>

        <div className="todo-list">
          <ul>
            {filteredTodos.map((todo, index) => (
              <Todo
                key={index}
                todo={todo}
                onTodoChecked={this.handleCheckedTodos(index)}
                onTodoDelete={this.handleDeleteTodos(index)}
              />
            ))}
          </ul>
        </div>

        <div className="completion-percentage">
          Выполнено: {this.calculatePercentage()}%
        </div>
      </div>
    );
  }
}

export default App;


