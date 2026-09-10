import TodoItem from '../TodoItem/TodoItem';
import './TodoList.scss';

function TodoList({ todos, onDeleteTodo, onCompleteTodo }) {
    return (
        <div className="todo-list-tableWrapper">
            <h2>Todo list</h2>

            <table className="todo-list-todoTable">
                <thead>
                    <tr>
                        <th>Todo</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Due Date</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {todos.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="todo-list-emptyRow">
                                No todos to display.
                            </td>
                        </tr>
                    ) : (
                        todos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onDeleteTodo={onDeleteTodo}
                                onCompleteTodo={onCompleteTodo}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TodoList;
