import React from 'react';
import LayoutConfig from '../LayoutConfig';
import InfoUser from './InfoUser';

import './AdminLayoutStyle.css';

function AdminLayout(props) {
    const { children } = props;
    return (
        <>
            <LayoutConfig {...props} >
                <div className="admin-layout-content" >
                    <InfoUser />
                    {children}
                </div>
            </LayoutConfig>
        </>
    );
}

export default AdminLayout;