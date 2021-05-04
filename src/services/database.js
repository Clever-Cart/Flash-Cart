import firebase from 'firebase/app';
import 'firebase/firestore';

class Database {
  get(collection, identifier) {
    const db = firebase.firestore()
    if (identifier) {
      return db.collection(collection).doc(identifier);
    }
    return db.collection(collection).doc();
  }

  getProducts(cartId, callback) {
    const db = firebase.firestore()
    db.collection('Carts').doc(cartId).collection('Products').onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => {
          return doc.data();
        })
        callback(data)
    });
  }

  getMaps(cartId, callback) {
    const db = firebase.firestore()
    db.collection('Carts').doc(cartId).collection('Maps').onSnapshot((querySnapshot) => {
      const data = querySnapshot.docs.map(doc => {
        return doc.data();
      });
      console.log(data[0].picture);
      callback(data[0].picture)
    });
  }
}

export default new Database();
