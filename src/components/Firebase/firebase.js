import app from "firebase/app";
import "firebase/auth";

import * as ENV_CONFIG from '../../constants/.env';

const config = {
  apiKey: ENV_CONFIG.API_KEY,
  authDomain: ENV_CONFIG.AUTH_DOMAIN,
  databaseURL: ENV_CONFIG.DATABASE_URL,
  projectId: ENV_CONFIG.PROJECT_ID,
  storageBucket: ENV_CONFIG.STORAGE_BUCKET,
  messagingSenderId: ENV_CONFIG.MESSAGING_SENDER_ID,
  };

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }

  //! *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;
