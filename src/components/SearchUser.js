import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment, useRef, useState } from 'react'
import { FormControl, InputGroup, Overlay, Tooltip } from 'react-bootstrap'

const SearchUser = ({ searchInput, setSearchInput }) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <Fragment>
      <InputGroup
        className='mt-3'
        ref={target}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <InputGroup.Text
          className='text-dark'
          style={{ backgroundColor: 'white', fontWeight: 500, fontSize: 16, borderBottomLeftRadius: 15 }}
        >
          <FontAwesomeIcon icon={faSearch} className='ms-2' color='#ed6337' />
        </InputGroup.Text>
        <FormControl
          placeholder='Insira o termo de pesquisa do utilizador'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onClick={() => setShow(false)}
        />
      </InputGroup>
      <Overlay target={target.current} show={show} placement="bottom">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            Insira o termo de pesquisa de utilizador.
            Ex: Nome, Empresa, Departamento, Função, Email, Contacto.
          </Tooltip>
        )}
      </Overlay>
    </Fragment>
  )
}

export default SearchUser