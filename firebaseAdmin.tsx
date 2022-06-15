
import admin from "firebase-admin";
const app = !admin.apps.length ? admin.initializeApp() : admin.app();
import { fireConfig } from './firebasekeys'
import fireConfig2 from './firebasekeys.json'

// let serviceAccount = require(JSON.parse(JSON.stringify(serviceAccount)));
if (!admin.apps.length) {
    admin.initializeApp({
        // databaseURL: '',
        credential: admin.credential.cert(JSON.parse(JSON.stringify(fireConfig2))),

    });
}
export default admin;


// ==========================================================


// import admin from 'firebase-admin'
// import { fireConfig } from './firebasekeys'

// try {
//   admin.initializeApp({
//     credential: admin.credential.cert(JSON.stringify(fireConfig)),
//   })
//   console.log('Initialized.')
// } catch (error:any) {
//   /*
//    * We skip the "already exists" message which is
//    * not an actual error when we're hot-reloading.
//    */
//   if (!/already exists/u.test(error.message)) {
//     console.error('Firebase admin initialization error', error.stack)
//   }
// }

// export default admin


// ==========================================================

