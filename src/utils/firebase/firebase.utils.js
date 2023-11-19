import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCemJQAhK7uC_ScDrJ-y6i8gGuyNxnBZmo",
  authDomain: "crwn-clothing-db-49c4b.firebaseapp.com",
  projectId: "crwn-clothing-db-49c4b",
  storageBucket: "crwn-clothing-db-49c4b.appspot.com",
  messagingSenderId: "153325569000",
  appId: "1:153325569000:web:0d492691826c13a54b9a5d"
};

const app = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);

  console.log(userSnapshot)
  console.log(userSnapshot.exists())

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    }catch(error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
}