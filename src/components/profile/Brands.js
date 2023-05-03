import React, { Fragment } from 'react'

const Brands = ({ brands }) => {
  // Split the brands string into an array of brand names
  const brandList = brands ? brands.split(';').filter(brand => brand !== '') : [];

  return (
    <Fragment>
      {brandList.length > 0 && (
        <div>
          <h3>Marcas:</h3>
          <ul>
            {brandList.map((brand, key) => (
              <li key={key}>{brand}</li>
            ))}
          </ul>
        </div>
      )}
    </Fragment>
  )
}

export default Brands