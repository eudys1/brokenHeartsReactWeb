import type { NextApiRequest, NextApiResponse } from "next";
import { getFunctions } from "firebase/functions";
import admin from "../../firebaseAdmin";

export default async function handler(req: NextApiRequest,res: NextApiResponse) {

	const body = JSON.parse(req.body);
	const functions = getFunctions();
	// const deleteUser = httpsCallable(functions, "deleteUser");
  // const admin = require("firebase-admin");
  // admin.initializeApp()

	try {
		// const deleteUser = httpsCallable(functions, "deleteUser");
		// await deleteUser(body);

    // await admin.auth().getUser("AJjC8QIMlCVduZrBRaV8bhBqyKJ2");
    console.log("idk2: ",  admin);
    
		res.status(200).json({ message: "ok" });

    
	} catch (error) {
		console.log("error: ", error);
		res.status(500).json({ error });
	}
}
