import axios from 'axios';
import React, { useEffect, useState } from 'react'
import UserTable from '../components/UsersTable';
import { Container } from 'react-bootstrap';
import LoadingBars from '../components/LoadingBars';

const UsersPage = ({ title }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // This useEffect will run on page reload
  useEffect(() => {
    document.title = title

    const getUsers = () => {
      axios.get('http://localhost:80/contactos/api/index.php', {
        params: {
          action: 'get_users',
        }
      })
        .then((response) => {
          console.log(response)
          const groupedUsers = response.data.reduce((acc, user) => {
            const concession = user.concessao;
            if (!acc[concession]) {
              acc[concession] = [];
            }
            acc[concession].push(user);
            return acc;
          }, {});
          console.log('Grouped users:', groupedUsers)
          setUsers(groupedUsers);
          setLoading(false)
        })
        .catch((error) => {
          console.error('Error:', error);
        })
    }

    getUsers();
  }, [title]);

  return (
    <Container>
      {loading && (<LoadingBars classes='mt-5' />)}
      <UserTable users={users} />
    </Container>
  );
}

export default UsersPage