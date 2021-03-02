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
}

export default new Database();
