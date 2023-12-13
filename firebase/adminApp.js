var firebaseAdmin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const { getAuth } = require("firebase-admin/auth");

var serviceAccount = require("../public/firebase-service-acc-key.json");

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
  });
}
const db = getFirestore();
const auth = getAuth();

export { firebaseAdmin, db, auth };
