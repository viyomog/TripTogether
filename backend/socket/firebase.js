const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

const privateKey = process.env.FIREBASE_PRIVATE_KEY;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const projectId = process.env.FIREBASE_PROJECT_ID;

if (!privateKey || !clientEmail || !projectId) {
  console.error("Firebase Admin Error: Missing environment variables.");
  console.log("Check FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL, and FIREBASE_PROJECT_ID in .env");
} else {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: projectId,
        clientEmail: clientEmail,
        privateKey: privateKey.replace(/\\n/g, '\n'),
      }),
    });
    console.log("Firebase Admin initialized successfully".magenta.bold);
  } catch (error) {
    console.error("Firebase Admin initialization error:", error);
  }
}

module.exports = admin;
