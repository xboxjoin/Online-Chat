import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyCHNSnCps6kbXsBf3IDWjNqf1ZGQs8LLdY",
    authDomain: "aidar-chat-app.firebaseapp.com",
    projectId: "aidar-chat-app",
    storageBucket: "aidar-chat-app.appspot.com",
    messagingSenderId: "17787584713",
    appId: "1:17787584713:web:4c38bea41cd68cd8658d18",
    measurementId: "G-HZJRX0VK8T"
    }
);

export const Context = createContext(null)

const auth = firebase.auth()
const firestore = firebase.firestore()


ReactDOM.render(
    <Context.Provider value={{
        firebase,
        auth,
        firestore
    }}>
        <App />
    </Context.Provider>,
    document.getElementById('root')
);
