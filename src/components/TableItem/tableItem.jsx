import style from './TableItem.module.scss';

function TableItem({ todo, onDeleteTodo, onCompleteTodo }) {
    return (
        <tr className={`${style.row} ${todo.completed ? style.completed : ''}`}>
            <td>
                <label className={style.todoCell}>
                    <input
                        className={style.checkbox}
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => onCompleteTodo(todo.id)}
                    />
                    <span className={style.todoText}>{todo.title}</span>
                </label>
            </td>
            <td>{todo.description}</td>
            <td>{todo.priority}</td>
            <td>{todo.dueDate}</td>
            <td>
                <div className={style.actionCell}>
                    <button className={style.deleteBtn} type="button" onClick={() => onDeleteTodo(todo.id)}>
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default TableItem;
