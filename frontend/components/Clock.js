import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// 시계 div
const ClockBox = styled.div`
    /* div의 정렬 설정 */
    display: flex;
    justify-content: center;
    align-items: center;
    /* 크기 및 padding */
    width: 400px;
    height: 200px;
    padding: 20px;
    /* font */
    font-size: 80px;
    font-family: "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
    font-weight: bold;
`;

const Clock = () => {
    const [time, setTime] = useState({});
    // 현재 시간에 대한 값을 time state에 setState
    const getTime = () => {
        const time = new Date();
        const hour = time.getHours();
        const minute = time.getMinutes();
        const second = time.getSeconds();
        setTime({
            hour: hour,
            minute: minute,
            second: second,
        });
    };
    // ComponentDidMount
    useEffect(() => {
        // 10ms 마다 getTime 함수 실행
        setInterval(getTime, 10);
    }, []);
    return(
        <ClockBox>
            {time.hour}:{time.minute}:{time.second}
        </ClockBox>
    );
}

export default Clock;