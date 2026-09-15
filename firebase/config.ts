import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBEXm8exL-Qa06DIaXrkP3Dx-wFKeLRn0",
  authDomain: "smart-hospital-34efe.firebaseapp.com",
  projectId: "smart-hospital-34efe",
  storageBucket: "smart-hospital-34efe.firebasestorage.app",
  messagingSenderId: "597220509583",
  appId: "1:597220509583:web:5c8def158b54dcbb59adfa",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);