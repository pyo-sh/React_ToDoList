import React from 'react';
import styled from 'styled-components';

import ToDoInput from '../components/ToDoInput';
import DoingList from '../components/DoingList';

const HomeDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    width: 600px;
    padding: 25px;

    border: 1px solid #d9d9d9;
    border-radius: 10px;
`;

const Home = () => {
    return(
        <HomeDiv>
            <ToDoInput></ToDoInput>
            <div>
                <DoingList></DoingList>
            </div>
        </HomeDiv>
    );
}

export default Home;