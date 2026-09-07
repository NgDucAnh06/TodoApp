import { useState, useMemo } from 'react';
import style from './Form.module.scss';

const initialValues = {
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
};

function getTodayDateString() {
    return new Date().toLocaleDateString('en-CA');
}

function validate(values, todayString) {
    const errors = {};
    const title = values.title.trim();
    const description = values.description.trim();

    if (!title) {
        errors.title = 'Title cannot be empty!';
    } else if (title.length < 3) {
        errors.title = 'Title must contain at least 3 characters!';
    } else if (title.length > 50) {
        errors.title = 'Title cannot be over 50 characters!';
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

function Form({ onAddTodo }) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const todayString = useMemo(() => getTodayDateString(), []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setValues((previousValues) => ({
            ...previousValues,
            [name]: value,
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

        const validationErrors = validate(values, todayString);

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

        if (typeof onAddTodo === 'function') {
            onAddTodo(newTodo);
        }
        setValues(initialValues);
        setErrors({});
    };

    return (
        <div className={style.formWrapper}>
            <h2>Create todo</h2>

            <form className={style.createForm} onSubmit={handleSubmit} noValidate>
                <div className={style.formGroup}>
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={values.title}
                        onChange={handleChange}
                        placeholder="Enter todo title..."
                        className={errors.title ? style.inputError : ''}
                    />
                    {errors.title && (
                        <span id="title-error" className={style.errorMessage}>
                            {errors.title}
                        </span>
                    )}
                </div>

                <div className={style.formGroup}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        placeholder="Enter description..."
                        className={errors.description ? style.inputError : ''}
                    />
                    {errors.description && (
                        <span id="description-error" className={style.errorMessage}>
                            {errors.description}
                        </span>
                    )}
                </div>

                <div className={style.formRow}>
                    <div className={style.formGroup}>
                        <label htmlFor="priority">Priority</label>
                        <select id="priority" name="priority" value={values.priority} onChange={handleChange}>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>

                    <div className={style.formGroup}>
                        <label htmlFor="dueDate">Due date</label>
                        <input
                            id="dueDate"
                            name="dueDate"
                            type="date"
                            min={todayString}
                            value={values.dueDate}
                            onChange={handleChange}
                            className={errors.dueDate ? style.inputError : ''}
                        />
                        {errors.dueDate && (
                            <span id="due-date-error" className={style.errorMessage}>
                                {errors.dueDate}
                            </span>
                        )}
                    </div>
                </div>

                <button type="submit" className={style.submitBtn}>
                    Add Todo
                </button>
            </form>
        </div>
    );
}

export default Form;
