import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDqNYJXnxShPmly5yhuXhmlRVELqr_jdQg",
	authDomain: "board-10572.firebaseapp.com",
	projectId: "board-10572",
	storageBucket: "board-10572.appspot.com",
	messagingSenderId: "261625006851",
	appId: "1:261625006851:web:812a78cac28a76dbebb736",
	measurementId: "G-58CKT7S033"
  };
  
  // Initialize Firebase

  const app = initializeApp(firebaseConfig);
  const firestoreDB = getFirestore(app);

  export default firestoreDB
