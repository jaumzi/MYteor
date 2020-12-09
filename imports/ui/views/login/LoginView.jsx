import React, { useContext, useRef } from 'react';
import Input from '../../components/form-input/Input';
import FormUtils from '../../util/FormUtils';
import { useHistory } from "react-router-dom";
import { AppContext } from '../../config/AppContext';
import DefaultLayout from '../../layout/default/DefaultLayout';

const LoginView = () => {
    let history = useHistory();
    const formRef = useRef();

    const ctx = useContext(AppContext);
    const { login } = ctx;

    const handleSubmit = async e => {
        e.preventDefault();

        const form = new FormUtils(formRef);
        let name = form.getData('name');
        let password = form.getData('password');

        login(name, password, (error) => {
            if (error) {
                console.error(error);
            } else {
                history.push("/");
            }
        });

        form.clearData();
    };

    return (
        <DefaultLayout title="Entrar" >
            <form ref={formRef} onSubmit={handleSubmit} >
                <div>
                    {JSON.stringify({ nome: 'user1', senha: '123' })}
                    <br />
                    {JSON.stringify({ nome: 'user2', senha: '123' })}
                </div>
                <br />
                <Input
                    type="text"
                    name="name"
                    label="Nome"
                    placeholder="Digite seu nome"
                    required
                />
                <Input
                    type="password"
                    name="password"
                    label="Senha"
                    placeholder="Digite sua senha"
                    required
                />

                <button type="submit">Entrar</button>
            </form>
        </DefaultLayout>
    );
};

export default LoginView;
