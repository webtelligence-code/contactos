import { faBuilding, faBuildingUser, faCakeCandles, faCar, faEnvelope, faLayerGroup, faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Col, Row } from 'react-bootstrap'

const UserDetails = ({ user }) => {
  return (
    <Row style={{ color: '#77321c', fontWeight: 'normal' }}>
      <Col>
        {user.EMAIL && (
          <p>
            <FontAwesomeIcon icon={faEnvelope} className='me-1' color='#ed6337' size='sm' />
            <FontAwesomeIcon icon={faBuilding} className='me-2' color='#ed6337' size='sm' />
            {user.EMAIL}
          </p>
        )}
        {user.EMAIL_PESSOAL && user.EMAIL_PESSOAL.length > 1 && (
          <p>
            <FontAwesomeIcon icon={faEnvelope} className='me-1' color='#ed6337' size='sm' />
            <FontAwesomeIcon icon={faUser} className='me-2' color='#ed6337' size='sm' />
            {user.EMAIL_PESSOAL}
          </p>
        )}
        {user.CONTACTO && (
          <p>
            <FontAwesomeIcon icon={faPhone} className='me-2' color='#ed6337' size='sm' />
            {user.CONTACTO}
          </p>
        )}
        {user.EXTENSAO && (
          <p>
            <FontAwesomeIcon icon={faLayerGroup} className='me-2' color='#ed6337' size='sm' />
            {user.EXTENSAO ? user.EXTENSAO : 'Nenhuma.'}
          </p>
        )}
        {user.DATA_NASCIMENTO && (
          <p>
            <FontAwesomeIcon icon={faCakeCandles} className='me-2' color='#ed6337' size='sm' />
            {user.DATA_NASCIMENTO}
          </p>
        )}
      </Col>
      <Col>
        {user.DEPARTAMENTO && (
          <p>
            <FontAwesomeIcon icon={faBuildingUser} className='me-2' color='#ed6337' size='sm' />
            {user.DEPARTAMENTO}
          </p>
        )}
        {user.CONCESSAO && (
          <p>
            <FontAwesomeIcon icon={faCar} className='me-2' color='#ed6337' size='sm' />
            {user.CONCESSAO}
          </p>
        )}
        {user.EMPRESA && (
          <p>
            <FontAwesomeIcon icon={faBuilding} className='me-2' color='#ed6337' size='sm' />
            {user.EMPRESA}
          </p>
        )}
      </Col>
    </Row>
  )
}

export default UserDetails