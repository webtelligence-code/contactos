import React, { Fragment, useEffect, useState } from 'react'

const ModalAvatarEdit = ({ baseUrl, setAvatar, username }) => {
  const defaultImageSrc = `${baseUrl}/workers/user.webp`;
  const [imageSrc, setImageSrc] = useState(`${baseUrl}/workers/${username}/${username}.webp`);

  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      
    };
    img.onerror = () => {
      setImageSrc(defaultImageSrc);
    };
  }, [username, defaultImageSrc, imageSrc]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setAvatar(event.target.result)
        setImageSrc(event.target.result);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Fragment>
      <div>
        <img
          src={imageSrc}
          className='mb-3'
          alt='Avatar Preview'
          style={{
            width: 350,
            height: 350,
            borderRadius: '5%',
            objectFit: 'cover',
            border: '#77321c 2px solid'
          }}
        />
      </div>
      <div>
        <input type='file' accept='image/*' onChange={handleFileChange} />
      </div>
    </Fragment>
  )
}

export default ModalAvatarEdit