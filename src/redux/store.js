import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import todoReducer from './slices/todoSlice';
import filterReducer from './slices/filterSlice';
import rootSaga from './sagas/rootSaga';

//tạo middleware instance của redux-saga đứng giữa dispatch và reducer để chặn các action
//(như fetchTodosRequest) và chạy sideEffect (gọi Firestore)
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        todos: todoReducer,
        filters: filterReducer,
    },

    //sử dụng saga thay vì thunk
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

//khởi động tất cả watcher sagas (takeLatest) để lắng nghe các request actions
sagaMiddleware.run(rootSaga);

export default store;
