import React, { useContext, useState, useRef, useEffect } from 'react';
import firebase from "firebase/compat/app";
import { doc } from 'firebase/firestore';

export let idArr = [];
//const { firestore } = useContext(Context);

export const getID = (firestore) => {
  firestore.collection('messages').orderBy('createdAt').then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      idArr.push(doc.id);
    });
  })
}
