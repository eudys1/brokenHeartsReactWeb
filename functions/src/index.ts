
// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
// const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
import admin = require("firebase-admin");
admin.initializeApp();

// exports.deleteUser = functions.https.onCall(async (data, context) => {
// 	// if (!context.auth.token.admin) return
// 	const { uid } = data;
// 	if (!uid) return { error: "Please enter an UID" };
// 	try {
// 		// return the promise from here
// 		// await 
// 		const user = await admin.auth();

// 		// console.log("Successfully deleted user");
// 		return console.log(user);

// 	} catch (error) {
// 		console.log("error deleting user", error);
// 		return { error };
// 	}
// });
