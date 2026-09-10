import { all } from 'redux-saga/effects';
import todoSaga from './todos/todoSaga';

export default function* rootSaga() {
    yield all([todoSaga()]);
}
