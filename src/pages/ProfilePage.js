import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import User from '../components/User';
import Team from '../components/Team';
import { Container } from 'react-bootstrap';

const ProfilePage = ({ title }) => {
  const { userId } = useParams();
  const [user, setUser] = useState({})

  // This useEffect will fetch the user by id passed in the url
  useEffect(() => {
    document.title = title;
    const getUser = () => {
      axios.get('http://localhost:80/contactos/api/index.php', {
        params: {
          action: 'get_user',
          userId
        }
      })
        .then((response) => {
          document.title = `Perfil de ${response.data.nameDisplay}`;
          console.log(response.data)
          setUser(response.data);
        })
        .catch((error) => {
          console.error('Error while trying to fetch user from API:', error)
        })
    }

    getUser();
  }, [userId, title])


  return (
    <Container>
      <User user={user} />
      <Team />
    </Container>
  )
}

export default ProfilePage