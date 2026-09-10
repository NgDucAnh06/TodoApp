import './TodoItem.scss';

function TodoItem({ todo, onDeleteTodo, onCompleteTodo }) {
    const handleDelete = () => {
        const isConfirm = window.confirm("Do you want to delete this todo?");

        if (isConfirm) {
            onDeleteTodo(todo.id);
        }
    };

    return (
        <tr className={`todo-item-row ${todo.completed ? 'todo-item-completed' : ''}`}>
            <td>
                <label className="todo-item-todoCell">
                    <input
                        className="todo-item-checkbox"
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => onCompleteTodo(todo.id, !todo.completed)}
                    />
                    <span className="todo-item-todoText">{todo.title}</span>
                </label>
            </td>
            <td>{todo.description}</td>
            <td>{todo.priority}</td>
            <td>{todo.dueDate}</td>
            <td>
                <div className="todo-item-actionCell">
                    <button className="todo-item-deleteBtn" type="button" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default TodoItem;
