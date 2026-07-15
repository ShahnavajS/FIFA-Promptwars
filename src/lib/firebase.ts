import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";
import { env } from "@/config/env";

const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});

const storage = getStorage(app);

const analytics =
  typeof window !== "undefined"
    ? isSupported().then((supported) => (supported ? getAnalytics(app) : null))
    : Promise.resolve(null);

export { app, auth, db, storage, analytics };
