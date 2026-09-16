import { combineReducers } from '@reduxjs/toolkit';
import todoReducer from './todos/todoSlice';
import filterReducer from './filters/filterSlice';

const rootReducer = combineReducers({
    todos: todoReducer,
    filters: filterReducer,
});

export default rootReducer;
