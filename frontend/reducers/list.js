import produce from 'immer';

export const initialState = {
    toDoList: [],               // 해야 할 일들의 리스트
    listAdded: false,           // 리스트가 더해졌는지
    isListAdding: false,        // 리스트를 추가하는 중
    addListErrorReason: '',     // 리스트 추가 실패 요인
    listDeleted: false,         // 리스트가 삭제됐는지
    isListDeleting: false,      // 리스트를 삭제하는중
    deleteListErrorReason: '',  // 리스트 삭제 실패 요인
};

// 리스트에 추가하기
export const ADD_LIST_REQUEST = 'ADD_LIST_REQUEST';
export const ADD_LIST_SUCCESS = 'ADD_LIST_SUCCESS';
export const ADD_LIST_FAILRUE = 'ADD_LIST_FAILRUE';
// 리스트에 삭제하기
export const DELETE_LIST_REQUEST = 'DELETE_LIST_REQUEST';
export const DELETE_LIST_SUCCESS = 'DELETE_LIST_SUCCESS';
export const DELETE_LIST_FAILURE = 'DELETE_LIST_FAILURE';

// Actions
// 리스트 추가하는 Action
export const AddListRequestAction = (toDo) => { 
    return({
        type: ADD_LIST_REQUEST,
        data: toDo,
    });
};
export const AddListSuccessAction = (toDo) => {
    return({
        type: ADD_LIST_SUCCESS,
        data: toDo,
    });
};
export const AddListFailureAction = (e) => {
    return({
        type: ADD_LIST_FAILRUE,
        error: e,
    });
};
// 리스트 삭제하는 Action

// reducer - 어떻게 동작할 지..
const reducer = (state = initialState, action) => {
    return produce(state, draft=>{
        switch(action.type){
            case ADD_LIST_REQUEST:{
                draft.listAdded = false;
                draft.isListAdding = true;
                draft.addListErrorReason = '';
                break;
            }
            case ADD_LIST_SUCCESS:{
                draft.toDoList.push(action.data);
                draft.listAdded = true;
                draft.isListAdding = false;
                break;
            }
            case ADD_LIST_FAILRUE:{
                draft.isListAdding = false;
                draft.addListErrorReason = action.error;
                break;
            }
            case DELETE_LIST_REQUEST:{
                draft.listDeleted = false;
                draft.isListDeleting = true;
                draft.deleteListErrorReason = '';
                break;
            }
            case DELETE_LIST_SUCCESS:{
                draft.listDeleted = true;
                draft.isListDeleting = false;
                break;
            }
            case DELETE_LIST_FAILURE:{
                draft.isListDeleting = false;
                draft.deleteListErrorReason = action.error;
                break;
            }
            default:    break;
        }
    });
};

export default reducer;