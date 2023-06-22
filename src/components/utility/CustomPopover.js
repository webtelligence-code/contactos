import { faBuilding, faBuildingUser, faCar, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Popover from 'react-bootstrap/Popover';

const CustomPopover = ({ teamMember }) => (
  <Popover id="popover-basic">
    <Popover.Header as="h3">{teamMember.nameDisplay}</Popover.Header>
    <Popover.Body>
      <p>
        <FontAwesomeIcon icon={faBuildingUser} className='me-2' />
        {teamMember.departamento}
      </p>
      <p>
        <FontAwesomeIcon icon={faBuildingUser} className='me-2' />
        {teamMember.funcao}
      </p>
      <p>
        <FontAwesomeIcon icon={faCar} className='me-2' />
        {teamMember.concessao}
      </p>
      <p>
        <FontAwesomeIcon icon={faBuilding} className='me-2' />
        {teamMember.empresa}
      </p>
      <p>
        <FontAwesomeIcon icon={faEnvelope} className='me-2' />
        {teamMember.emailEmpresa}
      </p>
      <p>
        <FontAwesomeIcon icon={faPhone} className='me-2' />
        {teamMember.contacto}
      </p>
    </Popover.Body>
  </Popover>
)

export default CustomPopover