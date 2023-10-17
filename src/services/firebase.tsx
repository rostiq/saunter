
import { initializeApp } from "firebase/app";
import { addDoc, collection,getFirestore } from "firebase/firestore";
import { AddRouteType, Route } from "../types";

const firebaseConfig = {
  apiKey: "AIzaSyCEpYPb7jyiK8NBJE5MdBnUTvbYfWxSuwk",
  authDomain: "saunter-app-a6c0c.firebaseapp.com",
  databaseURL: "https://saunter-app-a6c0c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "saunter-app-a6c0c",
  storageBucket: "saunter-app-a6c0c.appspot.com",
  messagingSenderId: "668687667094",
  appId: "1:668687667094:web:26b4f54e26b105f143d7b7",
  measurementId: "G-MM6LZTS5ND"
};


const app = initializeApp(firebaseConfig);

const firestore =  getFirestore(app);

export const routesCollection = collection(firestore, "routes");

// Add new document

export const addNewDocument = async (data: AddRouteType) => {
  try {
    const docRef = await addDoc(routesCollection, {...data});
    console.log("💅🏼 ~ docRef:", docRef)
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// remove document?

