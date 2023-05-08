import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import User from '../components/profile/User';
import { Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowLeftLong, faHandPointLeft, faHome } from '@fortawesome/free-solid-svg-icons';

const ProfilePage = ({ baseUrl, title, API_BASE_URL }) => {
  // Props from browser router
  const { username } = useParams();
  const navigate = useNavigate();

  // States
  const [user, setUser] = useState({});
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredBack, setHoveredBack] = useState(false);
  const [hoveredHome, setHoveredHome] = useState(false);

  // This use effect will scroll to top every time user refreshes the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  // This function will fetch user data with axios request
  const getUser = useCallback(async () => {
    axios.get(API_BASE_URL, {
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
  }, [API_BASE_URL, username])

  // This useEffect will fetch the user by id passed in the url
  useEffect(() => {
    document.title = title;
    getUser();
  }, [title, getUser]);

  // This function will fetch team data with axios request
  const getTeam = useCallback(async () => {
    axios.get(API_BASE_URL, {
      params: {
        action: 'get_team',
        username,
        chefia: user.CHEFIA,
        chefe: user.CHEFE,
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
  }, [API_BASE_URL, username, user])

  // This function will fetch team by cidade and company
  useEffect(() => {
    getTeam();
  }, [getTeam])


  return (
    <Container>
      <Button
        variant='danger'
        style={{backgroundColor: '#c62828'}}
        size='sm'
        className='my-2'
        onClick={() => window.history.back()}
        onMouseEnter={() => setHoveredBack(true)}
        onMouseLeave={() => setHoveredBack(false)}
      >
        <FontAwesomeIcon
          icon={faArrowLeftLong}
          color='white'
          fade={hoveredBack}
        />
      </Button>
      <Button
        variant='success'
        style={{backgroundColor: '#388e3c'}}
        size='sm'
        className='my-2 ms-2'
        onClick={() => navigate('/contactos')}
        onMouseEnter={() => setHoveredHome(true)}
        onMouseLeave={() => setHoveredHome(false)}
      >
        <FontAwesomeIcon
          icon={faHome}
          color='white'
          fade={hoveredHome}
        />
      </Button>
      <User API_BASE_URL={API_BASE_URL} baseUrl={baseUrl} user={user} team={team} loading={loading} />
    </Container>
  )
}

export default ProfilePage