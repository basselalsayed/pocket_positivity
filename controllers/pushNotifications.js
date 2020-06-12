// const admin = require('firebase-admin');
// const axios = require('axios');
// const chunkArray = require('./chunkArray');
// const firestore = admin.firestore();

// async function pushNotifications(req, res) {
//   try {
//     const data = req.body;

//     // Get users from Firestore, then build notifications array
//     await firestore
//       .collection('users')
//       .get()
//       .then((querySnapshot) => {
//         if (querySnapshot.size) {
//           // This array will contain each user’s notification
//           let notificationsArray = [];

//           querySnapshot.forEach((doc) => {
//             let docData = doc.data();
//             if (docData && docData.d) {
//               let userData = docData.d;

//               // The pushNotificationsToken retrieved from the app and stored in Firestore

//               if (userData.pushNotificationsToken) {
//                 notificationsArray.push({
//                   to: userData.pushNotificationsToken,
//                   ...data,
//                 });
//               }
//             }
//           });

//           // Send notifications to 100 users at a time (the maximum number that one Expo push request supports)

//           let notificationsChunks = chunkArray(notificationsArray, 100);
//           notificationsChunks.map((chunk) => {
//             axios({
//               method: 'post',
//               url: 'https://exp.host/--/api/v2/push/send',
//               data: chunk,
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//             });
//           });
//           return res.status(200).send({ message: 'Notifications sent!' });
//         } else {
//           return res.status(404).send({ message: 'No users found' });
//         }
//       })
//       .catch((error) => {
//         return res
//           .status(500)
//           .send({ message: `${error.code} - ${error.message}` });
//       });
//   } catch (error) {
//     return res
//       .status(500)
//       .send({ message: `${error.code} - ${error.message}` });
//   }
// }

// module.exports = pushNotifications;
