// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore }  from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


 export const firebaseConfig = {
  apiKey: "AIzaSyC4EybVkF4pCgoR4gU7on_0f-1PBT5UAE8",
  authDomain: "petfriends-f4ccb.firebaseapp.com",
  projectId: "petfriends-f4ccb",
  storageBucket: "petfriends-f4ccb.appspot.com",
  messagingSenderId: "514435827034",
  appId: "1:514435827034:web:f47f355f33b5b1bcdedf63",
  measurementId: "G-VLJNDD9FFV"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export default db;






