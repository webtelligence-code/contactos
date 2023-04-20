import { faBuildingUser, faCakeCandles, faCar, faEnvelope, faPhone, faLayerGroup, faBuilding, faUser, faUserPen, faInfo, faSignature, faBolt, faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useEffect, useState } from 'react'
import { Button, Card, Col, Image, Row } from 'react-bootstrap'
import Team from './Team';
import LoadingBars from '../utility/LoadingBars';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const User = ({ baseUrl, user, team, loading, getUser }) => {
  // Initialize 
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  // States
  const [avatar, setAvatar] = useState('');

  // This useEffect will set the image path for the avatar
  useEffect(() => {
    setAvatar(user.IMAGE_PATH);
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
          MySwal.fire({
            title: <div style={{ color: '#32b300' }}>Perfil editado!</div>,
            text: 'O seu perfil foi atualizado.',
            icon: 'success',
            confirmButtonColor: '#ed6337'
          })
        }
      }
    });
  }

  // Function to return form Modal body HTML
  const generateFormModalBody = () => {
    return (
      <Fragment>
        <div className='align-items-center my-1 modalInputRow'>
          <Image className='me-2' src={`${baseUrl}/assets/img/clothes/phone.png`} alt='phone' width={35} />
          <input placeholder='Número de telemóvel' value={user.CONTACTO} />
        </div>
        <div className='align-items-center my-1 modalInputRow'>
          <Image className='me-2' src={`${baseUrl}/assets/img/clothes/cake.png`} alt='cake' width={35} />
          <input placeholder='Data de Nascimento' value={user.DATA_NASCIMENTO} />
        </div>
        <div className='align-items-center my-1 modalInputRow'>
          <Image className='me-2' src={`${baseUrl}/assets/img/clothes/trousers.png`} alt='trousers' width={35} />
          <input placeholder='Número das Calças' value={user.nCalcas} />
        </div>
        <div className='align-items-center my-1 modalInputRow'>
          <Image className='me-2' src={`${baseUrl}/assets/img/clothes/shirt.png`} alt='shirt' width={35} />
          <input placeholder='Número da Camisa' value={user.nCamisa} />
        </div>
        <div className='align-items-center my-1 modalInputRow'>
          <Image className='me-2' src={`${baseUrl}/assets/img/clothes/jacket.png`} alt='jacket' width={35} />
          <input placeholder='Número do Casaco' value={user.nCasaco} />
        </div>
        <div className='align-items-center my-1 modalInputRow'>
          <Image className='me-2' src={`${baseUrl}/assets/img/clothes/polo.png`} alt='polo' width={35} />
          <input placeholder='Número do Pólo' value={user.nPolo} />
        </div>
        <div className='align-items-center my-1 modalInputRow'>
          <Image className='me-2' src={`${baseUrl}/assets/img/clothes/pullover.png`} alt='pullover' width={35} />
          <input placeholder='Número do Pullover' value={user.nPullover} />
        </div>
        <div className='align-items-center my-1 modalInputRow'>
          <Image className='me-2' src={`${baseUrl}/assets/img/clothes/shoe.png`} alt='shoe' width={35} />
          <input placeholder='Número do sapato' value={user.nSapato} />
        </div>
        <div className='align-items-center my-1 modalInputRow'>
          <Image className='me-2' src={`${baseUrl}/assets/img/clothes/sweatshirt.png`} alt='sweatshirt' width={35} />
          <input placeholder='Número da Sweatshirt' value={user.nSweatshirt} />
        </div>
        <div className='align-items-center my-1 modalInputRow'>
          <Image className='me-2' src={`${baseUrl}/assets/img/clothes/tshirt.png`} alt='tshirt' width={35} />
          <input placeholder='Número da Tshirt' value={user.nTshirt} />
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
          <div className='align-items-center my-1 modalInfoRow'>
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
          borderRadius: 100,
          borderTopWidth: 0,
          borderTopLeftRadius: 102,
          borderTopRightRadius: 102,
          backgroundColor: '#fdefeb'
        }}
      >

        {/* This is the User Card Header */}
        <Card.Header
          className='text-light'
          style={{
            backgroundColor: '#ed6337',
            borderRadius: 100,
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
                <img
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
                    className='w-100'
                    style={{ borderRadius: 50 }}
                    onClick={() => navigate('/contactos')}
                  >
                    <FontAwesomeIcon icon={faHandPointLeft} color='white' className='me-2' />
                    Voltar atrás
                  </Button>
                </Col>
                <Col className='w-100'>
                  <Button
                    variant='primary'
                    size='sm'
                    className='w-100'
                    style={{ borderRadius: 50, color: '' }}
                    onClick={() => fireModal(false)}
                  >
                    <FontAwesomeIcon icon={faInfo} color='white' className='me-2' />
                    + Info
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant='success'
                    size='sm'
                    className='w-100'
                    style={{ borderRadius: 50 }}
                    onClick={() => fireModal(true)}
                  >
                    <FontAwesomeIcon icon={faUserPen} color='white' className='me-2' />
                    Editar perfil
                  </Button>
                </Col>
              </Row>
              <Row style={{ color: '#77321c', fontWeight: 'normal' }}>
                <Col>
                  <p>
                    <FontAwesomeIcon icon={faEnvelope} className='me-2' color='#ed6337' size='sm' />
                    <FontAwesomeIcon icon={faBuilding} className='me-2' color='#ed6337' size='sm' />
                    {user.EMAIL}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faEnvelope} className='me-2' color='#ed6337' size='sm' />
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