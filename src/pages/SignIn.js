import React from 'react';
import QRCode from 'react-qr-code';
import { connect } from 'react-redux';
import debounce from 'debounce';

import Cache from '../services/cache';
import Database from '../services/database';

const SignIn = ({ history, login }) => {
  const [cartId, setCartId] = React.useState();

  const cartSnapshot = debounce((documentSnapshot) => {
    const data = documentSnapshot.data();

    if (data && data.userId) {
      login();
      history.push('/dashboard');
    }
  }, 1000, true);

  const cartObserver = () => {
    if (!cartId) {
      return () => {};
    }

    return Database.get('Carts', cartId)
      .onSnapshot(cartSnapshot);
  };

  React.useEffect(() => {
    if (cartId) {
      Cache.store(Cache.KEYS.CART_ID, cartId);
    }

    return cartObserver();
  }, [cartId]);

  React.useEffect(() => {
    const cartId = Cache.retrieve(Cache.KEYS.CART_ID);

    (async() => {
      try {
        // Cart Referente
        const cart = Database.get('Carts', cartId);
        // Clean Up Cart
        await cart.set({ userId: false });
        // Set local cartId
        setCartId(cart.id);
      } catch (e) {
        // Do nothing
      }
    })();
  }, []);

  return cartId ? <QRCode value={cartId} /> : null;
};

const mapDispatchToProps = dispatch => ({
  login: () => dispatch({ type: 'LOGIN' })
});

export default connect(null, mapDispatchToProps)(SignIn);
