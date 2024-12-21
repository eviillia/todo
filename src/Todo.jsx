import React from "react";
import './ToDo-list.css';  

class Todo extends React.Component {
    constructor(props) {
      super(props);
      this.state = { isHovered: false };
    }
  
    getStarsPriority(priority) {
      switch (priority) {
        case "critical":
          return "***";
        case "recommended":
          return "**";
        case "normal":
          return "*";
        default:
          return "";
      }
    }
  
    render() {
      const { todo, onTodoChecked, onTodoDelete } = this.props;
      const { isHovered } = this.state;
  
      return (
        <div
          onMouseEnter={() => this.setState({ isHovered: true })}
          onMouseLeave={() => this.setState({ isHovered: false })}
          className='todo-item'
          style={{ backgroundColor: 'white' }}
        >
          <input
            type='checkbox'
            checked={todo.checked}
            onChange={onTodoChecked}
          />
          <div className='todo'>
            <div>
              <strong className='todo-name'>
                {todo.name} {this.getStarsPriority(todo.priority)}
              </strong>
              <div className='todo-description'>{todo.description}</div>
            </div>
            <span className='todo-created-at'>
              Создано: {new Date(todo.createdAt).toLocaleString()}
            </span>
  
            {isHovered && (
              <button className='delete-button' onClick={onTodoDelete}>
                Удалить
              </button>
            )}
          </div>
        </div>
      )
    }
  }
  
  
  export default Todo;