import React from 'react';
import QRCode from 'react-qr-code';

import firebase from 'firebase/app';
import 'firebase/firestore';

import Cache from '../../core/Cache';

const Login = () => {
  const [cartId, setCartId] = React.useState();

  React.useEffect(() => {
    retrieveCartId();
  }, []);

  React.useEffect(() => {
    Cache.store(Cache.KEYS.CART_ID, cartId);
  }, [cartId]);

  const retrieveCartId = async() => {
    try {
      const cartId = Cache.retrieve(Cache.KEYS.CART_ID);
      const cartReference = upsertCart(cartId);
      await cartReference.set({ userId: false });
      setCartId(cartReference.id);
    } catch (e) {
      console.error(e);
    }
  }

  const upsertCart = (cartId) => {
    const db = firebase.firestore();
    if (cartId) {
      return db.collection('Carts').doc(cartId);
    }
    return db.collection('Carts').doc();
  }

  return cartId ? <QRCode value={cartId} /> : null;
}

export default Login;
