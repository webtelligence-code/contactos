import { faBuilding, faBuildingUser, faCamera, faCar, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, useRef } from 'react';
import { Overlay, Tooltip } from 'react-bootstrap';

const WorkerImage = ({ baseUrl, clickable, avatar, username, sessionUsername, alt, style, onClick, teamOverlay, teamMember }) => {
  const defaultImageSrc = `${baseUrl}/workers/user.webp`;
  const avatarTarget = useRef(null);
  const teamTarget = useRef(null);

  const [imageSrc, setImageSrc] = useState(`${baseUrl}/workers/${username}/${username}.webp`);
  const [isLoading, setIsLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const [avatarShow, setAvatarShow] = useState(false);
  const [teamShow, setTeamShow] = useState(false);


  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      setIsLoading(false);
    };
    img.onerror = () => {
      setImageSrc(defaultImageSrc);
      setIsLoading(false);
    };
  }, [username, defaultImageSrc, imageSrc]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleMouseEnter = () => {
    if (sessionUsername === username && avatar) {
      setShowOverlay(true);
    }
  };

  const handleMouseLeave = () => {
    setShowOverlay(false);
  };

  return (
    <div
      className="image-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <img
        className={clickable ? 'clickable' : null}
        src={imageSrc}
        alt={alt}
        style={style}
        onClick={onClick}
        ref={teamTarget}
        onMouseEnter={() => setTeamShow(true)}
        onMouseLeave={() => setTeamShow(false)}
      />
      {showOverlay && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            cursor: 'pointer',
            borderRadius: '5%'
          }}
          onClick={onClick}
          onMouseEnter={() => setAvatarShow(true)}
          onMouseLeave={() => setAvatarShow(false)}
          ref={avatarTarget}
        >
          <FontAwesomeIcon icon={faCamera} fontSize={45} color='#ed6337' />
        </div>
      )}
      <Overlay target={avatarTarget.current} show={avatarShow} placement="bottom">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            Alterar foto de perfil
          </Tooltip>
        )}
      </Overlay>
      {teamOverlay && (
        <Overlay target={teamTarget.current} show={true} placement="top">
          {(props) => (
            <Tooltip id="overlay-example" {...props}>
              <h5 style={{color: '#ed6337'}}>{teamMember.NAME}</h5>
              <p>
                <FontAwesomeIcon icon={faBuildingUser} className='me-2' color='#ed6337' />
                {teamMember.DEPARTAMENTO}
              </p>
              <p>
                <FontAwesomeIcon icon={faBuildingUser} className='me-2' color='#ed6337' />
                {teamMember.FUNCAO}
              </p>
              <p>
                <FontAwesomeIcon icon={faCar} className='me-2' color='#ed6337' />
                {teamMember.CONCESSAO}
              </p>
              <p>
                <FontAwesomeIcon icon={faBuilding} className='me-2' color='#ed6337' />
                {teamMember.EMPRESA}
              </p>
              <p>
                <FontAwesomeIcon icon={faEnvelope} className='me-2' color='#ed6337' />
                {teamMember.EMAIL}
              </p>
              <p>
                <FontAwesomeIcon icon={faPhone} className='me-2' color='#ed6337' />
                {teamMember.CONTACTO}
              </p>
            </Tooltip>
          )}
        </Overlay>
      )}
    </div>
  );
};

export default WorkerImage;
