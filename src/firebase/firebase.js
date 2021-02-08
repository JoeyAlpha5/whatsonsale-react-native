import * as firebase from 'firebase';
import '@firebase/auth';
var app;
// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyCecGWZmZCoBSvXlmlFj8f-VkJHulQMDkw",
authDomain: "whatsonsale-795d7.firebaseapp.com",
databaseURL: "https://whatsonsale-795d7.firebaseio.com",
projectId: "whatsonsale-795d7",
storageBucket: "whatsonsale-795d7.appspot.com",
messagingSenderId: "163004189874",
appId: "1:163004189874:web:ea3d66194bd2ca3bac4dab"
};

if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
}

//sign up
export const authentication = firebase.auth();
export {firebase}