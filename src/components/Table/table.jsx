import TableItem from '../TableItem/tableItem';
import style from './Table.module.scss';

function Table({ todos, onDeleteTodo, onCompleteTodo }) {
    return (
        <div className={style.tableWrapper}>
            <h2>Todo list</h2>

            <table className={style.todoTable}>
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
                            <td colSpan="5" className={style.emptyRow}>
                                No todos yet. Add one to get started!
                            </td>
                        </tr>
                    ) : (
                        todos.map((todo) => (
                            <TableItem
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

export default Table;
