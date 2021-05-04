import React from 'react';
import CartImage from '../../assets/cart.png';
const CardProduct = ({
  x,
  y
}) => {
  return <img
    src={CartImage}
    alt="cart"
    style = {
  {
    width: '50px',
    height: '50px',
    position: 'absolute',
    zindex: '10',
    left: `${({x}) => x + 'rem'}`,
    top: `${({y}) => y + 'rem'}`
  }
}
  />;
}

export default CardProduct;