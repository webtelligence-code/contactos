import { faHandPointLeft, faInfo, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const UserButtons = ({ fireModal, username, sessionUsername }) => {
  const navigate = useNavigate();

  return (
    <Row className='text-center mb-3'>
      <Col className='w-100'>
        <Button
          variant='danger'
          size='sm'
          className='w-100 h-100 d-flex align-items-center justify-content-center'
          onClick={() => navigate('/contactos')}
        >
          <FontAwesomeIcon icon={faHandPointLeft} color='white' className='me-sm-3' />
          Voltar atrás
        </Button>
      </Col>
      {username === sessionUsername && (
        <Fragment>
          <Col className='w-100'>
            <Button
              variant='primary'
              size='sm'
              className='w-100 h-100 d-flex align-items-center justify-content-center'
              onClick={() => fireModal(false)}
            >
              <FontAwesomeIcon icon={faInfo} color='white' className='me-sm-3' />
              + Info
            </Button>
          </Col>
          <Col>
            <Button
              variant='success'
              size='sm'
              className='w-100 h-100 d-flex align-items-center justify-content-center'
              onClick={() => fireModal(true)}
            >
              <FontAwesomeIcon icon={faUserPen} color='white' className='me-sm-3' />
              Editar perfil
            </Button>
          </Col>
        </Fragment>
      )}
    </Row>
  )
}

export default UserButtons