import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';

import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AddListRequestAction } from '../reducers/list';

const GetToDo = styled(Form)`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 500px;
    padding: 20px;
`;

const ToDoInput = () => {
    const dispatch = useDispatch();
    const isListAdding = useSelector(state => state.list.isAddingList);
    const [toDoList, setToDoList] = useState({});

    const onSubmitForm = useCallback((e)=>{
        e.preventDefault();
        dispatch(AddListRequestAction(toDoList));
    }, [toDoList && toDoList.text]);

    const onChangeText = useCallback((e) => {
        setToDoList({ text: e.target.value });
    }, []);

    return(
        <GetToDo onSubmit={onSubmitForm}>
            <Input
                placeholder="무슨 일을 하실건가요?"
                onChange={onChangeText}
            />
            <Button type="primary" htmlType="submit" loading={isListAdding}>upload</Button>
        </GetToDo>
    );
};

export default ToDoInput;