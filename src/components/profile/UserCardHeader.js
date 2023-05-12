import { faBolt, faBuildingUser, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useEffect, useState } from 'react'
import WorkerImage from './WorkerImage'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import ModalAvatarEdit from './ModalAvatarEdit'
import axios from 'axios'

const UserCardHeader = ({ user, sessionUsername, API_BASE_URL, baseUrl }) => {
  const MySwal = withReactContent(Swal);
  const [avatar, setAvatar] = useState();
  const [avatarUpdate, setAvatarUpdate] = useState(false);

  const handleAvatarUpdate = () => {
    MySwal.fire({
      title: <div style={{ color: '#ed6337' }}>Alterar foto de perfil</div>,
      html: <ModalAvatarEdit baseUrl={baseUrl} setAvatar={setAvatar} username={user.USERNAME} />,
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

  function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  const updateAvatar = useCallback(async () => {
    const formData = new FormData();
    const blob = dataURLtoBlob(avatar);
    const file = new File([blob], `${user.USERNAME}.webp`, { type: 'image/webp' });

    formData.append('action', 'update_avatar');
    formData.append('image', file);
    formData.append('username', user.USERNAME);

    console.log('Data to update_avatar case:', file)
    axios.post(API_BASE_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((response) => {
        console.log(response.data)
        MySwal.fire({
          title: response.data.title,
          text: response.data.message,
          icon: response.data.icon,
          showConfirmButton: true,
          showCancelButton: false,
          confirmButtonColor: '#388e3c',
        }).then((result) => {
          if (result.isConfirmed) {
            setAvatarUpdate(false);
            window.location.reload();
          }
        })
      });
  }, [API_BASE_URL, MySwal, avatar, user.USERNAME])

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
          key={`${user.USERNAME}-${avatarUpdate}`}
          username={user.USERNAME}
          alt={user.USERNAME}
          style={{
            width: 150,
            height: 150,
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
          <FontAwesomeIcon icon={faUser} className='me-2' color='#ed6337' />
          {user.NAME}
        </h3>
        <h5 style={{ opacity: '60%' }}>
          <FontAwesomeIcon icon={faBuildingUser} className='me-2' color='#ed6337' />
          {user.DEPARTAMENTO}
        </h5>
        <h6 style={{ opacity: '60%' }}>
          <FontAwesomeIcon icon={faBolt} className='me-2' color='#ed6337' />
          {user.FUNCAO}
        </h6>
      </div>
    </div>
  )
}

export default UserCardHeader