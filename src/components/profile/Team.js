import { faBuildingUser, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import LoadingBars from '../utility/LoadingBars'
import { useNavigate } from 'react-router-dom'

const Team = ({ team, loading }) => {
  const navigate = useNavigate()

  const handleTeamMemberOnClick = (username) => {
    window.scrollTo(0, 0);
    navigate(`/profile/${username}`);
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
            borderRadius: 20,
          }}
          as={'h6'}
        >
          Equipa
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
                    src={teamMember.IMAGE_PATH} 
                    alt='Team Pic' 
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '#77321c 2px solid'
                    }} 
                    onClick={() => handleTeamMemberOnClick(teamMember.USERNAME)}
                    />
                    <div><FontAwesomeIcon icon={faUser} className='me-1' color='#ed6337' size='xs' />{teamMember.NAME}</div>
                    <div
                      style={{ color: '#ed6337' }}
                    >
                      <FontAwesomeIcon icon={faBuildingUser} className='me-1' color='#ed6337' size='xs' />
                      {teamMember.DEPARTAMENTO}
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
    </Fragment>
  )
}

export default Team