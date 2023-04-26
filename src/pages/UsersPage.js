import axios from 'axios';
import React, { useEffect, useState } from 'react'
import UserTable from '../components/UsersTable';
import { Container } from 'react-bootstrap';
import LoadingBars from '../components/utility/LoadingBars';

const UsersPage = ({ title , API_BASE_URL }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // This useEffect will run on page reload
  useEffect(() => {
    document.title = title

    const getUsers = () => {
      axios.get(API_BASE_URL, {
        params: {
          action: 'get_users',
        }
      })
        .then((response) => {
          console.log(response)
          const groupedUsers = response.data.reduce((acc, user) => {
            const concession = user.CONCESSAO;
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
  }, [API_BASE_URL, title]);

  return (
    <Container>
      {loading && (<LoadingBars classes='mt-5' />)}
      <UserTable API_BASE_URL={API_BASE_URL} users={users} />
    </Container>
  );
}

export default UsersPage