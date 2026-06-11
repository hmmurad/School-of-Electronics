import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../../firebase-applet-config.json';

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Use default database if user provided their own project, otherwise use the specific AI Studio Database ID
const dbId = (firebaseConfig as any).firestoreDatabaseId;
export const db = (firebaseConfig.projectId !== 'hallowed-stock-x52jj') 
  ? getFirestore(app) 
  : getFirestore(app, dbId);
