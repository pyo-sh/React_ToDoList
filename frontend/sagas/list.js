import { all, fork, takeLatest, delay, put } from 'redux-saga/effects';
import { ADD_LIST_REQUEST, AddListSuccessAction, AddListFailureAction } from '../reducers/list';

function* addList(action) {
    try{
        yield delay(2000);
        yield put(AddListSuccessAction(action.data));
    }catch(e){
        console.error(e);
        yield put(AddListFailureAction(e));
    }
}

function* watchAddList() {
    yield takeLatest(ADD_LIST_REQUEST, addList);
};

function* listSaga(){
    yield all([
        fork(watchAddList),
    ]);
};

export default listSaga;