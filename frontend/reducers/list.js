import produce from 'immer';

export const initialState = {
    id: 0,
    toDoList: [],               // 해야 할 일들의 리스트
    listAdded: false,           // 리스트가 더해졌는지
    isListAdding: false,        // 리스트를 추가하는 중
    addListErrorReason: '',     // 리스트 추가 실패 요인
    listDeleted: false,         // 리스트가 삭제됐는지
    isListDeleting: false,      // 리스트를 삭제하는중
    deleteListErrorReason: '',  // 리스트 삭제 실패 요인
    listUpdated: false,         // 리스트가 업데이트 됐는지
    isListUpdating: false,      // 리스트를 업데이트 하는중
    updateListErrorReason: '',  // 리스트 업데이트 실패 요인
};

// 리스트에 추가하기
export const ADD_LIST_REQUEST = 'ADD_LIST_REQUEST';
export const ADD_LIST_SUCCESS = 'ADD_LIST_SUCCESS';
export const ADD_LIST_FAILRUE = 'ADD_LIST_FAILRUE';
// 리스트에 삭제하기
export const DELETE_LIST_REQUEST = 'DELETE_LIST_REQUEST';
export const DELETE_LIST_SUCCESS = 'DELETE_LIST_SUCCESS';
export const DELETE_LIST_FAILURE = 'DELETE_LIST_FAILURE';
// 리스트에 있는 내용 업데이트
export const UPDATE_LIST_REQUEST = 'UPDATE_LIST_REQUEST';
export const UPDATE_LIST_SUCCESS = 'UPDATE_LIST_SUCCESS';
export const UPDATE_LIST_FAILURE = 'UPDATE_LIST_FAILURE';

// Actions
// 리스트 추가하는 Action
export const AddListRequestAction = (object) => { 
    return({
        type: ADD_LIST_REQUEST,
        data: object,
    });
};
export const AddListSuccessAction = (object) => {
    return({
        type: ADD_LIST_SUCCESS,
        data: object,
    });
};
export const AddListFailureAction = (e) => {
    return({
        type: ADD_LIST_FAILRUE,
        error: e,
    });
};
// 리스트 삭제하는 Action
export const DeleteListRequestAction = (id) => { 
    return({
        type: DELETE_LIST_REQUEST,
        data: id,
    });
};
export const DeleteListSuccessAction = (id) => {
    return({
        type: DELETE_LIST_SUCCESS,
        data: id,
    });
};
export const DeleteListFailureAction = (e) => {
    return({
        type: DELETE_LIST_FAILRUE,
        error: e,
    });
};
// 리스트 업데이트하는 Action
export const UpdateListRequestAction = (object) => { 
    return({
        type: UPDATE_LIST_REQUEST,
        data: object,
    });
};
export const UpdateListSuccessAction = (object) => {
    return({
        type: UPDATE_LIST_SUCCESS,
        data: object,
    });
};
export const UpdateListFailureAction = (e) => {
    return({
        type: UPDATE_LIST_FAILRUE,
        error: e,
    });
};

// reducer - 어떻게 동작할 지..
const reducer = (state = initialState, action) => {
    return produce(state, draft=>{
        switch(action.type){
            // 리스트 더하기
            case ADD_LIST_REQUEST:{
                draft.listAdded = false;
                draft.isListAdding = true;
                draft.addListErrorReason = '';
                break;
            }
            case ADD_LIST_SUCCESS:{
                draft.id++;
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
            // 리스트 삭제하기
            case DELETE_LIST_REQUEST:{
                draft.listDeleted = false;
                draft.isListDeleting = true;
                draft.deleteListErrorReason = '';
                break;
            }
            case DELETE_LIST_SUCCESS:{
                draft.toDoList = draft.toDoList.filter((li) => li.id !== action.data);
                draft.listDeleted = true;
                draft.isListDeleting = false;
                break;
            }
            case DELETE_LIST_FAILURE:{
                draft.isListDeleting = false;
                draft.deleteListErrorReason = action.error;
                break;
            }
            // 리스트 업데이트
            case UPDATE_LIST_REQUEST:{
                draft.listUpdated = false;
                draft.isListUpdating = true;
                draft.deleteListErrorReason = '';
                break;
            }
            case UPDATE_LIST_SUCCESS:{
                const index = draft.toDoList.findIndex((li) => li.id === action.data.id);
                draft.toDoList[index].text = action.data.text;
                draft.listUpdated = true;
                draft.isListUpdating = false;
                break;
            }
            case UPDATE_LIST_FAILURE:{
                draft.isListUpdating = false;
                draft.updateListErrorReason = action.error;
                break;
            }
            default:    break;
        }
    });
};

export default reducer;