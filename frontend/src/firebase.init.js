import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDc3qeuloEiq_lqW4JXRUKtFHp-JRD9J5g",
  authDomain: "twitter-clone-56a81.firebaseapp.com",
  projectId: "twitter-clone-56a81",
  storageBucket: "twitter-clone-56a81.appspot.com",
  messagingSenderId: "1041988341010",
  appId: "1:1041988341010:web:8770603df34ec1f4b237cb",
  measurementId: "G-BTF89187X1",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export default auth;
