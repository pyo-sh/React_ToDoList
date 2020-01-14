import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ToDoItem from './ToDoItem';

const DoingList = () => {
    const list = useSelector(state => state.list.toDoList); // redux에 저장된 list
    const [listClicked, setListClicked] = useState('');
    // list를 수정하는 작업을 하나의 list만 가능하게 하기 위한 함수

    return(
        <div>
            {list.map((li)=>{
                return (
                    <ToDoItem
                        key={li.id}
                        list={li}
                        listClicked={listClicked}
                        setListClicked={setListClicked}
                    />
                );})
            }
        </div>
    );
};

export default DoingList;