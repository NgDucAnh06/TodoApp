import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyDXHy5ZYsja8hbmevb-1pvG7wlwYqNYyrk",
  authDomain: "todo-92da5.firebaseapp.com",
  projectId: "todo-92da5",
  storageBucket: "todo-92da5.firebasestorage.app",
  messagingSenderId: "333156752552",
  appId: "1:333156752552:web:0e1ff02daf627f7a55769d",
  measurementId: "G-C6FZKZ4DTG"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);