import { faBuilding, faBuildingUser, faCakeCandles, faCar, faEnvelope, faLayerGroup, faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Col, Row } from 'react-bootstrap'

const UserDetails = ({ user }) => {
  return (
    <Row style={{ color: '#77321c', fontWeight: 'normal' }}>
      <Col>
        {user.emailEmpresa && (
          <p>
            <FontAwesomeIcon icon={faEnvelope} className='me-1' color='#ed6337' size='sm' />
            <FontAwesomeIcon icon={faBuilding} className='me-2' color='#ed6337' size='sm' />
            {user.emailEmpresa}
          </p>
        )}
        {user.emailPessoal && user.emailPessoal.length > 1 && (
          <p>
            <FontAwesomeIcon icon={faEnvelope} className='me-1' color='#ed6337' size='sm' />
            <FontAwesomeIcon icon={faUser} className='me-2' color='#ed6337' size='sm' />
            {user.emailPessoal}
          </p>
        )}
        {user.contacto && (
          <p>
            <FontAwesomeIcon icon={faPhone} className='me-2' color='#ed6337' size='sm' />
            {user.contacto}
          </p>
        )}
        {user.extensao && (
          <p>
            <FontAwesomeIcon icon={faLayerGroup} className='me-2' color='#ed6337' size='sm' />
            {user.extensao}
          </p>
        )}
        {user.dataNascimento && (
          <p>
            <FontAwesomeIcon icon={faCakeCandles} className='me-2' color='#ed6337' size='sm' />
            {user.dataNascimento}
          </p>
        )}
      </Col>
      <Col>
        {user.departamento && (
          <p>
            <FontAwesomeIcon icon={faBuildingUser} className='me-2' color='#ed6337' size='sm' />
            {user.departamento}
          </p>
        )}
        {user.concessao && (
          <p>
            <FontAwesomeIcon icon={faCar} className='me-2' color='#ed6337' size='sm' />
            {user.concessao}
          </p>
        )}
        {user.empresa && (
          <p>
            <FontAwesomeIcon icon={faBuilding} className='me-2' color='#ed6337' size='sm' />
            {user.empresa}
          </p>
        )}
      </Col>
    </Row>
  )
}

export default UserDetails