import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';

import Login from './app/Pages/Login';
import Cache from './core/Cache';

const App = () => {
  const [cartId, setCartId] = React.useState();
  const [userId, setUserId] = React.useState();

  React.useEffect(() => {
    retrieveCartId();
  }, []);

  React.useEffect(() => {
    let subscriber = () => {};
    if (cartId) {
      Cache.store(Cache.KEYS.CART_ID, cartId);
  
      const db = firebase.firestore();
      subscriber = db.collection('Carts')
        .doc(cartId)
        .onSnapshot(documentSnapshot => {
          const data = documentSnapshot.data();
          setUserId(data.userId);
          associateUser(data.userId, cartId);
        });
    }

    return () => subscriber();
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

  const associateUser = async(userId, cartId) => {
    const db = firebase.firestore();
    if (userId && cartId) {
      try {
        await db.collection('Users')
          .doc(userId)
          .set({ cartId });
      } catch (e) {
        console.error(e);
      }
    }
  }

  return (
    <div id="wrapper">
      <Login cartId={cartId} />
      {userId ? <h1>{`Usuário conectado: ${ userId }`}</h1> : null}
    </div>
  );
}

export default App;
