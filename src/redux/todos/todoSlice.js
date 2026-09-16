import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    error: null,
    notification: null,
};

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        fetchTodosRequest: (state) => {
            state.error = null;
        },
        addTodoRequest: (state) => {
            state.error = null;
            state.notification = null;
        },
        deleteTodoRequest: (state) => {
            state.error = null;
            state.notification = null;
        },
        completeTodoRequest: (state) => {
            state.error = null;
        },
        setTodos: (state, action) => {
            state.items = action.payload;
            state.error = null;
        },
        addTodoSuccess: (state, action) => {
            state.items.push(action.payload);
            state.error = null;
            state.notification = 'Added successfully!';
        },
        deleteTodoSuccess: (state, action) => {
            state.items = state.items.filter((todo) => todo.id !== action.payload);
            state.error = null;
            state.notification = 'Deleted successfully!';
        },
        completeTodoSuccess: (state, action) => {
            const todo = state.items.find((todo) => todo.id === action.payload.id);
            if (todo) {
                todo.completed = action.payload.completed;
            }
            state.error = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.notification = null;
        },
        clearNotification: (state) => {
            state.notification = null;
        },
    },
});

export const {
    fetchTodosRequest,
    addTodoRequest,
    deleteTodoRequest,
    completeTodoRequest,
    setTodos,
    addTodoSuccess,
    deleteTodoSuccess,
    completeTodoSuccess,
    setError,
    clearNotification,
} = todoSlice.actions;

export default todoSlice.reducer;
