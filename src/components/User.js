import React, { Fragment } from 'react'
import { Card, Image } from 'react-bootstrap'

const User = ({ user }) => {
  const imageUrl = `https://amatoscar.pt/GAP/${user.imageUrl}`;

  return (
    <Fragment>
      <Card className='my-3'>
        <Card.Header as='h5'>Perfil</Card.Header>
        <Card.Body>
          <Image src={null} />
        </Card.Body>
      </Card>
    </Fragment>
  )
}

export default User