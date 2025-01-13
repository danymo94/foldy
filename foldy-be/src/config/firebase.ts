// Import the firebase-admin module and other necessary modules
import admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import * as dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Parse the Firebase service account from environment variables
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT as string) as ServiceAccount;

// Initialize the Firebase app with the service account credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Export Firestore and Auth instances for use in other parts of the application
export const firestore = admin.firestore();
export const auth = admin.auth();
