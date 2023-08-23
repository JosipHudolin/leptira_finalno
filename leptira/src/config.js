// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAqDClsHyHi2pFx4NtUS6cu0mZ830JUe4",
  authDomain: "leptira-4ded2.firebaseapp.com",
  projectId: "leptira-4ded2",
  storageBucket: "leptira-4ded2.appspot.com",
  messagingSenderId: "235629339396",
  appId: "1:235629339396:web:898d4e2bdb750241736651",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore(app);

// Get a list of cities from your database
// async function getCities(db) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }
