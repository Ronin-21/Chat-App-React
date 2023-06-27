// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
	authDomain: 'chat-app-react-442b0.firebaseapp.com',
	projectId: 'chat-app-react-442b0',
	storageBucket: 'chat-app-react-442b0.appspot.com',
	messagingSenderId: '1056150773690',
	appId: '1:1056150773690:web:6111151ef6ff810fb44783',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
