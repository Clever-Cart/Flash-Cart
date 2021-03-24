import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import Database from '../services/database';
import Cache from '../services/cache';

import CardProduct from '../components/card-product';

const Dashboard = ({ history, logout, userId }) => {
  const [products, setProducts] = React.useState([])

  const handleClick = async() => {
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
    <div>
      <h1>Dashboard</h1>
      <Button variant='contained' color='primary' onClick={handleClick}>
        Sair
      </Button>
      <CardProduct />
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
