import React from 'react';

import './styles.css';

const CardProduct = () => {
    return (
        <div className="card" onClick={() => alert("Hello from here")}>
            <img className="card__img" src="https://www.camil.com.br/wp-content/uploads/sites/12/2020/06/7896006744115-feijao-carioca-camil-1kg-1.png" />
            <div className="card__info">
                <span className="card__info--name">Saco de Maçã</span>
                <span className="card__info--price">R$ 9,90</span>
            </div>
        </div>
    );
}

export default CardProduct;