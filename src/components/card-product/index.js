import React from 'react';

import './styles.css';

const CardProduct = ({
    name,
    price,
    thumbnail
}) => {
    return (
        <div className="card" onClick={() => alert("Hello from here")}>
            <img className="card__img" src={thumbnail} alt="products" />
            <div className="card__info">
                <span className="card__info--name">{name}</span>
                <span className="card__info--price">R$ {price}</span>
            </div>
        </div>
    );
}

export default CardProduct;