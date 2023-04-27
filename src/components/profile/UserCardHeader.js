import { faBolt, faBuildingUser, faSignature } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Image } from 'react-bootstrap'

const UserCardHeader = ({ user }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    }}>
      <div>
        <Image
          src={`/contactos/${user.IMAGE_PATH}`}
          alt='Profile'
          className='me-2 profile-pic'
        />
      </div>
      <div className='text-start'>
        <h3>
          <FontAwesomeIcon icon={faSignature} className='me-2' />
          {user.NAME}
        </h3>
        <h5 style={{ opacity: '80%', color: '#77321c' }}>
          <FontAwesomeIcon icon={faBuildingUser} className='me-2'  />
          {user.DEPARTAMENTO}
        </h5>
        <h6 style={{ opacity: '80%', color: '#77321c' }}>
          <FontAwesomeIcon icon={faBolt} className='me-2' fade />
          {user.FUNCAO}
        </h6>
      </div>
    </div>
  )
}

export default UserCardHeader