import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBDi-LwDBDBkCYYd6VXa1o1BrNmx06dg34",
  authDomain: "nextjs-firebase-chat-app.firebaseapp.com",
  projectId: "nextjs-firebase-chat-app",
  storageBucket: "nextjs-firebase-chat-app.appspot.com",
  messagingSenderId: "38372124480",
  appId: "1:38372124480:web:857463cf204b298f7a3ca5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth, Firestore, and Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };