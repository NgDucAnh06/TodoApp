import { createAction } from '@reduxjs/toolkit';
import * as types from './todoTypes';

export const fetchTodosRequest = createAction(types.FETCH_TODOS_REQUEST);
export const addTodoRequest = createAction(types.ADD_TODO_REQUEST);
export const deleteTodoRequest = createAction(types.DELETE_TODO_REQUEST);
export const completeTodoRequest = createAction(types.COMPLETE_TODO_REQUEST);

export const setTodos = createAction(types.SET_TODOS);

export const addTodoSuccess = createAction(types.ADD_TODO_SUCCESS);
export const deleteTodoSuccess = createAction(types.DELETE_TODO_SUCCESS);
export const completeTodoSuccess = createAction(types.COMPLETE_TODO_SUCCESS);

export const setError = createAction(types.SET_ERROR);
export const clearNotification = createAction(types.CLEAR_NOTIFICATION);
