import api from '../../../utils/api';
import { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import RoundedImage from '../../layout/RoundedImage';
import useFlashMessage from '../../../hooks/useFlashMessage';

function MyAdoptions() {
    const [pets, setPets] = useState([]);
    const [myPetsWithAdopters, setMyPetsWithAdopters] = useState([]);
    const [token] = useState(localStorage.getItem('token') || '');
    const { setFlashMessage } = useFlashMessage();
    const [activeTab, setActiveTab] = useState('interested');

    useEffect(() => {
        if (token) {
            api.get('/pets/myAddoptions', {
                headers: { Authorization: `Bearer ${JSON.parse(token)}` }
            }).then((response) => setPets(response.data.pets));

            api.get('/pets/getPetsByOwner', {
                headers: { Authorization: `Bearer ${JSON.parse(token)}` }
            }).then((response) => {
                const filtered = response.data.pets.filter(pet => pet.adopter);
                setMyPetsWithAdopters(filtered);
            });
        }
    }, [token]);

    async function cancelAdoption(id) {
        try {
            const response = await api.patch(`/pets/update/${id}`, { adopter: null }, {
                headers: { Authorization: `Bearer ${JSON.parse(token)}` }
            });

            setFlashMessage(response.data.message, 'success');
            window.location.reload(); 
        } catch (err) {
            setFlashMessage(err.response.data.message, 'error');
        }
    }

    async function concludeAdoption(id) {
        try {
            const response = await api.patch(`/pets/conclude/${id}`, {}, {
                headers: { Authorization: `Bearer ${JSON.parse(token)}` }
            });
            setFlashMessage(response.data.message, 'success');
            window.location.reload();
        } catch (err) {
            setFlashMessage(err.response.data.message, 'error');
        }
    }

    return (
        <section>
            <div className={styles.petslist_header}>
                <h1>Minhas Adoções</h1>
            </div>
            
            <div className={styles.tabs_container}>
                <button 
                    className={activeTab === 'interested' ? styles.active_tab : ''} 
                    onClick={() => setActiveTab('interested')}
                >
                    Quero Adotar
                </button>
                <button 
                    className={activeTab === 'owner' ? styles.active_tab : ''} 
                    onClick={() => setActiveTab('owner')}
                >
                    Solicitações em Meus Pets
                </button>
            </div>

            <div className={styles.petslist_container}>
                {activeTab === 'interested' ? (
                    pets.length > 0 ? pets.map((pet) => (
                        <div key={pet._id} className={styles.pet_card}>
                            <RoundedImage src={`http://localhost:5000/images/pets/${pet.images[0]}`} alt={pet.name} width="px75" />
                            <div className={styles.contact_info}>
                                <span className="bold">{pet.name}</span>
                                <p><span className="bold">Dono:</span> {pet.user.name}</p>
                                <p><span className="bold">Contato:</span> {pet.user.phone}</p>
                            </div>
                            <div className={styles.actions}>
                                {(pet.available || pet.avaliable) ? (
                                    <div className={styles.status_process}>
                                        <p>Adoção em processo</p>
                                        <button className={styles.cancel_btn} onClick={() => cancelAdoption(pet._id)}>Desistir da Adoção</button>
                                    </div>
                                ) : (
                                    <p className={styles.concluded_msg}>Parabéns! Você adotou este pet.</p>
                                )}
                            </div>
                        </div>
                    )) : <p>Você ainda não solicitou nenhuma adoção.</p>
                ) : (
                    myPetsWithAdopters.length > 0 ? myPetsWithAdopters.map((pet) => (
                        <div key={pet._id} className={styles.pet_card}>
                            <RoundedImage src={`http://localhost:5000/images/pets/${pet.images[0]}`} alt={pet.name} width="px75" />
                            <div className={styles.contact_info}>
                                <span className="bold">{pet.name}</span>
                                <p><span className="bold">Interessado:</span> {pet.adopter.name}</p>
                                <p><span className="bold">Telefone:</span> {pet.adopter.phone}</p>
                            </div>
                            <div className={styles.actions}>
                                {(pet.available || pet.avaliable) ? (
                                    <>
                                        <button className={styles.conclude_btn} onClick={() => concludeAdoption(pet._id)}>Concluir Adoção</button>
                                        <button className={styles.cancel_btn} onClick={() => cancelAdoption(pet._id)}>Recusar Adotante</button>
                                    </>
                                ) : (
                                    <p className={styles.concluded_msg}>Vendido / Adotado</p>
                                )}
                            </div>
                        </div>
                    )) : <p>Nenhum interessado nos seus pets no momento.</p>
                )}
            </div>
        </section>
    );
}

export default MyAdoptions;