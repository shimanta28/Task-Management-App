import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDS8BTChJQsEdtSa3FqaNmuyuZXpgOKaXE",
  authDomain: "task-management-ddb8d.firebaseapp.com",
  databaseURL: "https://task-management-ddb8d-default-rtdb.firebaseio.com",
  projectId: "task-management-ddb8d",
  storageBucket: "task-management-ddb8d.appspot.com",
  messagingSenderId: "166857639306",
  appId: "1:166857639306:web:914b9b65bd77692b957473",
  measurementId: "G-VJQF5FB00L"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase(app);
