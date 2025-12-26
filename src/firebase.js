import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOVXTP10d-dMt3iv59hEtABpQLgLU0Ijw",
  authDomain: "todoapp-d999f.firebaseapp.com",
  projectId: "todoapp-d999f",
  storageBucket: "todoapp-d999f",
  messagingSenderId: "24368827782",
  appId: "1:24368827782:web:9ef631a8af494fa73d7007"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);