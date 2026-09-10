import { createReducer } from '@reduxjs/toolkit';
import * as actions from './todoActions';

const initialState = {
    items: [],
    error: null,
    notification: null,
};

const clearError = (state) => {
    state.error = null;
};

const todoReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(actions.fetchTodosRequest, clearError)
        .addCase(actions.addTodoRequest, (state) => {
            clearError(state);
            state.notification = null;
        })
        .addCase(actions.deleteTodoRequest, (state) => {
            clearError(state);
            state.notification = null;
        })
        .addCase(actions.completeTodoRequest, clearError)
        .addCase(actions.setTodos, (state, action) => {
            state.items = action.payload;
            state.error = null;
        })
        .addCase(actions.addTodoSuccess, (state, action) => {
            state.items.push(action.payload);
            state.error = null;
            state.notification = 'Added successfully!';
        })
        .addCase(actions.deleteTodoSuccess, (state, action) => {
            state.items = state.items.filter((todo) => todo.id !== action.payload);
            state.error = null;
            state.notification = 'Deleted successfully!';
        })
        .addCase(actions.completeTodoSuccess, (state, action) => {
            const todo = state.items.find((todo) => todo.id === action.payload.id);
            if (todo) {
                todo.completed = action.payload.completed;
            }
            state.error = null;
        })
        .addCase(actions.setError, (state, action) => {
            state.error = action.payload;
            state.notification = null;
        })
        .addCase(actions.clearNotification, (state) => {
            state.notification = null;
        });
});

export default todoReducer;
