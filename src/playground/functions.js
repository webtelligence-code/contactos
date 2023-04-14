const getUsers = () => {
  axios.get('http://localhost:80/contactos/api/index.php?action=get_users')
    .then((response) => {
      const groupedUsers = response.data.reduce((acc, user) => {
        const concession = user.concessao;
        if (!acc[concession]) {
          acc[concession] = [];
        }
        acc[concession].push(user);
        return acc;
      }, {});
      setUsers(groupedUsers);
    })
    .catch((error) => {
      console.error('Error:', error);
    })
}


  const UserTable = ({ users }) => {

  const handleVCardClick = (user) => {
    console.log('You clicked to generate a VCard for user ->', user)
  }

  return (
    <>
      {users && Object.keys(users).map((concessao, key) => (
        <div key={key}>
          <h2>{concessao}</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Departamento</th>
                <th>Função</th>
                <th>Email</th>
                <th>Contacto</th>
              </tr>
            </thead>
            <tbody>
              {users[concessao].map((user, key) => (
                <tr key={key}>
                  <td>{user.nameDisplay}</td>
                  <td>{user.departamento}</td>
                  <td>{user.funcao}</td>
                  <td>{user.emailEmpresa}</td>
                  <td className='text-end'>
                    {user.contacto}
                    <FontAwesomeIcon
                      onClick={() => handleVCardClick(user)}
                      icon={faAddressCard}
                      color='#ed6337'
                      className='ms-2 clickable'
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}
    </>
  )
}

  