import { faBuildingUser, faCar, faPeopleGroup, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import WorkerImage from './WorkerImage'

const Team = ({ baseUrl, team, username }) => {
  const navigate = useNavigate()
  const defaultImageSrc = `${baseUrl}/workers/user.webp`;

  const handleTeamMemberOnClick = (username) => {
    window.scrollTo(0, 0);
    navigate(`/GAP/NovasPlataformas/contactos/profile/${username}`);
  }

  return (
    <Fragment>
      <Card
        className='my-3'
      >
        <Card.Header
          style={{
            backgroundColor: 'white',
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
            color: '#77321c'
          }}
          as={'h6'}
        >
          {`Equipa (${team.length} membros)`}
          <FontAwesomeIcon icon={faPeopleGroup} color='#ed6337' className='ms-2' />
        </Card.Header>
        <Card.Body>
          <Row className='text-center'>
            {/* eslint-disable-next-line array-callback-return */}
            {team.map((teamMember, key) => {
              if (username !== teamMember.username) {
                return (
                  <Col key={key} className='m-2'>
                    <WorkerImage
                      username={teamMember.username}
                      defaultImageSrc={defaultImageSrc}
                      alt={teamMember.username}
                      style={{
                        width: 125,
                        height: 125,
                        borderRadius: '5%',
                        objectFit: 'cover',
                        border: '#77321c 2px solid'
                      }}
                      onClick={() => handleTeamMemberOnClick(teamMember.username)}
                      avatar={false}
                      sessionUsername={null}
                      clickable={true}
                      baseUrl={baseUrl}
                      teamMember={teamMember}
                      teamOverlay={true}
                    />
                    <div
                      style={{
                        color: '#77321c',
                        fontSize: 12
                      }}
                    >
                      <FontAwesomeIcon icon={faUser} className='me-1' color='#ed6337' size='xs' />
                      {teamMember.nameDisplay}
                    </div>
                    <div
                      style={{
                        color: '#ed6337',
                        fontSize: 12
                      }}
                    >
                      <FontAwesomeIcon icon={faBuildingUser} className='me-1' color='#ed6337' size='xs' />
                      {teamMember.funcao}
                    </div>
                    <div
                      style={{
                        color: '#77321c',
                        fontSize: 12,
                      }}
                    >
                      <FontAwesomeIcon icon={faCar} className='me-1' color='#ed6337' size='xs' />
                      {teamMember.concessao}
                    </div>
                  </Col>
                )
              }
            })}
          </Row>
        </Card.Body>
      </Card>
    </Fragment >
  )
}

export default Team