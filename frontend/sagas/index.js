import { all, call } from 'redux-saga/effects';
import list from './list';

function* rootSaga() {
    yield all([
        call(list),
    ]);
}

export default rootSaga;