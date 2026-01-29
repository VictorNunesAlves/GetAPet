import { useState, useEffect } from 'react';
import formStyles from '../../form/Form.module.css';
import styles from './Profile.module.css';
import Input from '../../form/Input';
import api from '../../../utils/api';
import useFlashMessage from '../../../hooks/useFlashMessage';
import RoundedImage from '../../layout/RoundedImage';

function Profile() {
    const [preview, setPreview] = useState();
    const [token] = useState(localStorage.getItem('token') || '');
    const [user, setUser] = useState({});
    const { setFlashMessage } = useFlashMessage();

    useEffect(() => {
        api.get('/users/checkuser', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setUser(response.data.currentUser);
        }).catch((err) => {
            console.log(err);
        });
    }, [token]);

    function onFileChange(e) {
        setPreview(e.target.files[0]);
        setUser({ ...user, [e.target.name]: e.target.files[0] });
    }

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let msgType = 'success';

        const formData = new FormData();


        Object.keys(user).forEach((key) => {
            formData.append(key, user[key]);
        });

        try {
            const response = await api.patch(`/users/edit/${user._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            const data = response.data;
            setFlashMessage(data.message, msgType);
        } catch (error) {
            msgType = 'error';
            const errorMessage = error.response ? error.response.data.message : "Erro ao conectar com o servidor";
            setFlashMessage(errorMessage, msgType);
        }
    } 

    return (
        <section>
            <div className={styles.profile_header}>
                <h1>Perfil</h1>
                {(user.image || preview) && (
                    <RoundedImage 
                        src={
                            preview 
                                ? URL.createObjectURL(preview) 
                                : `http://localhost:5000/images/users/${user.image}`
                        }
                        alt={user.name} 
                    />
                )}
            </div>
            <form onSubmit={handleSubmit} className={formStyles.form_container}>
                <Input
                    text="Imagem"
                    type="file"
                    name="image"
                    handleOnChange={onFileChange}
                />
                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite seu email"
                    handleOnChange={handleChange}
                    value={user.email || ""}
                />
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite seu nome"
                    handleOnChange={handleChange}
                    value={user.name || ""}
                />
                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite seu telefone"
                    handleOnChange={handleChange}
                    value={user.phone || ""}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite sua nova senha"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Confirmar Senha"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirme sua nova senha"
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Editar" />
            </form>
        </section>
    );
}

export default Profile;