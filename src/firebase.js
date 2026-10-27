
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCe19pXHk19Wj87MDGf_LLmXmcBRFxGTis",
  authDomain: "herspace-e0e30.firebaseapp.com",
  projectId: "herspace-e0e30",
  storageBucket: "herspace-e0e30.firebasestorage.app",
  messagingSenderId: "21365015478",
  appId: "1:21365015478:web:a7b2e7f35eaf37bb7a3717",
  measurementId: "G-E0N7WEHFHX"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});
