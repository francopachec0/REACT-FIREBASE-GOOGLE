// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDqg6VGSoNy7SgMjjOrhEaYGfHm1CEmcqI",
    authDomain: "my-firebase-app-a23f6.firebaseapp.com",
    projectId: "my-firebase-app-a23f6",
    storageBucket: "my-firebase-app-a23f6.appspot.com",
    messagingSenderId: "131480713324",
    appId: "1:131480713324:web:61e6b105f3126c95c28049"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);