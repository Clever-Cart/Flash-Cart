import React from 'react';
import { connect } from 'react-redux';

import Database from '../../services/database';
import styled from 'styled-components'

import CardProduct from '../../components/card-product';
import Cart from '../../components/Cart';
import Cache from '../../services/cache';

import './styles.css';

const Dashboard = ({ history, logout, userId }) => {
  const [products, setProducts] = React.useState([])
  const [map, setMap] = React.useState()
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);

  const Carts = styled.div`
    width: 100px;
    height: 100px;
    left: ${({ x }) => x+'rem'};
    top: ${({ y }) => y+'rem'};
    position:absolute;
    display: flex;
    align-items: center;
  `

  const handleClick = async () => {
    const user = Database.get('Users', userId);
    try {
      await user.set({ cartId: false });
    } catch (e) {
      // Do nothing
    }
    history.goBack();
    logout();
  }

  function increment(x){
    return x + 1;
  }
  function decrement(x){
    return x - 1;
  }
  const actionXMap = {
     ArrowLeft: decrement,
     ArrowRight: increment
  }
  const actionYMap = {
     ArrowDown: increment,
     ArrowUp: decrement
  }

  React.useEffect((e) => {
    getProducts();
    getMaps();
    moveCart();
  }, [])

  function handleKeyPress(e){
    const actionX = actionXMap[e.key];
    const actionY = actionYMap[e.key];
    actionX && setX(actionX);
    actionY && setY(actionY);
  }
  const moveCart = () => {
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keyup", handleKeyPress);
    document.addEventListener("keyleft", handleKeyPress);
    document.addEventListener("keyright", handleKeyPress);
}

  const getProducts = () => {
    // const cartId = Cache.retrieve(Cache.KEYS.CART_ID);
    Database.getProducts('LQ7lrMxGTPpHFEV4JHmZ', setProducts);
  }

  const getMaps = () => {
    // const cartId = Cache.retrieve(Cache.KEYS.CART_ID);
    Database.getMaps('LQ7lrMxGTPpHFEV4JHmZ', setMap);
  }

  const calculateTotalProduct = () => {
    let productsPrice = 0.0;
    if (products.length > 0) {
      products.map((product) => {
        return productsPrice += product.price;
      });
    }
    return convertPrice(productsPrice);
  }

  const convertPrice = (price) => {
    return price.toLocaleString('pt-br', {minimumFractionDigits: 2});
  }

  const Map = ({ data }) => <img className="map" src={map} alt="Mapa" />

  return (
    <div onKeyPress={handleKeyPress} className="dashboard">
      <div onKeyPress={handleKeyPress}>
        <Carts x={x} y={y}>
          <Cart />
        </Carts>
        <Map/>
      </div>
      <div className="list">
        <span className="list__header"><h3>Lista de Compras</h3></span>
        <div className="list__products">
          {products.map((product, index) => (
            <CardProduct key={index} name={product.name} price={convertPrice(product.price)} thumbnail={product.thumbnail} />
          ))}
        </div>
        <div className="list__footer">
          <span><h3>Seu total: R$ {calculateTotalProduct()}</h3></span>
          <span><h3>Utilize o app no seu celular para pagar</h3></span>
          <button className="secondary-button" onClick={handleClick}>
          Sair
        </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  userId: state.app.userId
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: 'LOGOUT' })
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
