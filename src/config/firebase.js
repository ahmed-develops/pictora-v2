import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCpJ84znEIjGwMheMxt6xuVntF5fQtE_Wk",
    authDomain: "pictora-9b0f9.firebaseapp.com",
    projectId: "pictora-9b0f9",
    storageBucket: "pictora-9b0f9.firebasestorage.app",
    messagingSenderId: "513972277593",
    appId: "1:513972277593:web:a4e08fa85f09b90615bc48",
    measurementId: "G-GH0NEV5VZF"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app); 
  
  export { auth, db, storage }; 