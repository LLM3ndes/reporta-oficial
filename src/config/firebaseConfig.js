import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; 

const firebaseConfig = {
  apiKey: "AIzaSyAlfBHPa2MyH5Ghi0urf7CicFBmXXohIf4",
  authDomain: "reporta-e925c.firebaseapp.com",
  projectId: "reporta-e925c",
  storageBucket: "reporta-e925c.appspot.com",
  messagingSenderId: "367375628588",
  appId: "1:367375628588:web:7563198084725356942078"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); 