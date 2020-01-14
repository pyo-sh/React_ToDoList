import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { UpdateListRequestAction, DeleteListRequestAction } from '../reducers/list';
import PropTypes from 'prop-types';

import { Input, Icon } from 'antd';
import styled from 'styled-components';

const ToDo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 460px;
    height: 60px;
    margin: 5px;
    padding: 10px;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
`;

const UpdateToDoDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 400px;
`;
const UpdateToDoInput = styled(Input)`
    width: 360px;
    height: 40px;
    font-size: 20px;
`;

const TextDiv = styled.div`
    width: 408px;
    padding-top: 2px;
    padding-left: 12px;
    font-size: 20px;
`;

const ToDoItem = ({ list, listClicked, setListClicked }) => {
    const dispatch = useDispatch();
    const isUpdated = useSelector(state => state.list.listUpdated);         // Update 됐으면
    const isUpdating = useSelector(state => state.list.isListUpdating);     // redux에서 업데이트를 하고 있는지
    const isDeleting = useSelector(state => state.list.isListDeleting);     // redux에서 삭제를 실행하고 있는지
    const deleteError = useSelector(state => state.list.deleteListErrorReason);
    const [isChanging, setIsChanging] = useState(false);                    // div상태,input상태 를 결정
    const [inputText, setInputText] = useState(list.text);                  // 현재 toDo에 대한 text값
    const [updateIconState, setUpdateIconState] = useState("check-circle");
    const [deleteIconState, setDeleteIconState] = useState("close-circle"); // 아이콘의 상태를 나타내는 state
    const [clickedDelete, setClickedDelete] = useState(false);              // 삭제 아이콘을 클릭했는지

    // div 상태인 ToDo를 클릭했을 때. -> input으로 바꾼다.
    const onClickDiv = useCallback((e) => {
        if(isUpdating)  alert('업데이트 처리 후 시도하세요');
        else            setListClicked(list.id);
    }, [isUpdating]);
    // Div 출력으로 초기화
    useEffect(() => {
        if(listClicked === list.id)  setIsChanging(true);
        else                        setIsChanging(false);
    }, [listClicked]);

    // input 상태인 ToDo에 대한 처리
    // Input의 텍스트가 바뀔 때의 처리
    const onChangeText = useCallback((e) => {
        setInputText(e.target.value);
    }, []);
    // Update 요청에 대한 처리
    const updateText = useCallback((e) => {
        e.preventDefault();
        if(inputText === "")    alert("할 일을 입력해주세요");
        else if(isDeleting)     alert("다른 처리를 기다려주세요");
        else{
            dispatch(UpdateListRequestAction(({
                ...list,
                text: inputText,
            })));
        }
    }, [inputText, isDeleting]);
    // Update 후에 Div로 바꾸는 처리
    useEffect(() => {
        if((listClicked === list.id) && isUpdated){
            setListClicked(-1);
        }
    }, [isUpdated]);
    // 삭제 처리에 대한 icon 처리
    useEffect(() => {
        if(isUpdating)      setUpdateIconState("loading");
        else                setUpdateIconState("check-circle");
    } ,[isUpdating]);


    // input 삭제처리
    const onClickDelete = useCallback((e) => {
        // 다른 list를 삭제하고 있다면
        if(isDeleting || isUpdating)  alert('다른 처리를 기다리세요!');
        // 삭제를 할 수 있다면.
        else{
            setClickedDelete(true);
            dispatch(DeleteListRequestAction(list.id));
        }
    }, [isDeleting, isUpdating]);
    // 삭제가 실패 됐을 때
    useEffect(() => {
        // Error 메세지가 뜨면?
        if(deleteError !== ''){
            alert('삭제 실패...');
            setClickedDelete(false);
        }
    }, [deleteError]);
    // 삭제 처리에 대한 icon 처리
    useEffect(() => {
        if(clickedDelete)   setDeleteIconState("loading");
        else                setDeleteIconState("close-circle");
    } ,[clickedDelete]);

    return (
        <ToDo>
            <div onClick={onClickDiv}>
                {isChanging
                ?   <UpdateToDoDiv>
                        <UpdateToDoInput
                            placeholder="무슨 일을 하실건가요?"
                            defaultValue={list.text}
                            onChange={onChangeText}
                            onPressEnter={updateText}
                        />
                        <Icon
                            type={updateIconState}
                            onClick={updateText}
                            style={{color:'#52c41a', fontSize: '30px'}}
                        />
                    </UpdateToDoDiv>
                :   <TextDiv>{list.text}</TextDiv>
                }
            </div>
            <Icon
                type={deleteIconState}
                onClick={onClickDelete}
                style={{color: '#52c41a', fontSize: '30px'}} 
            />
        </ToDo>
    );
};

ToDoItem.propTypes = {
    list: PropTypes.object.isRequired,
    listClicked: PropTypes.number.isRequired,
    setListClicked: PropTypes.func.isRequired,
};

export default ToDoItem;
