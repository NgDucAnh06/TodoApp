import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './TodoPage.scss';
import Header from '../../components/Header/header';
import TodoForm from '../../components/TodoForm/TodoForm';
import Filter from '../../components/Filter/filter';
import TodoList from '../../components/TodoList/TodoList';
import {
    addTodoRequest,
    deleteTodoRequest,
    completeTodoRequest,
    fetchTodosRequest,
    clearNotification,
} from '../../redux/todos/todoActions';
import { changeFilter, resetFilter } from '../../redux/filters/filterActions';

function TodoPage() {
    const dispatch = useDispatch();
    const { items: todos, error, notification } = useSelector((state) => state.todos);
    const filters = useSelector((state) => state.filters);
    const sortedList = useMemo(() => filterTodos(todos, filters), [todos, filters]);

    // fetch todos từ firestore
    useEffect(() => {
        dispatch(fetchTodosRequest());
    }, [dispatch]);

    // tự động ẩn thông báo sau 3 giây
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                dispatch(clearNotification());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification, dispatch]);

    const handleAddTodo = (todo) => {
        dispatch(addTodoRequest(todo));
    };

    const handleDeleteTodo = (todoId) => {
        dispatch(deleteTodoRequest(todoId));
    };

    const handleCompleteTodo = (todoId, completed) => {
        dispatch(completeTodoRequest({ todoId, completed }));
    };

    const handleFilterChange = (name, value) => {
        dispatch(changeFilter({ name, value }));
    };

    const handleResetFilter = () => {
        dispatch(resetFilter());
    };

    return (
        <div className="App">
            <Header />
            <div className="main-content">
                <TodoForm onAddTodo={handleAddTodo} existingTodos={todos} />
                <div>
                    <Filter filters={filters} onFilterChange={handleFilterChange} onResetFilter={handleResetFilter} />
                    {error && <div className="error-banner">{error}</div>}
                    <TodoList
                        todos={sortedList}
                        onDeleteTodo={handleDeleteTodo}
                        onCompleteTodo={handleCompleteTodo}
                        notification={notification}
                    />
                </div>
            </div>
        </div>
    );
}

function filterTodos(todos, filters) {
    const searchValue = (filters.title || '').trim().toLowerCase();
    let result = todos.filter((todo) => {
        if (!searchValue) {
            return true;
        }

        const title = (todo.title || '').toLowerCase();
        return title.includes(searchValue);
    });

    if (filters.status === 'active') {
        result = result.filter((todo) => !todo.completed);
    } else if (filters.status === 'completed') {
        result = result.filter((todo) => todo.completed);
    }

    const priorityLevel = {
        Low: 1,
        Medium: 2,
        High: 3,
    };

    result = [...result].sort((a, b) => {
        if (a.completed !== b.completed) {
            return Number(a.completed) - Number(b.completed);
        }

        if (filters.priorityOrder === 'asc') {
            const diff = (priorityLevel[a.priority] || 0) - (priorityLevel[b.priority] || 0);
            if (diff !== 0) return diff;
        } else if (filters.priorityOrder === 'desc') {
            const diff = (priorityLevel[b.priority] || 0) - (priorityLevel[a.priority] || 0);
            if (diff !== 0) return diff;
        }

        if (filters.dueDateOrder === 'asc') {
            const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
            const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
            return dateA - dateB;
        } else if (filters.dueDateOrder === 'desc') {
            const dateA = a.dueDate ? new Date(a.dueDate).getTime() : -Infinity;
            const dateB = b.dueDate ? new Date(b.dueDate).getTime() : -Infinity;
            return dateB - dateA;
        }

        return 0;
    });

    return result;
}

export default TodoPage;
