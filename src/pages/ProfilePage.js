import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import User from '../components/profile/User';
import { Container } from 'react-bootstrap';

const ProfilePage = ({ title }) => {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  // This use effect will scroll to top every time user refreshes the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  // This useEffect will fetch the user by id passed in the url
  useEffect(() => {
    document.title = title;
    const getUser = () => {
      axios.get('http://localhost:80/contactos/api/index.php', {
        params: {
          action: 'get_user',
          username
        }
      })
        .then((response) => {
          document.title = `Perfil de ${response.data.NAME}`;
          console.log(response.data)
          setUser(response.data);
        })
        .catch((error) => {
          console.error('Error while trying to fetch user from API:', error)
        })
    }

    getUser();
  }, [username, title])

  useEffect(() => {
    const getTeam = () => {
      axios.get('http://localhost:80/contactos/api/index.php', {
        params: {
          action: 'get_team',
          username,
          concessao: user.CONCESSAO,
        }
      })
        .then((response) => {
          console.log(response.data)
          setTeam(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error while trying to fetch Team from API:', error)
        })
    }

    getTeam();
  }, [user, username])

  return (
    <Container>
      <User user={user} team={team} loading={loading} />
    </Container>
  )
}

export default ProfilePage