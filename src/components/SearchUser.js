import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { FormControl, InputGroup } from 'react-bootstrap'

const SearchUser = ({ searchInput, setSearchInput }) => {
  return (
    <InputGroup className='mt-3'>
      <InputGroup.Text
        className='text-dark'
        style={{ backgroundColor: 'white', fontWeight: 500, fontSize: 16, borderBottomLeftRadius: 15}}
      >
        Procurar utilizador
        <FontAwesomeIcon icon={faSearch} className='ms-2' color='dark' />
      </InputGroup.Text>
      <FormControl
        className='searchInput'
        placeholder='Insira o termo de pesquisa do utilizador'
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </InputGroup>
  )
}

export default SearchUser