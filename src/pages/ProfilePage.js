import axios from 'axios'
import React, { Fragment, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ProfilePage = ({ title }) => {
  const { userId } = useParams();

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
          document.title = `Perfil de ${response.data.nameDisplay}`
          console.log(response.data)
        })
        .catch((error) => {
          console.error('Error while trying to fetch user from API:', error)
        })
    }

    getUser();
  }, [userId, title])



  return (
    <Fragment>
    </Fragment>
  )
}

export default ProfilePage