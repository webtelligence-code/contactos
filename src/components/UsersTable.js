import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment, useState } from 'react'
import { Card, Table } from 'react-bootstrap'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

/**
 * This Component will render a table for each user and it will group them by concession
 * @param {props} param0 
 * @returns 
 */
const UserTable = ({ users, username, API_BASE_URL }) => {
  const navigate = useNavigate();
  const [hoveredConcession, setHoveredConcession] = useState(null);
  const [hoveredUser, setHoveredUser] = useState({})

  /**
   * This function will handle VCard generation for the user selected or the concession
   * It has a condition to verify if the data passed is an object pointing to the user or a string referencing the concession group
   * Maybe it will make an API call to index.php that will generate a VCard and return to here via callback
   * @param {object} user 
   */
  const handleVCardClick = async (data, event) => {
    event.stopPropagation(); // Prevent the click propagation for user row
    const formData = new FormData();

    formData.append('action', 'generate_vcard');

    if (typeof data === 'object') {
      formData.append('user', JSON.stringify(data))
    } else {
      formData.append('concessao', data);
    }

    try {
      const response = await axios.post(API_BASE_URL, formData, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
      const a = document.createElement('a');
      a.href = url;
      a.download = typeof data === 'object'
        ? `${data.USERNAME}.vcf`
        : `vcards_concessao_${data}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (error) {
      console.error('Error fetching VCard:', error);
    }
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
            style={{ backgroundColor: '#ed6337', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}
            as='h5'
          >
            {CONCESSAO}
            <FontAwesomeIcon
              onClick={(event) => handleVCardClick(CONCESSAO, event)}
              onMouseEnter={() => setHoveredConcession(CONCESSAO)}
              onMouseLeave={() => setHoveredConcession(null)}
              icon={faAddressCard}
              color=''
              className='ms-2 clickable'
              shake={hoveredConcession === CONCESSAO ? true : false}
            />
          </Card.Header>
          <Card.Body style={{ backgroundColor: '#fdefeb' }}>
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
                  <tr key={key} className='clickable' onClick={() => navigate(`/contactos/profile/${user.USERNAME}`)}>
                    <td>{user.NAME}</td>
                    <td>{user.DEPARTAMENTO}</td>
                    <td>{user.FUNCAO}</td>
                    <td>{user.EMAIL}</td>
                    <td className='text-end'>
                      {user.CONTACTO}
                      <FontAwesomeIcon
                        onClick={(event) => handleVCardClick(user, event)}
                        onMouseEnter={() => setHoveredUser(user)}
                        onMouseLeave={() => setHoveredUser({})}
                        shake={hoveredUser === user ? true : false}
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