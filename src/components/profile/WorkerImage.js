import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';

const WorkerImage = ({ baseUrl, clickable, avatar, username, sessionUsername, defaultImageSrc, alt, style, onClick }) => {
  const [imageSrc, setImageSrc] = useState(`${baseUrl}/workers/${username}/${username}.webp`);
  const [isLoading, setIsLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);

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
        >
          <FontAwesomeIcon icon={faCamera} fontSize={45} color='#ed6337' />
        </div>
      )}
    </div>
  );
};

export default WorkerImage;
