import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfzeP5KVqox6kgJq-QasnclqtCTNyD1iA",
  authDomain: "emailai-80175.firebaseapp.com",
  projectId: "emailai-80175",
  storageBucket: "emailai-80175.appspot.com",
  messagingSenderId: "30027327928",
  appId: "1:30027327928:web:9c5553eb0410afafb8474d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);