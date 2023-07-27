import firebase from "firebase/compat/app";

export const postMessage = async (
  user,
  firestore,
  collections,
  value,
  imageURL,
  messageId,
  photoId,
) => {
  await firestore.collection(collections[0]).doc(String(messageId)).set({
    id: messageId,
    uid: user.uid,
    displayName: user.displayName,
    photoURL: user.photoURL,
    text: value,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    image: imageURL,
    like: false,
  })

  if (imageURL) {
    await firestore.collection(collections[1]).doc(messageId).add({
      id: photoId,
      URL: imageURL,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
  }

  // firestore.collection(collections[0])
  //   .orderBy('createdAt')
  //   .get()
  //   .then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       arrayOfID.add(doc.id);
  //     });
  //   });
}
