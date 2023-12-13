// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWN_QxwyiACoz_w4S7Cy12CO2lE9FxzKY",
  authDomain: "cashflow-58c32.firebaseapp.com",
  projectId: "cashflow-58c32",
  storageBucket: "cashflow-58c32.appspot.com",
  messagingSenderId: "653027120185",
  appId: "1:653027120185:web:75b91af35a43812c73a9e8",
  measurementId: "G-VT482XZX1V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);