import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment, useState } from 'react'
import { Button, Card, Table } from 'react-bootstrap'
import { faAddressCard, faDownload } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

/**
 * This Component will render a table for each user and it will group them by concession
 * @param {props} param0 
 * @returns 
 */
const UserTable = ({ users, searchInput, API_BASE_URL }) => {
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

  const removeDiacritics = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  const filterUsers = (user) => {
    const searchTerms = removeDiacritics(searchInput).toLowerCase().split(' ');

    // Add all the fields you want to search by in this array
    const userAttributes = [
      user.NAME,
      user.DEPARTAMENTO,
      user.FUNCAO,
      user.EMAIL,
      user.CONTACTO,
    ];

    return searchTerms.every((term) =>
      userAttributes.some((attribute) =>
        attribute && removeDiacritics(attribute.toLowerCase()).includes(term)
      )
    );
  }

  const filteredUsers = (concession) => users[concession].filter(filterUsers);

  return (
    <Fragment>
      {Object.keys(users).map((CONCESSAO, key) => {
        const filteredUSersInGroup = filteredUsers(CONCESSAO);
        if (filteredUSersInGroup.length === 0) {
          return null
        }

        return (
          <Card
            className='my-3'
            key={key}
          >
            <Card.Header
              style={{
                backgroundColor: 'white',
                color: '#77321c',
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}
              as='h5'
            >
              {CONCESSAO}
              <Button
                className='ms-2'
                size='sm'
                variant='outline-dark'
                onClick={(event) => handleVCardClick(CONCESSAO, event)}
                onMouseEnter={() => setHoveredConcession(CONCESSAO)}
                onMouseLeave={() => setHoveredConcession(null)}
              >
                <FontAwesomeIcon
                  icon={hoveredConcession === CONCESSAO ? faDownload : faAddressCard}
                  color='#ed6337'
                  className='me-2 clickable'
                  bounce={hoveredConcession === CONCESSAO ? true : false}
                />
                {hoveredConcession === CONCESSAO ? 'Download Zip' : 'VCards'}
              </Button>
            </Card.Header>
            <Card.Body>
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
                  {filteredUsers(CONCESSAO).map((user, key) => (
                    <tr key={key} className='clickable' onClick={() => navigate(`/contactos/profile/${user.USERNAME}`)}>
                      <td className='align-middle'>{user.NAME}</td>
                      <td className='align-middle'>{user.DEPARTAMENTO}</td>
                      <td className='align-middle'>{user.FUNCAO}</td>
                      <td className='align-middle'>{user.EMAIL}</td>
                      <td className='text-end'>
                        {user.CONTACTO}
                        <Button
                          className='ms-2'
                          size='sm'
                          variant='outline-dark'
                          onClick={(event) => handleVCardClick(user, event)}
                          onMouseEnter={() => setHoveredUser(user)}
                          onMouseLeave={() => setHoveredUser({})}
                          style={{ width: 125 }}
                        >
                          <FontAwesomeIcon
                            bounce={hoveredUser === user ? true : false}
                            icon={hoveredUser === user ? faDownload : faAddressCard}
                            color='#ed6337'
                            className='me-2 clickable'
                          />
                          {hoveredUser === user ? 'Download' : 'VCard'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )
      })}
    </Fragment>
  )
}

export default UserTable