import { faCarSide } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment } from 'react'
import { Card } from 'react-bootstrap';

const Brands = ({ brands }) => {
  // Split the brands string into an array of brand names
  const brandList = brands ? brands.split(';').filter(brand => brand !== '') : [];

  return (
    brandList.length > 0 && (
      <Card>
        <Card.Header
          style={{
            backgroundColor: 'white',
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
            color: '#77321c'
          }}
          as={'h6'}
        >
          {`Marcas `}
          <FontAwesomeIcon icon={faCarSide}  color='#ed6337'/>
        </Card.Header>
        <Card.Body className='pb-0' style={{color: '#77321c'}}>
          <ul className='brandsList'>
            {brandList.map((brand, key) => (
              <li key={key}>{brand}</li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    )

  )
}

export default Brands