
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs } = require("firebase/firestore");
const path = require("path");
const dotenv = require("dotenv");

// Load env
const envPath = path.resolve(__dirname, "../.env.local");
const result = dotenv.config({ path: envPath });

if (result.error) {
    console.error("Error loading .env.local:", result.error);
}

console.log("Loading config from:", envPath);
console.log("PROJECT_ID:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Check for undefined values
Object.entries(firebaseConfig).forEach(([key, value]) => {
    if (value === undefined) {
        console.warn(`Warning: ${key} is undefined`);
    }
});

try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    console.log("Initialized Firebase. Fetching teams...");

    getDocs(collection(db, "teams"))
        .then(snap => {
            console.log(`Success! Found ${snap.size} teams.`);
            snap.forEach(d => console.log(d.id, d.data().name));
        })
        .catch(err => {
            console.error("Error fetching teams:", err);
        });

} catch (error) {
    console.error("Initialization Error:", error);
}
