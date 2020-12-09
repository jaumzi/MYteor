import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { ROUTES } from '../../config/RoutesConfig';
import AdminLayout from '../../layout/admin/AdminLayout';

import './HomeViewStyle.css';

const HomeView = () => {

    return (
        <>
            <AdminLayout title="Início" >
                <div>
                    <h3>Bem vindo!</h3>

                    <Link to={ROUTES.CHAT.src()} >Acessar chats</Link>
                </div>
            </AdminLayout>
        </>
    );
};

export default HomeView;