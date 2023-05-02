import { faHandPointLeft, faInfo, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const UserButtons = ({ fireModal, username, sessionUsername, user }) => {
  const navigate = useNavigate();

  // States
  const [hoveredBack, setHoveredBack] = useState(false);
  const [hoveredInfo, setHoveredInfo] = useState(false);
  const [hoveredEdit, setHoveredEdit] = useState(false);

  return (
    <Row className='text-center mb-3'>
      <Col className='w-100'>
        <Button
          variant='danger'
          size='sm'
          className='w-100 h-100 d-flex align-items-center justify-content-center'
          onClick={() => navigate('/contactos')}
          onMouseEnter={() => setHoveredBack(true)}
          onMouseLeave={() => setHoveredBack(false)}
        >
          <FontAwesomeIcon
            icon={faHandPointLeft}
            color='white'
            className='me-sm-3'
            fade={hoveredBack}
          />
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
              onMouseEnter={() => setHoveredInfo(true)}
              onMouseLeave={() => setHoveredInfo(false)}
            >
              <FontAwesomeIcon
                icon={faInfo}
                color='white'
                className='me-sm-3'
                fade={hoveredInfo}
              />
              + Info
            </Button>
          </Col>
          <Col>
            <Button
              variant='success'
              size='sm'
              className='w-100 h-100 d-flex align-items-center justify-content-center'
              onClick={() => fireModal(true)}
              onMouseEnter={() => setHoveredEdit(true)}
              onMouseLeave={() => setHoveredEdit(false)}
            >
              <FontAwesomeIcon
                icon={faUserPen}
                color='white'
                className='me-sm-3'
                fade={hoveredEdit}
              />
              Editar perfil
            </Button>
          </Col>
        </Fragment>
      )}
    </Row>
  )
}

export default UserButtons