import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBIy5jVhQsEVZepRjG6TEURQ5UOysaJ08E",
    authDomain: "crwn-db-86cf1.firebaseapp.com",
    databaseURL: "https://crwn-db-86cf1.firebaseio.com",
    projectId: "crwn-db-86cf1",
    storageBucket: "",
    messagingSenderId: "523043551697",
    appId: "1:523043551697:web:0b66bc6b3884aaa53dc8f0"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error){
      console.log('error creating user',error.message);
    }
  }

  return userRef;
}

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;