import { call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchTodosFirebase,
    addTodoFirebase,
    deleteTodoFirebase,
    updateTodoFirebase,
} from '../../firebase/firebaseService';
import {
    fetchTodosRequest,
    setTodos,
    addTodoRequest,
    addTodoSuccess,
    deleteTodoRequest,
    deleteTodoSuccess,
    completeTodoRequest,
    completeTodoSuccess,
    setError,
} from '../slices/todoSlice';

function* fetchTodosSaga() {
    try {
        const todos = yield call(fetchTodosFirebase);
        yield put(setTodos(todos));
    } catch (error) {
        yield put(setError(error.message));
    }
}

function* addTodoSaga(action) {
    try {
        const newTodo = yield call(addTodoFirebase, action.payload);
        yield put(addTodoSuccess(newTodo));
    } catch (error) {
        yield put(setError(error.message));
    }
}

function* deleteTodoSaga(action) {
    try {
        yield call(deleteTodoFirebase, action.payload);
        yield put(deleteTodoSuccess(action.payload));
    } catch (error) {
        yield put(setError(error.message));
    }
}

function* completeTodoSaga(action) {
    try {
        const { todoId, completed } = action.payload;
        const updatedTodo = yield call(updateTodoFirebase, todoId, { completed });
        yield put(completeTodoSuccess(updatedTodo));
    } catch (error) {
        yield put(setError(error.message));
    }
}

export default function* todoSaga() {
    yield takeLatest(fetchTodosRequest.type, fetchTodosSaga);
    yield takeLatest(addTodoRequest.type, addTodoSaga);
    yield takeLatest(deleteTodoRequest.type, deleteTodoSaga);
    yield takeLatest(completeTodoRequest.type, completeTodoSaga);
}

//pattern chung cho worker
// function* workerSaga(action) {
//     try {
//         yield call(firebaseFunction, ...);     // gọi Firestore (async)
//         yield put(successAction(...));         // thành công → cập nhật Redux state
//     } catch (error) {
//         yield put(setError(error.message));    // lỗi → lưu error vào state
//     }
// }
