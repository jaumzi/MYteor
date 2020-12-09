import React from 'react';
import LayoutConfig from '../LayoutConfig';

import './DefaultLayoutStyle.css';

function DefaultLayout(props) {
    const { children } = props;
    return (
        <>
            <LayoutConfig {...props} >
                <div className="default-layout-content" >
                    {children}
                </div>
            </LayoutConfig>
        </>
    );
}

export default DefaultLayout;