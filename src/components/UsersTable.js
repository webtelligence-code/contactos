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

  const handleUserRowOnClick = (userId) => {
    navigate(`/profile/${userId}`);
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
      {Object.keys(users).map((concessao, key) => (
        <Card
          style={{
            borderColor: '#77321c',
            borderRadius: 20,
            borderTopWidth: 0,
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
            backgroundColor: '#fdefeb'
          }}
          className='my-3'
          key={key}
        >
          <Card.Header
            className='text-light'
            style={{
              backgroundColor: '#ed6337',
              borderRadius: 20
            }}
            as='h5'
          >
            {concessao}
            <FontAwesomeIcon
              onClick={(event) => handleVCardClick(concessao, event)}
              icon={faAddressCard}
              color=''
              className='ms-2 clickable'
            />
          </Card.Header>
          <Card.Body
            style={{
              backgroundColor: '#fdefeb',
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20
            }}
          >
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
                {users[concessao].map((user, key) => (
                  <tr key={key} className='clickable' onClick={() => handleUserRowOnClick(user.id)}>
                    <td>{user.nameDisplay}</td>
                    <td>{user.departamento}</td>
                    <td>{user.funcao}</td>
                    <td>{user.emailEmpresa}</td>
                    <td className='text-end'>
                      {user.contacto}
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