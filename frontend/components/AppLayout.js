import React from 'react';
import Clock from './Clock';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AppLayoutDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 600px;
    margin: auto;
    margin-top: 100px;
    padding: 50px;
`;

const AppLayout = ({children}) => {
    return(
        <AppLayoutDiv>
            <Clock></Clock>
            {children}
        </AppLayoutDiv>
    );
}

AppLayout.propTypes = {
    children: PropTypes.node
};

export default AppLayout;