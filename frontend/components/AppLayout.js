import React from 'react';
import Clock from './Clock';

const AppLayout = ({children}) => {
    return(
        <div>
            <Clock></Clock>
            {children}
        </div>
    );
}

export default AppLayout;