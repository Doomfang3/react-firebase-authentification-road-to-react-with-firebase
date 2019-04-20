import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

import * as ENV_CONFIG from "../../constants/.env";

const config = {
  apiKey: ENV_CONFIG.API_KEY,
  authDomain: ENV_CONFIG.AUTH_DOMAIN,
  databaseURL: ENV_CONFIG.DATABASE_URL,
  projectId: ENV_CONFIG.PROJECT_ID,
  storageBucket: ENV_CONFIG.STORAGE_BUCKET,
  messagingSenderId: ENV_CONFIG.MESSAGING_SENDER_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  //! *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  //! *** Merge Auth and DB User API ***

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then(snapshot => {
            const dbUser = snapshot.val();
            //* Default empty roles
            if (!dbUser.roles) {
              dbUser.roles = [];
            }
            //* Merge Auth and DB User
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });

  //! *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");
}

export default Firebase;
