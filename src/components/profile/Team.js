import { faBuildingUser, faPeopleGroup, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import LoadingBars from '../utility/LoadingBars'
import { useNavigate } from 'react-router-dom'

const Team = ({ baseUrl, team, loading }) => {
  const navigate = useNavigate()

  const handleTeamMemberOnClick = (username) => {
    window.scrollTo(0, 0);
    navigate(`/contactos/profile/${username}`);
  }

  return (
    <Fragment>
      <Card
        className='my-3'
        style={{
          borderColor: '#77321c',
          borderRadius: 50,
          borderTopWidth: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#fdefeb'
        }}
      >
        <Card.Header
          className='text-light'
          style={{
            backgroundColor: '#ed6337',
            borderRadius: 20
          }}
          as={'h6'}
        >
          Equipa
          <FontAwesomeIcon icon={faPeopleGroup} color='white' className='ms-2' />
        </Card.Header>
        <Card.Body>
          {loading ? (
            <LoadingBars />
          ) : (
            team.length > 0 ? (
              <Row className='text-center'>
                {team.map((teamMember, key) => (
                  <Col key={key} className='m-2'>
                    <img
                      className='clickable'
                      src={`${baseUrl}${teamMember.IMAGE_PATH}`}
                      alt='Team Pic'
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '#77321c 2px solid'
                      }}
                      onClick={() => handleTeamMemberOnClick(teamMember.USERNAME)}
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
                  </Col>
                ))}
              </Row>
            ) : (
              <h5 className='text-center' style={{ color: '#77321c' }}>Este colaborador não tem nenhum membro de equipa.</h5>
            )
          )}
        </Card.Body>
      </Card>
    </Fragment >
  )
}

export default Team