import { createReducer } from '@reduxjs/toolkit';
import { changeFilter, resetFilter } from './filterActions';

const initialState = {
    title: '',
    status: 'all',
    priorityOrder: 'none',
    dueDateOrder: 'none',
};

const filterReducer = createReducer(initialState, (builder) => {
    builder //helper object
        .addCase(changeFilter, (state, action) => {
            const { name, value } = action.payload;
            state[name] = value;
        })
        .addCase(resetFilter, () => initialState);
});

export default filterReducer;
