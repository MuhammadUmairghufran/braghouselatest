import * as firebase from 'firebase'
import { firebaseConfig } from './configs'
import '@firebase/firestore'

let instance = null

class FirebaseService {
  constructor() {
    if (!instance) {
      instance = this;
      
      this.app = firebase.initializeApp(firebaseConfig);
      const firestore = firebase.firestore();
      const settings = { timestampsInSnapshots: true }

      //firestore.settings(settings);
      
      firestore.enablePersistence()
        .catch(function (err) {
          console.log("FirebaseError", err)
        });
    }
    return instance
  }
}

const firebaseService = new FirebaseService().app
export default firebaseService;