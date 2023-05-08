import React, { Fragment, useEffect, useState } from 'react'

const ModalAvatarEdit = ({defaultImageSrc, setAvatar}) => {
  const [previewImage, setPreviewImage] = useState(defaultImageSrc);

  useEffect(() => {
    setAvatar(defaultImageSrc);
  }, [defaultImageSrc, setAvatar])

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setAvatar(event.target.result)
        setPreviewImage(event.target.result);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Fragment>
      <div>
        <img
          src={previewImage}
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