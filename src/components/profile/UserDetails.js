import { faBuilding, faBuildingUser, faCakeCandles, faCalendarCheck, faCar, faEnvelope, faLayerGroup, faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Col, Row } from 'react-bootstrap'

const UserDetails = ({ user }) => {
  return (
    <Row style={{ color: '#77321c', fontWeight: 'normal' }}>
      <Col>
        {user.emailEmpresa && (
          <span className='my-1'>
            <FontAwesomeIcon icon={faEnvelope} className='me-1' color='#ed6337' size='sm' />
            <FontAwesomeIcon icon={faBuilding} className='me-2' color='#ed6337' size='sm' />
            {user.emailEmpresa}<br />
          </span>
        )}
        {user.contacto && (
          <span className='my-1'>
            <FontAwesomeIcon icon={faPhone} className='me-2' color='#ed6337' size='sm' />
            {user.contacto}<br />
          </span>
        )}
        {user.extensao && (
          <span className='my-1'>
            <FontAwesomeIcon icon={faLayerGroup} className='me-2' color='#ed6337' size='sm' />
            {user.extensao}<br />
          </span>
        )}
      </Col>
      <Col>
        {user.dataNascimento && (
          <span className='my-1'>
            <FontAwesomeIcon icon={faCakeCandles} className='me-2' color='#ed6337' size='sm' />
            {user.dataNascimento}<br />
          </span>
        )}
        {user.dataAdmissao && (
          <span className='my-1'>
            <FontAwesomeIcon icon={faCalendarCheck} className='me-2' color='#ed6337' size='sm' />
            {user.dataAdmissao}<br />
          </span>
        )}
      </Col>
    </Row>
  )
}

export default UserDetails