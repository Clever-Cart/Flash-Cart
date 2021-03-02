import React from 'react';
import QRCode from 'react-qr-code';

import Cache from '../services/cache';
import Database from '../services/database';

const SignIn = ({ history }) => {
  const [cartId, setCartId] = React.useState();

  const cartObserver = () => {
    if (!cartId) {
      return () => {};
    }

    return Database.get('Carts', cartId)
      .onSnapshot(documentSnapshot => {
        const data = documentSnapshot.data();

        if (data && data.userId) {
          history.push('/dashboard');
        }
      });
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

export default SignIn;
