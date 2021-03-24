import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import Database from '../../services/database';
import Cache from '../../services/cache';

import CardProduct from '../../components/card-product';

import './styles.css';

const Dashboard = ({ history, logout, userId }) => {
  const [products, setProducts] = React.useState([])

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

  React.useEffect(() => {
    getProducts();
  }, [])
  
  const getProducts = () => {
    const cartId = Cache.retrieve(Cache.KEYS.CART_ID);
    Database.getProducts(cartId, setProducts);
  }

  const calculateTotalProduct = () => {
    let productsPrice = 0.0;
    if (products.length > 0) {
      products.map((product) => {
        productsPrice += product.price;
      });
    }
    return convertPrice(productsPrice);
  }

  const convertPrice = (price) => {
    return price.toLocaleString('pt-br', {minimumFractionDigits: 2});
  }

  return (
    <div className="dashboard">
      <div>
        <h1>Dashboard</h1>
        <button className="secondary-button" onClick={handleClick}>
          Sair
        </button>
      </div>
      <div className="list">
        <span className="list__header"><h1>Lista de Compras</h1></span>
        <div className="list__products">
          {products.map((product, index) => (
            <CardProduct key={index} name={product.name} price={convertPrice(product.price)} thumbnail={product.thumbnail} />
          ))}
        </div>
        <div className="list__footer">
          <span><h3>Seu total: R$ {calculateTotalProduct()}</h3></span>
          <span><h3>Utilize o app no seu celular para pagar</h3></span>
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
