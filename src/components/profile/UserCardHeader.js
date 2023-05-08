import { faBolt, faBuildingUser, faBullseye, faSignature } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import WorkerImage from './WorkerImage'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import ModalAvatarEdit from './ModalAvatarEdit'
import axios from 'axios'

const UserCardHeader = ({ user, sessionUsername, API_BASE_URL, baseUrl }) => {
  const MySwal = withReactContent(Swal);
  const defaultImageSrc = `${baseUrl}/workers/user.webp`;

  const [avatar, setAvatar] = useState();
  const [avatarUpdate, setAvatarUpdate] = useState(false);

  const handleAvatarUpdate = () => {
    MySwal.fire({
      title: <div style={{ color: '#ed6337' }}>Alterar Avatar</div>,
      html: <ModalAvatarEdit defaultImageSrc={defaultImageSrc} setAvatar={setAvatar} />,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#388e3c',
      cancelButtonColor: '#c62828',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setAvatarUpdate(true)
      }
    });
  }

  const updateAvatar = useCallback(async () => {
    const formData = new FormData();
    formData.append('action', 'update_avatar');
    formData.append('image', avatar);
    formData.append('username', user.USERNAME);

    try {
      const response = await axios.post(API_BASE_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setAvatarUpdate(false);
      console.log('Response from update_avatar:', response.data)
      //window.location.reload()
    } catch (error) {
      console.error('Error updating avatar:', error);
    }
  }, [API_BASE_URL, avatar, user.USERNAME])

  useEffect(() => {
    if (avatarUpdate) updateAvatar()
  }, [avatarUpdate, updateAvatar]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    }}>
      <div style={{ marginRight: 10 }}>
        <WorkerImage
          username={user.USERNAME}
          defaultImageSrc={defaultImageSrc}
          alt={user.USERNAME}
          style={{
            width: 125,
            height: 125,
            borderRadius: '5%',
            objectFit: 'cover',
            border: '#77321c 2px solid'
          }}
          onClick={() => handleAvatarUpdate(user.USERNAME)}
          avatar={true}
          sessionUsername={sessionUsername}
          clickable={sessionUsername === user.USERNAME}
          baseUrl={baseUrl}
        />
      </div>
      <div className='text-start' style={{ color: '#77321c' }}>
        <h3>
          <FontAwesomeIcon icon={faSignature} className='me-2' color='#ed6337' />
          {user.NAME}
        </h3>
        <h5 style={{ opacity: '60%', color: '#77321c' }}>
          <FontAwesomeIcon icon={faBuildingUser} className='me-2' color='#ed6337' />
          {user.DEPARTAMENTO}
        </h5>
        <h6 style={{ opacity: '60%', color: '#77321c' }}>
          <FontAwesomeIcon icon={faBolt} className='me-2' color='#ed6337' />
          {user.FUNCAO}
        </h6>
      </div>
    </div>
  )
}

export default UserCardHeader