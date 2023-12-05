import React, { Fragment } from 'react'
import { Card } from 'react-bootstrap'
import Team from './Team';
import LoadingBars from '../utility/LoadingBars';
import UserDetails from './UserDetails';
import UserCardHeader from './UserCardHeader';
import Brands from './Brands';

const User = ({ API_BASE_URL, baseUrl, user, team, loading, sessionUsername }) => {
  return (
    <Fragment>
      {/* Card Component */}
      <Card className='mb-2'>
        {/* This is the User Card Header */}
        <Card.Header
          className='text-light'
          style={{
            backgroundColor: 'white',
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px'
          }}
        >
          {loading ? (
            <LoadingBars classes={'ms-3'} />
          ) : (
            <UserCardHeader user={user} brands={user.marcas} baseUrl={baseUrl} API_BASE_URL={API_BASE_URL} sessionUsername={sessionUsername} />
          )}

        </Card.Header>
        <Card.Body>
          {loading ? (
            <LoadingBars />
          ) : (
            <Team baseUrl={baseUrl} team={team} username={user.username} />
          )}
        </Card.Body >
      </Card >
    </Fragment >
  )
}

export default User