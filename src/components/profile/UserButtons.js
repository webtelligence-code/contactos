import { faArrowLeftLong, faBookOpen, faHome, faInfo, faKey, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment, useState } from 'react'
import { Button, Overlay, Tooltip } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const UserButtons = ({ fireModal, sessionUsername, username, firePasswordModal, showUserManual }) => {
  const navigate = useNavigate();

  // States
  const [hoveredBack, setHoveredBack] = useState(false);
  const [hoveredHome, setHoveredHome] = useState(false);
  const [hoveredManual, setHoveredManual] = useState(false);
  const [hoveredInfo, setHoveredInfo] = useState(false);
  const [hoveredEdit, setHoveredEdit] = useState(false);
  const [hoveredPassword, setHoveredPassword] = useState(false);

  // Tooltip States
  const [tooltipMessage, setTooltipMessage] = useState('');
  const [tooltipTarget, setTooltipTarget] = useState(null);

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'white' }}>
      <Button
        variant='danger'
        style={{ backgroundColor: '#c62828', width: 35 }}
        size='sm'
        className='my-2'
        onClick={() => window.history.back()}
        onMouseEnter={(e) => { setHoveredBack(true); setTooltipMessage('Voltar atrás'); setTooltipTarget(e.currentTarget) }}
        onMouseLeave={() => { setHoveredBack(false); setTooltipMessage(''); setTooltipTarget(null) }}
      >
        <FontAwesomeIcon
          icon={faArrowLeftLong}
          color='white'
          fade={hoveredBack}
        />
      </Button>
      <Button
        variant='success'
        style={{ backgroundColor: '#388e3c', width: 35 }}
        size='sm'
        className='ms-2'
        onClick={() => navigate('GAP/NovasPlataformas/contactos')}
        onMouseEnter={(e) => { setHoveredHome(true); setTooltipMessage('Página Inicial'); setTooltipTarget(e.currentTarget) }}
        onMouseLeave={() => { setHoveredHome(false); setTooltipMessage(''); setTooltipTarget(null) }}
      >
        <FontAwesomeIcon
          icon={faHome}
          color='white'
          fade={hoveredHome}
        />
      </Button>
      <Button
        style={{ backgroundColor: '#ed6337', borderColor: '#ed6337' }}
        size='sm'
        className='ms-5'
        onClick={showUserManual}
        onMouseEnter={(e) => { setHoveredManual(true); setTooltipMessage('Manual de utilizador'); setTooltipTarget(e.currentTarget) }}
        onMouseLeave={() => { setHoveredManual(false); setTooltipMessage(''); setTooltipTarget(null) }}
      >
        <FontAwesomeIcon
          icon={faBookOpen}
          color='white'
          fade={hoveredManual}
        />
      </Button>
      {sessionUsername === username && (
        <Fragment>
          <Button
            variant='primary'
            size='sm'
            className='ms-5'
            style={{ width: 35 }}
            onClick={() => fireModal(false)}
            onMouseEnter={(e) => { setHoveredInfo(true); setTooltipMessage('+ Info'); setTooltipTarget(e.currentTarget) }}
            onMouseLeave={() => { setHoveredInfo(false); setTooltipMessage(''); setTooltipTarget(null) }}
          >
            <FontAwesomeIcon
              icon={faInfo}
              color='white'
              fade={hoveredInfo}
            />
          </Button>
          <Button
            variant='success'
            style={{ backgroundColor: '#388e3c', width: 35 }}
            size='sm'
            className='ms-2'
            onClick={() => fireModal(true)}
            onMouseEnter={(e) => { setHoveredEdit(true); setTooltipMessage('Editar perfil'); setTooltipTarget(e.currentTarget) }}
            onMouseLeave={() => { setHoveredEdit(false); setTooltipMessage(''); setTooltipTarget(null) }}
          >
            <FontAwesomeIcon
              icon={faUserPen}
              color='white'
              fade={hoveredEdit}
            />
          </Button>
          <Button
            variant='success'
            style={{ backgroundColor: '#388e3c', width: 35 }}
            size='sm'
            className='ms-2'
            onClick={firePasswordModal}
            onMouseEnter={(e) => { setHoveredPassword(true); setTooltipMessage('Alterar password'); setTooltipTarget(e.currentTarget) }}
            onMouseLeave={() => { setHoveredPassword(false); setTooltipMessage(''); setTooltipTarget(null) }}
          >
            <FontAwesomeIcon
              icon={faKey}
              color='white'
              fade={hoveredPassword}
            />
          </Button>
        </Fragment>
      )}
      <Overlay target={tooltipTarget} show={tooltipMessage !== ""} placement='bottom'>
        <Tooltip id='overlay-example' >
          {tooltipMessage}
        </Tooltip>
      </Overlay>
    </div>
  )
}

export default UserButtons