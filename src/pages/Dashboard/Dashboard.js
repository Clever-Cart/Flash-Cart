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

  return (
    <div className="dashboard">
      <div>
        <h1>Dashboard</h1>
        <Button variant='contained' color='primary' onClick={handleClick}>
          Sair
        </Button>
      </div>
      <div className="list">
        <span className="list__header"><h1>Lista de Compras</h1></span>
        <div className="list__products">
          {/* {products.map(() => {
            <CardProduct />
          })} */}
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
        </div>
        <div className="list__footer">
          <span><h3>Seu total: R$ 60,00</h3></span>
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
