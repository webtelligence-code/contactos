import { faBuildingUser, faCakeCandles, faCar, faEnvelope, faPhone, faLayerGroup, faBuilding, faUser, faUserPen, faInfo, faSignature, faBolt, faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useEffect, useState } from 'react'
import { Button, Card, Col, Image, Row } from 'react-bootstrap'
import Team from './Team';
import LoadingBars from '../utility/LoadingBars';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import ClothingSizesDropdown from '../utility/ClothingSizesDropdown';
import axios from 'axios';

const User = ({ baseUrl, user, team, loading, getUser }) => {
  // Initialize 
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  // States
  const [avatar, setAvatar] = useState('');
  const [username, setUsername] = useState();
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

  // This useEffect will set the states for the user
  useEffect(() => {
    setAvatar(user.IMAGE_PATH);
    setUsername(user.USERNAME);
    setPhone(user.CONTACTO);
    setDateOfBirth(user.DATA_NASCIMENTO);
    setPants(user.nCalcas);
    setShirt(user.nCamisa);
    setJacket(user.nCasaco);
    setPolo(user.nPolo);
    setPullover(user.nPullover);
    setShoe(user.nSapato);
    setSweatshirt(user.nSweatshirt);
    setTshirt(user.nTshirt);
  }, [user])

  /**
   * This function will display a modal based on the boolean state parameter
   * @param {boolean} isEdit 
   */
  const fireModal = (isEdit) => {
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
          sendDataToApi()
        }
      }
    });
  }

  const sendDataToApi = async () => {
    const action = 'update_user';
    axios.post(`http://localhost:80/contactos/api/index.php`, {
      action,
      username,
      phone,
      dateOfBirth,
      pants,
      shirt,
      jacket,
      polo,
      pullover,
      shoe,
      sweatshirt,
      tshirt
    }).then((response) => {
      console.log(`Response from post request (${action})`, response)
      const parsedResponse = JSON.parse(response)
      MySwal.fire({
        title: parsedResponse.title,
        text: parsedResponse.message,
        icon: parsedResponse.status,
        confirmButtonColor: '#ed6337'
      }).then(() => {
        getUser();
      })
    }).catch((error) => {
      console.error('Error while trying to post request to API:', error)
    })

  }

  // Function to return form Modal body HTML
  const generateFormModalBody = () => {
    return (
      <Fragment>
        <div className='align-items-center my-1 modalInputRow'>
          <Image className='me-2' src={`${baseUrl}/assets/img/clothes/phone.png`} alt='phone' width={35} />
          <input
            placeholder='Número de telemóvel'
            value={phone}
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
            value={shirt}
            setState={setJacket}
            isLetter
          />
        </div>
        <div className='align-items-center my-1 modalInputRow'>
          <Image className='me-2' src={`${baseUrl}/assets/img/clothes/polo.png`} alt='polo' width={35} />
          <ClothingSizesDropdown
            defaultLabel='Selecione nº pólo'
            value={shirt}
            setState={setPolo}
            isLetter
          />
        </div>
        <div className='align-items-center my-1 modalInputRow'>
          <Image className='me-2' src={`${baseUrl}/assets/img/clothes/pullover.png`} alt='pullover' width={35} />
          <ClothingSizesDropdown
            defaultLabel='Selecione nº pullover'
            value={shirt}
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
            value={shirt}
            setState={setSweatshirt}
            isLetter
          />
        </div>
        <div className='align-items-center my-1 modalInputRow'>
          <Image className='me-2' src={`${baseUrl}/assets/img/clothes/tshirt.png`} alt='tshirt' width={35} />
          <ClothingSizesDropdown
            defaultLabel='Selecione nº tshirt'
            value={shirt}
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
      justifyContent: 'center',
      alignItems: 'center'
    }

    return (
      <Fragment>
        {phone && (
          <div className='align-items-center my-1' style={rowStyle}>
            <Image className='me-2' src={`${baseUrl}/assets/img/clothes/phone.png`} alt='phone' width={35} />
            <div>{phone}</div>
          </div>
        )}
        {dateOfBirth && (
          <div className='align-items-center my-1' style={rowStyle}>
            <Image className='me-2' src={`${baseUrl}/assets/img/clothes/cake.png`} alt='cake' width={35} />
            <div>{dateOfBirth}</div>
          </div>
        )}
        {pants && (
          <div className='align-items-center my-1' style={rowStyle}>
            <Image className='me-2' src={`${baseUrl}/assets/img/clothes/trousers.png`} alt='trousers' width={35} />
            <div>{pants}</div>
          </div>
        )}
        {shirt && (
          <div className='align-items-center my-1' style={rowStyle}>
            <Image className='me-2' src={`${baseUrl}/assets/img/clothes/shirt.png`} alt='shirt' width={35} />
            <div>{shirt}</div>
          </div>
        )}
        {jacket && (
          <div className='align-items-center my-1' style={rowStyle}>
            <Image className='me-2' src={`${baseUrl}/assets/img/clothes/jacket.png`} alt='jacket' width={35} />
            <div>{jacket}</div>
          </div>
        )}
        {polo && (
          <div className='align-items-center my-1 modalInfoRow'>
            <Image className='me-2' src={`${baseUrl}/assets/img/clothes/polo.png`} alt='polo' width={35} />
            <div>{polo}</div>
          </div>
        )}
        {pullover && (
          <div className='align-items-center my-1' style={rowStyle}>
            <Image className='me-2' src={`${baseUrl}/assets/img/clothes/pullover.png`} alt='pullover' width={35} />
            <div>{pullover}</div>
          </div>
        )}
        {shoe && (
          <div className='align-items-center my-1' style={rowStyle}>
            <Image className='me-2' src={`${baseUrl}/assets/img/clothes/shoe.png`} alt='shoe' width={35} />
            <div>{shoe}</div>
          </div>
        )}
        {sweatshirt && (
          <div className='align-items-center my-1' style={rowStyle}>
            <Image className='me-2' src={`${baseUrl}/assets/img/clothes/sweatshirt.png`} alt='sweatshirt' width={35} />
            <div>{sweatshirt}</div>
          </div>
        )}
        {tshirt && (
          <div className='align-items-center my-1' style={rowStyle}>
            <Image className='me-2' src={`${baseUrl}/assets/img/clothes/tshirt.png`} alt='tshirt' width={35} />
            <div>{tshirt}</div>
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
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <div>
                <Image
                  src={`${baseUrl}${avatar}`}
                  alt='Profile'
                  className='me-2 profile-pic'
                />
              </div>
              <div className='text-start'>
                <h3>
                  <FontAwesomeIcon icon={faSignature} className='me-2' />
                  {user.NAME}
                </h3>
                <h5 style={{ opacity: '80%', color: '#77321c' }}>
                  <FontAwesomeIcon icon={faBuildingUser} className='me-2' />
                  {user.DEPARTAMENTO}
                </h5>
                <h6 style={{ opacity: '80%', color: '#77321c' }}>
                  <FontAwesomeIcon icon={faBolt} className='me-2' fade />
                  {user.FUNCAO}
                </h6>
              </div>
            </div>
          )}

        </Card.Header>

        {/* This is the body of the User card */}
        <Card.Body style={{ padding: 50, paddingTop: 20, paddingBottom: 20 }}>
          {loading ? (
            <LoadingBars />
          ) : (
            <Fragment>
              <Row className='text-center mb-3'>
                <Col className='w-100'>
                  <Button
                    variant='danger'
                    size='sm'
                    className='w-100 h-100 d-flex align-items-center justify-content-center'
                    onClick={() => navigate('/contactos')}
                  >
                    <FontAwesomeIcon icon={faHandPointLeft} color='white' className='me-sm-3' />
                    Voltar atrás
                  </Button>
                </Col>
                <Col className='w-100'>
                  <Button
                    variant='primary'
                    size='sm'
                    className='w-100 h-100 d-flex align-items-center justify-content-center'
                    onClick={() => fireModal(false)}
                  >
                    <FontAwesomeIcon icon={faInfo} color='white' className='me-sm-3' />
                    + Info
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant='success'
                    size='sm'
                    className='w-100 h-100 d-flex align-items-center justify-content-center'
                    onClick={() => fireModal(true)}
                  >
                    <FontAwesomeIcon icon={faUserPen} color='white' className='me-sm-3' />
                    Editar perfil
                  </Button>
                </Col>
              </Row>
              <Row style={{ color: '#77321c', fontWeight: 'normal' }}>
                <Col>
                  <p>
                    <FontAwesomeIcon icon={faEnvelope} className='me-1' color='#ed6337' size='sm' />
                    <FontAwesomeIcon icon={faBuilding} className='me-2' color='#ed6337' size='sm' />
                    {user.EMAIL}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faEnvelope} className='me-1' color='#ed6337' size='sm' />
                    <FontAwesomeIcon icon={faUser} className='me-2' color='#ed6337' size='sm' />
                    {user.EMAIL_PESSOAL}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faPhone} className='me-2' color='#ed6337' size='sm' />
                    {user.CONTACTO}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faLayerGroup} className='me-2' color='#ed6337' size='sm' />
                    {user.EXTENSAO ? user.EXTENSAO : 'Nenhuma.'}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faCakeCandles} className='me-2' color='#ed6337' size='sm' />
                    {user.DATA_NASCIMENTO}
                  </p>
                </Col>
                <Col>
                  <p>
                    <FontAwesomeIcon icon={faBuildingUser} className='me-2' color='#ed6337' size='sm' />
                    {user.DEPARTAMENTO}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faCar} className='me-2' color='#ed6337' size='sm' />
                    {user.CONCESSAO}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faBuilding} className='me-2' color='#ed6337' size='sm' />
                    {user.EMPRESA}
                  </p>
                </Col>
              </Row>
            </Fragment>
          )
          }

          {/* Team component inside user card body */}
          <Team baseUrl={baseUrl} team={team} loading={loading} />
        </Card.Body >
      </Card >
    </Fragment >
  )
}

export default User