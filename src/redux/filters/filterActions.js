import { createAction } from '@reduxjs/toolkit';
import { CHANGE_FILTER, RESET_FILTER } from './filterTypes';

export const changeFilter = createAction(CHANGE_FILTER);
export const resetFilter = createAction(RESET_FILTER);
