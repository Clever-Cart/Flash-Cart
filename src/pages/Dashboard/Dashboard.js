import React from 'react';
import { connect } from 'react-redux';

import Database from '../../services/database';
import Cache from '../../services/cache';

import CardProduct from '../../components/card-product';

import './styles.css';

const Dashboard = ({ history, logout, userId }) => {
  const [products, setProducts] = React.useState([])
  const [map, setMap] = React.useState()

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
    getMaps();
  }, [])

  const getProducts = () => {
    const cartId = Cache.retrieve(Cache.KEYS.CART_ID);
    Database.getProducts(cartId, setProducts);
  }

  const getMaps = () => {
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

  const Map = ({ data }) => <img src={map} alt="Mapa" />

  return (
    <div className="dashboard">
      <div>
        <Map/>
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
