import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAcx_9GSBaqQICH85Ll_T66AkcCQJ0EKQo",
  authDomain: "task-management-app-33c94.firebaseapp.com",
  projectId: "task-management-app-33c94",
  storageBucket: "task-management-app-33c94.appspot.com",
  messagingSenderId: "534252496347",
  appId: "1:534252496347:web:e84c9089bc92b12ea733fe",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase(app);
