import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import User from '../components/profile/User';
import { Container } from 'react-bootstrap';

const ProfilePage = ({ baseUrl, title, API_BASE_URL }) => {
  // Props from browser router
  const { username } = useParams();

  // States
  const [user, setUser] = useState({});
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

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
        cidade: user.CIDADE,
        empresa: user.EMPRESA
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

  // THis function will fetch team by cidade and company
  useEffect(() => {
    getTeam();
  }, [getTeam])

  return (
    <Container>
      <User API_BASE_URL={API_BASE_URL} baseUrl={baseUrl} user={user} team={team} loading={loading} />
    </Container>
  )
}

export default ProfilePage