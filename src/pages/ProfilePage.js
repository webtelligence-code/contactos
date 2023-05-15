import axios from 'axios'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import User from '../components/profile/User';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faShirt, faShoePrints, faUserTie, faVest } from '@fortawesome/free-solid-svg-icons';
import UserButtons from '../components/profile/UserButtons';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import ClothingSizesDropdown from '../components/utility/ClothingSizesDropdown';
import ModalPasswordUpdate from '../components/profile/ModalPasswordUpdate';

const ProfilePage = ({ baseUrl, title, API_BASE_URL }) => {
  // Props from browser router
  const { username } = useParams();

  // Initialize 
  const MySwal = withReactContent(Swal);

  // States
  const [user, setUser] = useState({});
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sessionUsername, setSessionUsername] = useState('');
  const [personalEmail, setPersonalEmail] = useState();
  const [pants, setPants] = useState();
  const [shirt, setShirt] = useState();
  const [jacket, setJacket] = useState();
  const [polo, setPolo] = useState();
  const [pullover, setPullover] = useState();
  const [shoe, setShoe] = useState();
  const [sweatshirt, setSweatshirt] = useState();
  const [tshirt, setTshirt] = useState();
  const [APIPost, setAPIPost] = useState(false);
  const [password, setPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordFields, setConfirmPasswordFields] = useState(false);

  useEffect(() => {
    const getSessionUsername = () => {
      axios.get(API_BASE_URL, {
        params: {
          action: 'get_username',
        }
      })
        .then((response) => {
          setSessionUsername(response.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        })
    }

    getSessionUsername();
  }, [API_BASE_URL]);

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

  // This useEffect will set the states for the user
  useEffect(() => {
    if (user) {
      setPersonalEmail(user.EMAIL_PESSOAL || '')
      setPassword(user.PASSWORD || '')
      setPants(user.nCalcas || '');
      setShirt(user.nCamisa || '');
      setJacket(user.nCasaco || '');
      setPolo(user.nPolo || '');
      setPullover(user.nPullover || '');
      setShoe(user.nSapato || '');
      setSweatshirt(user.nSweatshirt || '');
      setTshirt(user.nTshirt || '');
    }
  }, [user])

  /**
   * This function will display a modal based on the boolean state parameter
   * @param {boolean} isEdit 
   */
  const fireModal = (isEdit) => {
    setPersonalEmail(user.EMAIL_PESSOAL || '')
    setPants(user.nCalcas || '');
    setShirt(user.nCamisa || '');
    setJacket(user.nCasaco || '');
    setPolo(user.nPolo || '');
    setPullover(user.nPullover || '');
    setShoe(user.nSapato || '');
    setSweatshirt(user.nSweatshirt || '');
    setTshirt(user.nTshirt || '');

    MySwal.fire({
      title: <div style={{ color: '#ed6337' }}>{isEdit ? 'Editar Perfil' : 'Mais informações'}</div>,
      html: isEdit ? generateFormModalBody() : generateInfoModalBody(),
      showCancelButton: isEdit,
      showConfirmButton: true,
      confirmButtonColor: isEdit ? '#388e3c' : '#ed6337',
      cancelButtonColor: '#c62828',
      confirmButtonText: isEdit ? 'Confirmar' : 'Ok',
      cancelButtonText: 'Cancelar',
      width: !isEdit && 275
    }).then((result) => {
      if (result.isConfirmed) {
        if (isEdit) {
          setAPIPost(true);
        }
      }
    });
  }

  const sendDataToApi = useCallback(async () => {
    const action = 'update_user';
    const formData = new FormData();

    formData.append('action', action);
    formData.append('username', username);
    personalEmail && formData.append('personalEmail', personalEmail);
    pants && formData.append('pants', pants);
    shirt && formData.append('shirt', shirt);
    jacket && formData.append('jacket', jacket);
    polo && formData.append('polo', polo);
    pullover && formData.append('pullover', pullover);
    shoe && formData.append('shoe', shoe);
    sweatshirt && formData.append('sweatshirt', sweatshirt);
    tshirt && formData.append('tshirt', tshirt);

    axios.post(API_BASE_URL, formData).then((response) => {
      MySwal.fire({
        title: response.data.title,
        text: response.data.message,
        icon: response.data.status,
        confirmButtonColor: '#ed6337'
      }).then(() => {
        setAPIPost(false);
        window.location.reload();
      })
    }).catch((error) => {
      console.error('Error while trying to post request to API:', error)
    })

  }, [API_BASE_URL, MySwal, jacket, pants, personalEmail, polo, pullover, shirt, shoe, sweatshirt, tshirt, username])

  useEffect(() => {
    if (APIPost) sendDataToApi()
  }, [APIPost, sendDataToApi])

  // Function to return form Modal body HTML
  const generateFormModalBody = () => {
    return (
      <Fragment>
        <div className='align-items-center my-1 modalInputRow'>
          <FontAwesomeIcon icon={faEnvelope} color='#ed6337' width={30} />
          <input
            placeholder='Email pessoal'
            defaultValue={personalEmail}
            onChange={(e) => setPersonalEmail(e.target.value)}
            className='ms-2 dropdownInput'
          />
        </div>
        <div className='align-items-center my-1 modalInputRow'>
          <FontAwesomeIcon icon={faShirt} color='#ed6337' width={30} />
          <ClothingSizesDropdown
            defaultLabel='Selecione nº calças'
            value={pants}
            setState={setPants}
            isNumber
          />
        </div>
        <div className='align-items-center my-1 modalInputRow'>
          <FontAwesomeIcon icon={faUserTie} color='#ed6337' width={30} />
          <ClothingSizesDropdown
            defaultLabel='Selecione nº camisa'
            value={shirt}
            setState={setShirt}
            isLetter
          />
        </div>
        <div className='align-items-center my-1 modalInputRow'>
          <FontAwesomeIcon icon={faVest} color='#ed6337' width={30} />
          <ClothingSizesDropdown
            defaultLabel='Selecione nº casaco'
            value={jacket}
            setState={setJacket}
            isLetter
          />
        </div>
        <div className='align-items-center my-1 modalInputRow'>
          <FontAwesomeIcon icon={faShirt} color='#ed6337' width={30} />
          <ClothingSizesDropdown
            defaultLabel='Selecione nº pólo'
            value={polo}
            setState={setPolo}
            isLetter
          />
        </div>
        <div className='align-items-center my-1 modalInputRow'>
          <FontAwesomeIcon icon={faVest} color='#ed6337' width={30} />
          <ClothingSizesDropdown
            defaultLabel='Selecione nº pullover'
            value={pullover}
            setState={setPullover}
            isLetter
          />
        </div>
        <div className='align-items-center my-1 modalInputRow'>
          <FontAwesomeIcon icon={faShoePrints} color='#ed6337' width={30} />
          <ClothingSizesDropdown
            defaultLabel='Selecione nº calçado'
            value={shoe}
            setState={setShoe}
            isFootwear
          />
        </div>
        <div className='align-items-center my-1 modalInputRow'>
          <FontAwesomeIcon icon={faShirt} color='#ed6337' width={30} />
          <ClothingSizesDropdown
            defaultLabel='Selecione nº sweatshirt'
            value={sweatshirt}
            setState={setSweatshirt}
            isLetter
          />
        </div>
        <div className='align-items-center my-1 modalInputRow'>
          <FontAwesomeIcon icon={faShirt} color='#ed6337' width={30} />
          <ClothingSizesDropdown
            defaultLabel='Selecione nº tshirt'
            value={tshirt}
            setState={setTshirt}
            isLetter
          />
        </div>
      </Fragment>
    )
  }
  // Function to return modal info HTML
  const generateInfoModalBody = () => {
    // Custom row style (could not import via .css)
    const rowStyle = {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    }

    return (
      <Fragment>
        {user.nCalcas && (
          <div className='align-items-center my-1' style={rowStyle}>
            <FontAwesomeIcon icon={faShirt} color='#ed6337' width={30} />
            <div>{user.nCalcas}</div>
          </div>
        )}
        {user.nCamisa && (
          <div className='align-items-center my-1' style={rowStyle}>
            <FontAwesomeIcon icon={faUserTie} color='#ed6337' width={30} />
            <div>{user.nCamisa}</div>
          </div>
        )}
        {user.nCasaco && (
          <div className='align-items-center my-1' style={rowStyle}>
            <FontAwesomeIcon icon={faVest} color='#ed6337' width={30} />
            <div>{user.nCasaco}</div>
          </div>
        )}
        {user.nPolo && (
          <div className='align-items-center my-1' style={rowStyle}>
            <FontAwesomeIcon icon={faShirt} color='#ed6337' width={30} />
            <div>{user.nPolo}</div>
          </div>
        )}
        {user.nPullover && (
          <div className='align-items-center my-1' style={rowStyle}>
            <FontAwesomeIcon icon={faVest} color='#ed6337' width={30} />
            <div>{user.nPullover}</div>
          </div>
        )}
        {user.nSapato && (
          <div className='align-items-center my-1' style={rowStyle}>
            <FontAwesomeIcon icon={faShoePrints} color='#ed6337' width={30} />
            <div>{user.nSapato}</div>
          </div>
        )}
        {user.nSweatshirt && (
          <div className='align-items-center my-1' style={rowStyle}>
            <FontAwesomeIcon icon={faShirt} color='#ed6337' width={30} />
            <div>{user.nSweatshirt}</div>
          </div>
        )}
        {user.nTshirt && (
          <div className='align-items-center my-1' style={rowStyle}>
            <FontAwesomeIcon icon={faShirt} color='#ed6337' width={30} />
            <div>{user.nTshirt}</div>
          </div>
        )}
      </Fragment>
    )
  }

  const firePasswordModal = useCallback(() => {
    setTimeout(() => {
      MySwal.fire({
        title: <div style={{ color: '#ed6337' }}>Alterar Password</div>,
        html: <Fragment>
                <ModalPasswordUpdate
                  state={oldPassword}
                  setState={setOldPassword}
                  placeholder='Insira password antiga'
                />
                <ModalPasswordUpdate
                  state={newPassword}
                  setState={setNewPassword}
                  placeholder='Insira nova password'
                />
                <ModalPasswordUpdate
                  state={confirmPassword}
                  setState={setConfirmPassword}
                  placeholder='Confirmar nova password'
                />
              </Fragment>,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#388e3c',
        cancelButtonColor: '#c62828',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Atualizar'
      }).then((result) => {
        if (result.isConfirmed) {
          setConfirmPasswordFields(true)
        }
      })
    }, 0)
  }, [MySwal, confirmPassword, newPassword, oldPassword]);

  const updatePassword =  useCallback(() => {
    const formData = new FormData();
    formData.append('action', 'update_password');
    formData.append('password', newPassword);
    formData.append('username', user.USERNAME);

    axios.post(API_BASE_URL, formData).then((response) => {
      MySwal.fire({
        icon: response.data.status,
        title: response.data.title,
        html: response.data.message,
        showConfirmButton: true,
        confirmButtonColor: '#388e3c',
        confirmButtonText: 'Ok'
      }).then(() => window.location.reload()) 
    })
  }, [API_BASE_URL, MySwal, newPassword, user.USERNAME]);

  const evaluatePasswordFields = useCallback(() => {
    setConfirmPasswordFields(false)
    let textBody;
    let textTitle;

    if (oldPassword.length === 0 && newPassword.length === 0 && confirmPassword.length === 0) {
      return;
    } else if (password !== oldPassword) {
      textBody = 'A password que inseriu não corresponde à password antiga.';
      textTitle = <div style={{ color: '#c62828' }}>Não corresponde</div>;
    } else if (newPassword === password) {
      textBody = 'A sua password nova não pode ser igual a uma password que já tenha inserido na sua conta.'
      textTitle = <div style={{ color: '#c62828' }}>Nova password</div>
    } else if (newPassword !== confirmPassword) {
      textBody = 'Passwords não coincidem uma com a outra, confirme novamente para proceder.';
      textTitle = <div style={{ color: '#c62828' }}>Confirme password novamente</div>
    } else if (oldPassword.length > 0 && (newPassword.length === 0 || confirmPassword.length === 0)) {
      textBody = 'Por favor, insira nova password e confirme a password.';
      textTitle = <div style={{ color: '#c62828' }}>Campos em falta</div>
    } else if (oldPassword.length > 0 && confirmPassword.length > 0 && password !== newPassword && newPassword === confirmPassword) {
      return updatePassword();
    } else {
      textBody = 'Ocorreu um erro inesperado. Tente novamente e se o error persistir, contacte o centro informático.';
      textTitle = <div style={{ color: '#c62828' }}>Erro inesperado.</div>;
    }

    setTimeout(() => {
      MySwal.fire({
        icon: 'error',
        title: textTitle,
        html: textBody,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#388e3c',
        cancelButtonColor: '#c62828',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Voltar a tentar'
      }).then((result) => {
        if (result.isConfirmed) firePasswordModal();
        if (result.isDismissed) clearPasswordStates();
      })
    }, 0)
  }, [MySwal, confirmPassword, firePasswordModal, newPassword, oldPassword, password, updatePassword]);

  const clearPasswordStates = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('')
  }

  useEffect(() => {
    if (confirmPasswordFields) evaluatePasswordFields()
  }, [confirmPasswordFields, evaluatePasswordFields])

  const showUserManual = () => {
    window.open(process.env.PUBLIC_URL + '/assets/manual/Manual-Portal-Contactos.pdf');
  }

  return (
    <Container>
      <UserButtons fireModal={fireModal} firePasswordModal={firePasswordModal} sessionUsername={sessionUsername} username={username} showUserManual={showUserManual} />
      <User API_BASE_URL={API_BASE_URL} baseUrl={baseUrl} user={user} team={team} loading={loading} sessionUsername={sessionUsername} />
    </Container>
  )
}

export default ProfilePage