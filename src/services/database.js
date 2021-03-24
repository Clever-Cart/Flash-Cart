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
}

export default new Database();
