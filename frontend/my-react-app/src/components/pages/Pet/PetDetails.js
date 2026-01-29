import api from '../../../utils/api'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import styles from './PetDetails.module.css'
import useFlashMessage from '../../../hooks/useFlashMessage'

function PetDetails() {
  const [pet, setPet] = useState({})
  const { id } = useParams()
  const { setFlashMessage } = useFlashMessage()
  const [token] = useState(localStorage.getItem('token') || '')
  
  // Estado para controlar qual imagem está em destaque
  const [mainImage, setMainImage] = useState('')

  useEffect(() => {
    api.get(`/pets/${id}`).then((response) => {
      const petData = response.data.pet || response.data
      setPet(petData)
      // Define a primeira imagem como a principal ao carregar
      if (petData.images && petData.images.length > 0) {
        setMainImage(petData.images[0])
      }
    })
  }, [id])

  async function schedule() {
    let msgType = 'success'
    try {
      const response = await api.patch(`pets/schedule/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      })
      setFlashMessage(response.data.message, msgType)
    } catch (error) {
      msgType = 'error'
      setFlashMessage(error.response.data.message, msgType)
    }
  }

  return (
    <>
      {pet.name && (
        <section className={styles.pet_details_container}>
          <div className={styles.pet_details_header}>
            <h1>Conhecendo o Pet: {pet.name}</h1>
            <p>Se tiver interesse, agende uma visita para conhecê-lo</p>
          </div>

          <div className={styles.gallery_container}>
            {/* Imagem Grande em Destaque */}
            <div className={styles.main_image}>
              <img
                src={`http://localhost:5000/images/pets/${mainImage}`}
                alt={pet.name}
              />
            </div>

            {/* Lista de Miniaturas (Thumbnails) */}
            <div className={styles.thumbnails_container}>
              {pet.images.map((image, index) => (
                <img
                  src={`http://localhost:5000/images/pets/${image}`}
                  alt={pet.name}
                  key={index}
                  className={mainImage === image ? styles.active_thumb : ''}
                  onClick={() => setMainImage(image)} // Muda a imagem principal ao clicar
                />
              ))}
            </div>
          </div>

          <div className={styles.pet_info}>
             <p><span className="bold">Peso:</span> {pet.weight}kg</p>
             <p><span className="bold">Idade:</span> {pet.age} anos</p>
             <p><span className="bold">Cor:</span> {pet.color}</p>
          </div>

          {token ? (
            <button className={styles.schedule_btn} onClick={schedule}>Solicitar uma Visita</button>
          ) : (
            <p className={styles.auth_msg}>
              Você precisa <Link to="/register">Criar uma conta</Link> ou <Link to="/login">Fazer login</Link> para solicitar uma visita.
            </p>
          )}
        </section>
      )}
    </>
  )
}

export default PetDetails