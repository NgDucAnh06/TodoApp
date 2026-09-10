import { createReducer } from '@reduxjs/toolkit';
import * as actions from './todoActions';

const initialState = {
    items: [],
    error: null,
};

const clearError = (state) => {
    state.error = null;
};

const todoReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(actions.fetchTodosRequest, clearError)
        .addCase(actions.addTodoRequest, clearError)
        .addCase(actions.deleteTodoRequest, clearError)
        .addCase(actions.completeTodoRequest, clearError)
        .addCase(actions.setTodos, (state, action) => {
            state.items = action.payload;
            state.error = null;
        })
        .addCase(actions.addTodoSuccess, (state, action) => {
            state.items.push(action.payload);
            state.error = null;
        })
        .addCase(actions.deleteTodoSuccess, (state, action) => {
            state.items = state.items.filter((todo) => todo.id !== action.payload);
            state.error = null;
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
        });
});

export default todoReducer;
