import { faBuildingUser, faCakeCandles, faCar, faEnvelope, faPhone, faLayerGroup, faBuilding, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import Team from './Team';
import LoadingBars from '../utility/LoadingBars';

const User = ({ user, team, loading }) => {
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    setAvatar(user.IMAGE_PATH)
  }, [user])

  return (
    <Fragment>
      <Card
        className='my-3'
        style={{
          borderColor: '#77321c',
          borderRadius: 100,
          borderTopWidth: 0,
          borderTopLeftRadius: 102,
          borderTopRightRadius: 102,
          backgroundColor: '#fdefeb'
        }}
      >
        <Card.Header
          className='text-light'
          style={{
            backgroundColor: '#ed6337',
            borderRadius: 100,
          }}
        >
          {loading ? (
            <LoadingBars classes={'ms-3'} />
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <div>
                <img
                  src={avatar}
                  alt='Profile'
                  className='me-2 profile-pic'
                />
              </div>
              <div className='text-start'>
                <h3>{user.NAME}</h3>
                <h5 style={{ opacity: '80%', color: '#77321c' }}>{user.DEPARTAMENTO}</h5>
                <h6 style={{ opacity: '80%', color: '#77321c' }}>{user.FUNCAO}</h6>
              </div>
            </div>
          )}

        </Card.Header>
        <Card.Body style={{ padding: 50, paddingTop: 20, paddingBottom: 20 }}>
          {loading ? (
            <LoadingBars />
          ) : (
            <Fragment>
              <Row className='text-center mb-3'>
                <Button variant='success' size='sm' style={{ borderRadius: 50}}>Editar perfil</Button>
              </Row>
              <Row>
                <Col>
                  <p>
                    <FontAwesomeIcon icon={faEnvelope} className='me-2' color='#ed6337' size='sm' />
                    <FontAwesomeIcon icon={faBuilding} className='me-2' color='#ed6337' size='sm' />
                    {user.EMAIL}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faEnvelope} className='me-2' color='#ed6337' size='sm' />
                    <FontAwesomeIcon icon={faUser} className='me-2' color='#ed6337' size='sm' />
                    {user.EMAIL_PESSOAL}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faPhone} className='me-2' color='#ed6337' size='sm' />
                    {user.CONTACTO}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faLayerGroup} className='me-2' color='#ed6337' size='sm' />
                    {user.EXTENSAO ? user.EXTENSAO : 'Nenhuma.'}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faCakeCandles} className='me-2' color='#ed6337' size='sm' />
                    {user.DATA_NASCIMENTO}
                  </p>
                </Col>
                <Col>
                  <p>
                    <FontAwesomeIcon icon={faBuildingUser} className='me-2' color='#ed6337' size='sm' />
                    {user.DEPARTAMENTO}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faCar} className='me-2' color='#ed6337' size='sm' />
                    {user.CONCESSAO}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faBuilding} className='me-2' color='#ed6337' size='sm' />
                    {user.EMPRESA}
                  </p>
                </Col>
              </Row>
            </Fragment>
          )
          }

          <Team team={team} loading={loading} />
        </Card.Body >
      </Card >
    </Fragment >
  )
}

export default User