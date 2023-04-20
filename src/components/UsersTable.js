import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment } from 'react'
import { Card, Table } from 'react-bootstrap'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

/**
 * This Component will render a table for each user and it will group them by concession
 * @param {props} param0 
 * @returns 
 */
const UserTable = ({ users }) => {
  const navigate = useNavigate();

  const handleUserRowOnClick = (username) => {
    navigate(`/contactos/profile/${username}`);
  }

  /**
   * This function will handle VCard generation for the user selected or the concession
   * It has a condition to verify if the data passed is an object pointing to the user or a string referencing the concession group
   * Maybe it will make an API call to index.php that will generate a VCard and return to here via callback
   * @param {object} user 
   */
  const handleVCardClick = (data, event) => {
    if (typeof data === 'object') {
      console.log('You clicked to generate a VCard for user ->', data);
    } else {
      console.log('You clicked to generate a VCard for Concession ->', data);
    }
    event.stopPropagation(); // Prevent the click propagation for user row
  }

  return (
    <Fragment>
      {Object.keys(users).map((CONCESSAO, key) => (
        <Card
          style={{
            borderColor: '#77321c',
            backgroundColor: '#fdefeb'
          }}
          className='my-3'
          key={key}
        >
          <Card.Header
            className='text-light'
            style={{backgroundColor: '#ed6337', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px'}}
            as='h5'
          >
            {CONCESSAO}
            <FontAwesomeIcon
              onClick={(event) => handleVCardClick(CONCESSAO, event)}
              icon={faAddressCard}
              color=''
              className='ms-2 clickable'
            />
          </Card.Header>
          <Card.Body style={{backgroundColor: '#fdefeb'}}>
            <Table hover responsive>
              <thead>
                <tr style={{ color: '#77321c' }}>
                  <th>Nome</th>
                  <th>Departamento</th>
                  <th>Função</th>
                  <th>Email</th>
                  <th className='text-end'>Contacto</th>
                </tr>
              </thead>
              <tbody>
                {users[CONCESSAO].map((user, key) => (
                  <tr key={key} className='clickable' onClick={() => handleUserRowOnClick(user.USERNAME)}>
                    <td>{user.NAME}</td>
                    <td>{user.DEPARTAMENTO}</td>
                    <td>{user.FUNCAO}</td>
                    <td>{user.EMAIL}</td>
                    <td className='text-end'>
                      {user.CONTACTO}
                      <FontAwesomeIcon
                        onClick={(event) => handleVCardClick(user, event)}
                        icon={faAddressCard}
                        color='#ed6337'
                        className='ms-2 clickable'
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      ))}
    </Fragment>
  )
}

export default UserTable