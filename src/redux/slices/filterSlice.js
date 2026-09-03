import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    title: '',
    status: 'all',
    priorityOrder: 'none',
    dueDateOrder: 'none',
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        changeFilter: (state, action) => {
            const { name, value } = action.payload;
            state[name] = value;
        },
        resetFilter: () => initialState,
        
    },
});

export const { changeFilter, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;
