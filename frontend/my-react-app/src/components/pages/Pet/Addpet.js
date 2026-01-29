import styles from './AddPet.module.css';
import api from '../../../utils/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

import useFlashMessage from '../../../hooks/useFlashMessage';
import PetForm from '../../form/PetForm';

function Addpet() {
    const [token] = useState(localStorage.getItem('token') || '');
    const { setFlashMessage } = useFlashMessage();
    
    const navigate = useNavigate(); 

    async function registerPet(pet) {
        let msgType = 'success';
        const formData = new FormData();

        Object.keys(pet).forEach((key) => {
            if (key === 'images') {
                for (let i = 0; i < pet[key].length; i++) {
                    formData.append('images', pet[key][i]);
                }
            } else {
                formData.append(key, pet[key]);
            }
        });

        try {
            const data = await api.post('pets/create', formData, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                    'Content-Type': 'multipart/form-data',
                },
            }).then((response) => response.data);

            setFlashMessage(data.message, msgType);
            
            navigate('/pet/mypets'); 

        } catch (error) {
            msgType = 'error';
            setFlashMessage(error.response.data.message, msgType);
        }
    }

    return (
        <section className={styles.addPet_header}>
            <div>
                <h1>Cadastre um Pet</h1>
                <p>Depois ele aparecerá na página inicial para adoção</p>
            </div>
            <PetForm handleSubmit={registerPet} btnText="Cadastrar Pet" />
        </section>
    );
}

export default Addpet;