import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    error: null,
};

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        //dispatch(addTodoRequest) → saga chặn → gọi firestore → thành công → dispatch(addTodoSuccess)
        // → reducer cập nhật state
        // → thất bại → dispatch(setError)


        // request actions
        fetchTodosRequest: (state) => {
            state.error = null;
        },
        addTodoRequest: (state) => {
            state.error = null;
        },
        deleteTodoRequest: (state) => {
            state.error = null;
        },
        completeTodoRequest: (state) => {
            state.error = null;
        },

        // success actions
        setTodos: (state, action) => {
            state.items = action.payload;
            state.error = null;
        },
        addTodoSuccess: (state, action) => {
            state.items.push(action.payload);
            state.error = null;
        },
        deleteTodoSuccess: (state, action) => {
            state.items = state.items.filter((todo) => todo.id !== action.payload);
            state.error = null;
        },
        completeTodoSuccess: (state, action) => {
            const todo = state.items.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
            state.error = null;
        },

        setError: (state, action) => {
            state.error = action.payload;
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
} = todoSlice.actions;

export default todoSlice.reducer;