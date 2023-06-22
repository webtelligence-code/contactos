import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment, useState } from 'react'
import { Button, Card, Table } from 'react-bootstrap'
import Overlay from 'react-bootstrap/Overlay'
import Tooltip from 'react-bootstrap/Tooltip'
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
  const [concessionTarget] = useState(new Map());
  const [userTarget] = useState(new Map());
  const [hoveredConcession, setHoveredConcession] = useState(null);
  const [hoveredUser, setHoveredUser] = useState({})
  const [vcardLoadUser, setVCardLoadUser] = useState(null)
  const [vcardLoadConcession, setVCardLoadConcession] = useState(null)

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
      setVCardLoadUser(data.username);
      formData.append('user', JSON.stringify(data))
    } else {
      setVCardLoadConcession(data);
      formData.append('concessao', data);
    }

    try {
      const response = await axios.post(API_BASE_URL, formData, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
      const a = document.createElement('a');
      a.href = url;
      a.download = typeof data === 'object'
        ? `${data.username}.vcf`
        : `vcards_concessao_${data}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => {
        URL.revokeObjectURL(url);
        setVCardLoadUser(null);
        setVCardLoadConcession(null);
      }, 100);
      setVCardLoadUser(false);
      setVCardLoadConcession(false);
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
      user.nameDisplay,
      user.empresa,
      user.departamento,
      user.funcao,
      user.emailEmpresa,
      user.contacto,
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
      {Object.keys(users).map((concessao, key) => {
        const filteredUsersInGroup = filteredUsers(concessao);
        if (filteredUsersInGroup.length === 0) {
          return null
        }

        if (!concessionTarget.has(concessao)) {
          concessionTarget.set(concessao, React.createRef());
        }

        return (
          <Card
            className='mb-3'
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
              {concessao}
              <Button
                disabled={vcardLoadConcession === concessao ? true : false}
                className='ms-2'
                size='sm'
                variant='outline-dark'
                onClick={(event) => handleVCardClick(concessao, event)}
                onMouseEnter={() => setHoveredConcession(concessao)}
                onMouseLeave={() => setHoveredConcession(null)}
                ref={concessionTarget.get(concessao)}
              >
                <FontAwesomeIcon
                  icon={hoveredConcession === concessao ? faDownload : faAddressCard}
                  color='#ed6337'
                  bounce={hoveredConcession === concessao}
                />
                {vcardLoadConcession === concessao ? ' A transferir' : null}
              </Button>
              <Overlay target={concessionTarget.get(concessao)?.current} show={hoveredConcession === concessao} placement='right'>
                <Tooltip id='overlay-ZIP'>
                  Clicar para transferir ZIP de VCards da Concessão {concessao}.
                </Tooltip>
              </Overlay>
            </Card.Header>
            <Card.Body>
              <Table hover responsive>
                <thead>
                  <tr style={{ color: '#77321c', borderColor: '#77321c' }}>
                    <th>Nome</th>
                    <th>Empresa</th>
                    <th>Departamento</th>
                    <th>Função</th>
                    <th>Email</th>
                    <th className='text-end'>Contacto</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers(concessao).map((user, key) => {
                    if (!userTarget.has(user.username)) {
                      userTarget.set(user.username, React.createRef())
                    }

                    return (
                      <tr style={{ color: '#77321c', fontSize: 15 }} key={key} className='clickable' onClick={() => navigate(`/GAP/NovasPlataformas/contactos/profile/${user.username}`)}>
                        <td className='align-middle'>{user.nameDisplay}</td>
                        <td className='align-middle'>{user.empresa}</td>
                        <td className='align-middle'>{user.departamento}</td>
                        <td className='align-middle'>{user.funcao}</td>
                        <td className='align-middle'>{user.emailEmpresa}</td>
                        <td className='text-end'>
                          {user.contacto}
                          <Button
                            disabled={vcardLoadUser === user.USERNAME ? true : false}
                            className='ms-2'
                            size='sm'
                            variant='outline-dark'
                            onClick={(event) => handleVCardClick(user, event)}
                            onMouseEnter={() => setHoveredUser(user)}
                            onMouseLeave={() => setHoveredUser({})}
                            ref={userTarget.get(user.username)}
                          >
                            <FontAwesomeIcon
                              bounce={hoveredUser === user ? true : false}
                              icon={hoveredUser === user ? faDownload : faAddressCard}
                              color='#ed6337'
                            />
                            {vcardLoadUser === user.username ? ' A transferir' : null}
                          </Button>
                          <Overlay target={userTarget.get(user.username)?.current} show={hoveredUser === user} placement='left'>
                              <Tooltip id='overlay-USER'>
                                Clicar para transferir VCard do utilizador {user.username}.
                              </Tooltip>
                          </Overlay>
                        </td>
                      </tr>
                    )
                  })}
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