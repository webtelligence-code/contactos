import { faEye, faEyeSlash, faKey } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

const ModalPasswordUpdate = ({ state, setState, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='align-items-center my-1 modalInputRow'>
      <FontAwesomeIcon icon={faKey} color='#ed6337' width={30} />
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        defaultValue={state}
        onChange={(e) => setState(e.target.value)}
        className='ms-2 dropdownInput'
        autoComplete='new-password'
      />
      <button
        style={{ width: 30, backgroundColor: 'transparent', borderRadius: 25, border: 'none' }}
        onClick={() => setShowPassword(!showPassword)}
        className='ms-2 showHidePassword'
      >
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} color='#ed6337' />
      </button>
    </div>
  )
}

export default ModalPasswordUpdate