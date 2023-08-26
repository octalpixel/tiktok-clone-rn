/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import functions = require("firebase-functions");

import admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

exports.newUser = functions.auth.user().onCreate((user) => {
  return db
    .collection("user")
    .doc(user.uid)
    .create(JSON.parse(JSON.stringify(user)));
});

exports.likeCreate = functions.firestore
  .document("post/{id}/likes/{uid}")
  .onCreate((_, context) => {
    return db
      .collection("post")
      .doc(context.params.id)
      .update({
        likesCount: admin.firestore.FieldValue.increment(1),
      });
  });

exports.likeDelete = functions.firestore
  .document("post/{id}/likes/{uid}")
  .onDelete((_, context) => {
    return db
      .collection("post")
      .doc(context.params.id)
      .update({
        likesCount: admin.firestore.FieldValue.increment(-1),
      });
  });
