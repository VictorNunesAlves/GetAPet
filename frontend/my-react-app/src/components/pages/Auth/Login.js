import {useState, useContext} from 'react';
import Input from '../../../components/form/Input';
import styles from '../../form/Form.module.css';

import {Link} from 'react-router-dom';

import { Context } from '../../../context/UserContext';

function Login() {

    const {login} = useContext(Context);
    const [user, setUser] = useState({});

    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value});
    }

    function handleSubmit(e){
        e.preventDefault();
        login(user);
    }

    return(
        <section className={styles.form_container}> 
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    text="Email"
                    type="email"
                    name="email"
                    placeholder="Digite o seu email"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite a sua senha"
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Entrar" className="btn"/>
            </form>
            <p>Não tem conta? <a href="/register">Clique aqui</a></p>
        </section>
    )
}

export default Login;