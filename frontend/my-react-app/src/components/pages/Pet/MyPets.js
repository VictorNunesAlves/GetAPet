import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RoundedImage from '../../layout/RoundedImage';
import useFlashMessage from '../../../hooks/useFlashMessage';
import api from '../../../utils/api';
import styles from './Dashboard.module.css';

function MyPets() {
    const [pets, setPets] = useState([]);
    const [token] = useState(localStorage.getItem('token') || '');
    const { setFlashMessage } = useFlashMessage();

    useEffect(() => {
        if (token) {
            api.get('/pets/getPetsByOwner', { 
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            }).then((response) => {
                setPets(response.data.pets);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [token]);

    async function removePet(id) {
        let msgType = 'success';

        try {
            const response = await api.delete(`/pets/remove/${id}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                }
            });

            const updatedPets = pets.filter((pet) => pet._id !== id);
            setPets(updatedPets);
            setFlashMessage(response.data.message, msgType);
        } catch (error) {
            msgType = 'error';
            setFlashMessage(error.response.data.message, msgType);
        }
    }

    async function concludeAdoption(id) {
        let msgType = 'success';

        try {
            const response = await api.patch(`/pets/conclude/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                }
            });

            setFlashMessage(response.data.message, msgType);
            
            api.get('/pets/getPetsByOwner', {
                headers: { Authorization: `Bearer ${JSON.parse(token)}` }
            }).then(res => setPets(res.data.pets));

        } catch (error) {
            msgType = 'error';
            setFlashMessage(error.response.data.message, msgType);
        }
    }

    return (
        <section>
            <div className={styles.petslist_header}>
                <h1>Meus Pets</h1>
                <Link to="/pet/add">Cadastrar Novo Pet</Link>
            </div>
            <div className={styles.petslist_container}>
                {pets.length > 0 ? (
                    pets.map((pet) => (
                        <div key={pet._id} className={styles.pet_card}>
                            <RoundedImage
                                src={`http://localhost:5000/images/pets/${pet.images[0]}`} 
                                alt={pet.name} 
                                width="px75"
                            />
                            <span className="bold">{pet.name}</span>
                            <div className={styles.actions}>
                                {pet.available || pet.avaliable ? (
                                    <>
                                        {pet.adopter && (
                                            <button 
                                                className={styles.conclude_btn}
                                                onClick={() => concludeAdoption(pet._id)}
                                            >
                                                Concluir adoção
                                            </button>
                                        )}
                                        <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                                        <button onClick={() => removePet(pet._id)}>Excluir</button>
                                    </>
                                ) : (
                                    <p>Pet já adotado</p>
                                )}
                            </div>
                        </div> 
                    ))
                ) : (
                    <p>Não há pets cadastrados.</p>
                )}
            </div>
        </section>
    );
}

export default MyPets;