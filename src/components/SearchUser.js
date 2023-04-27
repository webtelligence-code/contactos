import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { FormControl, InputGroup } from 'react-bootstrap'

const SearchUser = ({ searchInput, setSearchInput, searchBy, setSearchBy, options }) => {
  return (
    <InputGroup className='mt-3'>
      <InputGroup.Text
        className='text-light'
        style={{ backgroundColor: '#ed6337', fontWeight: 500 }}
      >
        Procurar utilizador
        <FontAwesomeIcon icon={faSearch} className='ms-2' color='white' />
      </InputGroup.Text>
      <FormControl
        className='searchInput'
        placeholder={`Insira ${searchBy.toLowerCase()} do utilizador`}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <InputGroup.Text className='text-light' style={{ backgroundColor: '#ed6337', fontWeight: 600 }}>
        <select
          className='searchDropdown clickable'
          defaultValue={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
        >
          {options.map((option, key) => (
            <option key={key} value={option}>{option}</option>
          ))}
        </select>
      </InputGroup.Text>
    </InputGroup>
  )
}

export default SearchUser