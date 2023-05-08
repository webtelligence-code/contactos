import { faBuildingUser, faCar, faPeopleGroup, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment } from 'react'
import { Card, Col, Image, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import WorkerImage from './WorkerImage'

const Team = ({ baseUrl, team, username }) => {
  const navigate = useNavigate()
  const defaultImageSrc = `${baseUrl}/workers/user.webp`;

  const handleTeamMemberOnClick = (username) => {
    window.scrollTo(0, 0);
    navigate(`/contactos/profile/${username}`);
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
            {team.map((teamMember, key) => {
              if (username !== teamMember.USERNAME) {
                return (
                  <Col key={key} className='m-2'>
                    <WorkerImage
                      username={teamMember.USERNAME}
                      defaultImageSrc={defaultImageSrc}
                      alt={teamMember.USERNAME}
                      style={{
                        width: 125,
                        height: 125,
                        borderRadius: '5%',
                        objectFit: 'cover',
                        border: '#77321c 2px solid'
                      }}
                      onClick={() => handleTeamMemberOnClick(teamMember.USERNAME)}
                      avatar={false}
                      sessionUsername={null}
                      clickable={true}
                      baseUrl={baseUrl}
                    />
                    <div
                      style={{
                        color: '#77321c',
                        fontSize: 12
                      }}
                    >
                      <FontAwesomeIcon icon={faUser} className='me-1' color='#ed6337' size='xs' />
                      {teamMember.NAME}
                    </div>
                    <div
                      style={{
                        color: '#ed6337',
                        fontSize: 12
                      }}
                    >
                      <FontAwesomeIcon icon={faBuildingUser} className='me-1' color='#ed6337' size='xs' />
                      {teamMember.FUNCAO}
                    </div>
                    <div
                      style={{
                        color: '#ed6337',
                        fontSize: 12
                      }}
                    >
                      <FontAwesomeIcon icon={faCar} className='me-1' color='#ed6337' size='xs' />
                      {teamMember.CONCESSAO}
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