import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAlsiVP_iI6rBjh0iCH_VmB9p4nwVl9s2o",
  authDomain: "se-2-88cdb.firebaseapp.com",
  databaseURL:
    "https://se-2-88cdb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "se-2-88cdb",
  storageBucket: "se-2-88cdb.appspot.com",
  messagingSenderId: "164320218054",
  appId: "1:164320218054:web:318447997b6142e5ad40c7",
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
const analytics = firebase.analytics();
analytics.logEvent("Notification test");

export const googleProvider = new firebase.auth.GoogleAuthProvider();

const useEmulator = true;
if (useEmulator) {
  db.useEmulator("localhost", 8080);
  auth.useEmulator("http://localhost:9099");
}

//util funciton
export const transformCollectionIntoMap = (collection) => {
  return collection.map((doc) => {
    return doc.data();
  });
};
