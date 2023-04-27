import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { Card, Image } from 'react-bootstrap'
import Team from './Team';
import LoadingBars from '../utility/LoadingBars';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import ClothingSizesDropdown from '../utility/ClothingSizesDropdown';
import axios from 'axios';
import UserButtons from './UserButtons';
import UserDetails from './UserDetails';
import UserCardHeader from './UserCardHeader';
import { useNavigate } from 'react-router-dom';

const User = ({ API_BASE_URL, baseUrl, user, team, loading, getUser }) => {
  // Initialize 
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  // States
  const [username, setUsername] = useState();
  const [personalEmail, setPersonalEmail] = useState();
  const [phone, setPhone] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [pants, setPants] = useState();
  const [shirt, setShirt] = useState();
  const [jacket, setJacket] = useState();
  const [polo, setPolo] = useState();
  const [pullover, setPullover] = useState();
  const [shoe, setShoe] = useState();
  const [sweatshirt, setSweatshirt] = useState();
  const [tshirt, setTshirt] = useState();
  const [APIPost, setAPIPost] = useState(false);
  const [sessionUsername, setSessionUsername] = useState('');

  // This useEffect will set the states for the user
  useEffect(() => {
    if (user) {
      setUsername(user.USERNAME || '');
      setPersonalEmail(user.EMAIL_PESSOAL || '')
      setPhone(user.CONTACTO || '');
      setDateOfBirth(user.DATA_NASCIMENTO || '');
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

  useEffect(() => {
    const getSessionUsername = () => {
      axios.get(API_BASE_URL, {
        params: {
          action: 'get_username',
        }
      })
        .then((response) => {
          console.log('Session username:', response.data)
          setSessionUsername(response.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        })
    }

    getSessionUsername();
  }, [API_BASE_URL]);

  /**
   * This function will display a modal based on the boolean state parameter
   * @param {boolean} isEdit 
   */
  const fireModal = (isEdit) => {
    setPersonalEmail(user.EMAIL_PESSOAL || '')
    setPhone(user.CONTACTO || '');
    setDateOfBirth(user.DATA_NASCIMENTO || '');
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
      icon: isEdit ? 'warning' : 'info',
      showCancelButton: isEdit,
      showConfirmButton: true,
      confirmButtonColor: isEdit ? '#32b300' : '#ed6337',
      cancelButtonColor: 'red',
      confirmButtonText: isEdit ? 'Confirmar' : 'Ok',
      cancelButtonText: 'Cancelar'
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
    phone && formData.append('phone', phone);
    dateOfBirth && formData.append('dateOfBirth', dateOfBirth);
    pants && formData.append('pants', pants);
    shirt && formData.append('shirt', shirt);
    jacket && formData.append('jacket', jacket);
    polo && formData.append('polo', polo);
    pullover && formData.append('pullover', pullover);
    shoe && formData.append('shoe', shoe);
    sweatshirt && formData.append('sweatshirt', sweatshirt);
    tshirt && formData.append('tshirt', tshirt);

    console.log('Form Data =>', formData)

    axios.post(API_BASE_URL, formData).then((response) => {
      console.log(`Response from post request (${action})`, response)
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

  }, [API_BASE_URL, MySwal, dateOfBirth, jacket, pants, personalEmail, phone, polo, pullover, shirt, shoe, sweatshirt, tshirt, username])

  useEffect(() => {
    if (APIPost) sendDataToApi()
  }, [APIPost, sendDataToApi])

  // Function to return form Modal body HTML
  const generateFormModalBody = () => {
    return (
      <Fragment>
        <div className='align-items-center my-1 modalInputRow'>
          <Image className='me-2' src={`${baseUrl}/assets/img/clothes/message.png`} alt='email' width={35} />
          <input
            placeholder='Email pessoal'
            defaultValue={personalEmail}
            onChange={(e) => setPersonalEmail(e.target.value)}
          />
        </div>
        <div className='align-items-center my-1 modalInputRow'>
          <Image className='me-2' src={`${baseUrl}/assets/img/clothes/phone.png`} alt='phone' width={35} />
          <input
            placeholder='Número de telemóvel'
            defaultValue={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className='align-items-center my-1 modalInputRow'>
          <Image className='me-2' src={`${baseUrl}/assets/img/clothes/cake.png`} alt='cake' width={35} />
          <input
            type='date'
            name='doj'
            defaultValue={dateOfBirth}
            placeholder='Data de Nascimento'
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        <div className='align-items-center my-1 modalInputRow'>
          <Image className='me-2' src={`${baseUrl}/assets/img/clothes/trousers.png`} alt='trousers' width={35} />
          <ClothingSizesDropdown
            defaultLabel='Selecione nº calças'
            value={pants}
            setState={setPants}
            isNumber
          />
        </div>
        <div className='align-items-center my-1 modalInputRow'>
          <Image className='me-2' src={`${baseUrl}/assets/img/clothes/shirt.png`} alt='shirt' width={35} />
          <ClothingSizesDropdown
            defaultLabel='Selecione nº camisa'
            value={shirt}
            setState={setShirt}
            isLetter
          />
        </div>
        <div className='align-items-center my-1 modalInputRow'>
          <Image className='me-2' src={`${baseUrl}/assets/img/clothes/jacket.png`} alt='jacket' width={35} />
          <ClothingSizesDropdown
            defaultLabel='Selecione nº casaco'
            value={jacket}
            setState={setJacket}
            isLetter
          />
        </div>
        <div className='align-items-center my-1 modalInputRow'>
          <Image className='me-2' src={`${baseUrl}/assets/img/clothes/polo.png`} alt='polo' width={35} />
          <ClothingSizesDropdown
            defaultLabel='Selecione nº pólo'
            value={polo}
            setState={setPolo}
            isLetter
          />
        </div>
        <div className='align-items-center my-1 modalInputRow'>
          <Image className='me-2' src={`${baseUrl}/assets/img/clothes/pullover.png`} alt='pullover' width={35} />
          <ClothingSizesDropdown
            defaultLabel='Selecione nº pullover'
            value={pullover}
            setState={setPullover}
            isLetter
          />
        </div>
        <div className='align-items-center my-1 modalInputRow'>
          <Image className='me-2' src={`${baseUrl}/assets/img/clothes/shoe.png`} alt='shoe' width={35} />
          <ClothingSizesDropdown
            defaultLabel='Selecione nº calçado'
            value={shoe}
            setState={setShoe}
            isFootwear
          />
        </div>
        <div className='align-items-center my-1 modalInputRow'>
          <Image className='me-2' src={`${baseUrl}/assets/img/clothes/sweatshirt.png`} alt='sweatshirt' width={35} />
          <ClothingSizesDropdown
            defaultLabel='Selecione nº sweatshirt'
            value={sweatshirt}
            setState={setSweatshirt}
            isLetter
          />
        </div>
        <div className='align-items-center my-1 modalInputRow'>
          <Image className='me-2' src={`${baseUrl}/assets/img/clothes/tshirt.png`} alt='tshirt' width={35} />
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
      alignSelf: 'center',
      justifyContent: 'space-between',
      alignItems: 'center',
    }

    return (
      <Fragment>
        {user.CONTACTO && (
          <div className='align-items-center my-1' style={rowStyle}>
            <Image className='me-2' src={`${baseUrl}/assets/img/clothes/phone.png`} alt='phone' width={35} />
            <div>{user.CONTACTO}</div>
          </div>
        )}
        {user.DATA_NASCIMENTO && (
          <div className='align-items-center my-1' style={rowStyle}>
            <Image className='me-2' src={`${baseUrl}/assets/img/clothes/cake.png`} alt='cake' width={35} />
            <div>{user.DATA_NASCIMENTO}</div>
          </div>
        )}
        {user.nCalcas && (
          <div className='align-items-center my-1' style={rowStyle}>
            <Image className='me-2' src={`${baseUrl}/assets/img/clothes/trousers.png`} alt='trousers' width={35} />
            <div>{user.nCalcas}</div>
          </div>
        )}
        {user.nCamisa && (
          <div className='align-items-center my-1' style={rowStyle}>
            <Image className='me-2' src={`${baseUrl}/assets/img/clothes/shirt.png`} alt='shirt' width={35} />
            <div>{user.nCamisa}</div>
          </div>
        )}
        {user.nCasaco && (
          <div className='align-items-center my-1' style={rowStyle}>
            <Image className='me-2' src={`${baseUrl}/assets/img/clothes/jacket.png`} alt='jacket' width={35} />
            <div>{user.nCasaco}</div>
          </div>
        )}
        {user.nPolo && (
          <div className='align-items-center my-1' style={rowStyle}>
            <Image className='me-2' src={`${baseUrl}/assets/img/clothes/polo.png`} alt='polo' width={35} />
            <div>{user.nPolo}</div>
          </div>
        )}
        {user.nPullover && (
          <div className='align-items-center my-1' style={rowStyle}>
            <Image className='me-2' src={`${baseUrl}/assets/img/clothes/pullover.png`} alt='pullover' width={35} />
            <div>{user.nPullover}</div>
          </div>
        )}
        {user.nSapato && (
          <div className='align-items-center my-1' style={rowStyle}>
            <Image className='me-2' src={`${baseUrl}/assets/img/clothes/shoe.png`} alt='shoe' width={35} />
            <div>{user.nSapato}</div>
          </div>
        )}
        {user.nSweatshirt && (
          <div className='align-items-center my-1' style={rowStyle}>
            <Image className='me-2' src={`${baseUrl}/assets/img/clothes/sweatshirt.png`} alt='sweatshirt' width={35} />
            <div>{user.nSweatshirt}</div>
          </div>
        )}
        {user.nTshirt && (
          <div className='align-items-center my-1' style={rowStyle}>
            <Image className='me-2' src={`${baseUrl}/assets/img/clothes/tshirt.png`} alt='tshirt' width={35} />
            <div>{user.nTshirt}</div>
          </div>
        )}
      </Fragment>
    )
  }

  return (
    <Fragment>

      {/* Card Component */}
      <Card
        className='my-3'
        style={{
          borderColor: '#77321c',
          backgroundColor: '#fdefeb'
        }}
      >

        {/* This is the User Card Header */}
        <Card.Header
          className='text-light'
          style={{
            backgroundColor: '#ed6337',
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px'
          }}
        >
          {loading ? (
            <LoadingBars classes={'ms-3'} />
          ) : (
            <UserCardHeader user={user} baseUrl={baseUrl} />
          )}

        </Card.Header>

        {/* This is the body of the User card */}
        <Card.Body style={{ padding: 50, paddingTop: 20, paddingBottom: 20 }}>
          {loading ? (
            <LoadingBars />
          ) : (
            <Fragment>
              <UserButtons username={user.USERNAME} sessionUsername={user.USERNAME} fireModal={fireModal} user={user} />
              <UserDetails user={user} />
              <Team baseUrl={baseUrl} team={team} />
            </Fragment>
          )}
        </Card.Body >
      </Card >
    </Fragment >
  )
}

export default User