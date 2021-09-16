const admin = require('firebase-admin')

const serviceAccount = require('./youconnect-7576a-firebase-adminsdk-fasx7-4c53be9d64.json')
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
      'https://youconnect-7576a-default-rtdb.europe-west1.firebasedatabase.app',
  })
} catch (error) {}

export const firestore = admin.firestore()
