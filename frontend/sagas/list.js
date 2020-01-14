import { all, fork, takeLatest, delay, put } from 'redux-saga/effects';
import {
    ADD_LIST_REQUEST,
    AddListSuccessAction,
    AddListFailureAction,
    DELETE_LIST_REQUEST,
    DeleteListSuccessAction,
    DeleteListFailureAction,
    UPDATE_LIST_REQUEST,
    UpdateListSuccessAction,
    UpdateListFailureAction,
} from '../reducers/list';

function* addList(action) {
    try{
        yield delay(1200);
        yield put(AddListSuccessAction(action.data));
    }catch(e){
        console.error(e);
        yield put(AddListFailureAction(e));
    };
}
function* watchAddList() {
    yield takeLatest(ADD_LIST_REQUEST, addList);
};

function* deleteList(action) {
    try{
        yield delay(1000);
        yield put(DeleteListSuccessAction(action.data));
    }catch(e){
        console.error(e);
        yield put(DeleteListFailureAction(e));
    };
};
function* watchDeleteList() {
    yield takeLatest(DELETE_LIST_REQUEST, deleteList);
};

function* updateList(action) {
    try{
        yield delay(700);
        yield put(UpdateListSuccessAction(action.data));
    }catch(e){
        console.error(e);
        yield put(UpdateListFailureAction(e));
    };
};
function* watchUpdateList() {
    yield takeLatest(UPDATE_LIST_REQUEST, updateList);
};

function* listSaga(){
    yield all([
        fork(watchAddList),
        fork(watchDeleteList),
        fork(watchUpdateList)
    ]);
};

export default listSaga;