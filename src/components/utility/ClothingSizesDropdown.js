import React from 'react'

const ClothingSizesDropdown = ({ value, setState, defaultLabel, isLetter, isNumber, isFootwear }) => {
  const sizesLetter = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL',];
  const sizesNumber = ["34", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54"];
  const sizesFootwear = ["34", "34.5", "35", "35.5", "36", "36.5", "37", "37.5", "38", "38.5", "39", "39.5", "40", "40.5", "41", "41.5", "42", "42.5", "43", "43.5", "44", "44.5", "45", "45.5", "46", "46.5", "47", "47.5", "48"];

  return (
    <select
      className='dropdown'
      value={value}
      onChange={(event) => setState(event.target.value)}
    >
      <option selected>{defaultLabel}</option>
      {isLetter && (
        sizesLetter.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))
      )}
      {isNumber && (
        sizesNumber.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))
      )}
      {isFootwear && (
        sizesFootwear.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))
      )}
    </select>
  )
}

export default ClothingSizesDropdown