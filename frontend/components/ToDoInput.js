import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AddListRequestAction } from '../reducers/list';

const GetToDo = styled(Form)`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 550px;
    padding: 20px;
    padding-bottom: 40px;
    margin-bottom: 25px;

    border-bottom: 1px solid #d9d9d9;
`;
const GetToDoInput = styled(Input)`
    width: 400px;
    height: 40px;

    font-size: 20px;
`;
const GetToDoButton = styled(Button)`
    width: 100px;
    height: 40px;
    padding: 0;

    font-size: 15px;
`;

const ToDoInput = () => {
    const dispatch = useDispatch();
    const toDoId = useSelector(state => state.list.id);
    const isListAdding = useSelector(state => state.list.isListAdding);
    const listAdded = useSelector(state => state.list.listAdded);
    const [toDoList, setToDoList] = useState("");
    // Input을 직접적으로 받기 위한 useRef()
    const inputRef = useRef();

    // 버튼을 눌렀을 때
    const onSubmitForm = useCallback((e)=>{
        e.preventDefault();
        if(toDoList === "") alert("할 일을 입력해주세요");
        else{
            dispatch(AddListRequestAction({
                id: toDoId,
                text: toDoList,
            }));
        }
    }, [toDoList, toDoId]);
    // Input의 값을 바꿀 때
    const onChangeText = useCallback((e) => {
        setToDoList(e.target.value);
    }, []);
    // 리스트가 더해지면 input의 값을 초기화한다.
    useEffect(() => {
        if(listAdded) {
            setToDoList('');
            inputRef.current.input.value = '';
        }
    }, [listAdded]);

    return(
        <GetToDo onSubmit={onSubmitForm}>
            <GetToDoInput
                placeholder="무슨 일을 하실건가요?"
                onChange={onChangeText}
                value={toDoList}
                ref ={inputRef}
            />
            <GetToDoButton 
                type="primary"
                htmlType="submit"
                loading={isListAdding}
                ghost
            >Upload</GetToDoButton>
        </GetToDo>
    );
};

export default ToDoInput;