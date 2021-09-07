import firebase from 'firebase/app'
import 'firebase/auth'


export const auth = firebase.initializeApp ({
        apiKey: "AIzaSyB1avQiPz4RLFgJAEGJnEU7tre91LyHKks",
        authDomain: "unuc-6f3e6.firebaseapp.com",
        projectId: "unuc-6f3e6",
        storageBucket: "unuc-6f3e6.appspot.com",
        messagingSenderId: "460459089546",
        appId: "1:460459089546:web:3ae400ebf60cb91f2a9773"
    }).auth();