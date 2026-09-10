import { useState } from 'react';
import './TodoForm.scss';

const initialValues = {
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
};

function getTodayDateString() {
    return new Date().toLocaleDateString('en-CA');
}

function validate(values, todayString, existingTodos = []) {
    const errors = {};
    const title = values.title.trim();
    const description = values.description.trim();

    if (!title) {
        errors.title = 'Title cannot be empty!';
    } else if (title.length < 3) {
        errors.title = 'Title must contain at least 3 characters!';
    } else if (title.length > 50) {
        errors.title = 'Title cannot be over 50 characters!';
    } else if (
        existingTodos.some(
            (todo) => (todo.title || '').trim().toLowerCase() === title.toLowerCase(),
        )
    ) {
        errors.title = 'Title already exists!';
    }

    if (!description) {
        errors.description = 'Description cannot be empty!';
    } else if (description.length > 200) {
        errors.description = 'Description cannot be over 200 characters!';
    }

    if (!values.dueDate) {
        errors.dueDate = 'Due date cannot be empty!';
    } else if (values.dueDate < todayString) {
        errors.dueDate = 'Due date cannot be in the past!';
    }

    return errors;
}

function TodoForm({ onAddTodo, existingTodos = [] }) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const todayString = getTodayDateString();

    const handleChange = (event) => {
        const { name, value } = event.target;

        setValues((previousValues) => ({
            ...previousValues,
            [name]: value, // computed property name
        }));

        if (errors[name]) {
            setErrors((previousErrors) => ({
                ...previousErrors,
                [name]: '',
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationErrors = validate(values, todayString, existingTodos);

        //chuyển object thành array
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const newTodo = {
            title: values.title.trim(),
            description: values.description.trim(),
            priority: values.priority,
            dueDate: values.dueDate,
            completed: false,
        };

        onAddTodo(newTodo);
        setValues(initialValues);
        setErrors({});
    };

    return (
        <div className="todo-form-formWrapper">
            <h2>Create todo</h2>

            <form className="todo-form-createForm" onSubmit={handleSubmit} noValidate>
                <div className="todo-form-formGroup">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={values.title}
                        onChange={handleChange}
                        placeholder="Enter todo title..."
                        className={errors.title ? 'todo-form-inputError' : ''}
                    />
                    {errors.title && (
                        <span id="title-error" className="todo-form-errorMessage">
                            {errors.title}
                        </span>
                    )}
                </div>

                <div className="todo-form-formGroup">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        placeholder="Enter description..."
                        className={errors.description ? 'todo-form-inputError' : ''}
                    />
                    {errors.description && (
                        <span id="description-error" className="todo-form-errorMessage">
                            {errors.description}
                        </span>
                    )}
                </div>

                <div className="todo-form-formRow">
                    <div className="todo-form-formGroup">
                        <label htmlFor="priority">Priority</label>
                        <select id="priority" name="priority" value={values.priority} onChange={handleChange}>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>

                    <div className="todo-form-formGroup">
                        <label htmlFor="dueDate">Due date</label>
                        <input
                            id="dueDate"
                            name="dueDate"
                            type="date"
                            min={todayString}
                            value={values.dueDate}
                            onChange={handleChange}
                            className={errors.dueDate ? 'todo-form-inputError' : ''}
                        />
                        {errors.dueDate && (
                            <span id="due-date-error" className="todo-form-errorMessage">
                                {errors.dueDate}
                            </span>
                        )}
                    </div>
                </div>

                <button type="submit" className="todo-form-submitBtn">
                    Add Todo
                </button>
            </form>
        </div>
    );
}

export default TodoForm;
