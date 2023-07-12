import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore, persistentLocalCache, CACHE_SIZE_UNLIMITED, persistentMultipleTabManager} from "firebase/firestore";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_GA_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

initializeFirestore(app, {
	localCache: persistentLocalCache(CACHE_SIZE_UNLIMITED, {tabManager: persistentMultipleTabManager()})
});

const database = getFirestore(app);

export default database;

/* const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export default database; */