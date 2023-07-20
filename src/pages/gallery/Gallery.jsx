import React, { useState, useContext, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import classes from './Gallery.module.css';
import Loader from '../../components/loader/Loader';
import { FirebaseContext } from '../../contexts/FirebaseContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useUser } from '../../hooks/useUser';

const Gallery = () => {
  const [isActiveImg, setIsActiveImg] = useState(true);
  const { auth, firestore } = useContext(FirebaseContext);
  const [user] = useAuthState(auth);

  const { collections } = useUser(user);

  const [photos, loading] = useCollectionData(
    firestore.collection(collections[1]).orderBy('createdAt')
  )

  const handleClickImg = (event) => {
    setIsActiveImg(!isActiveImg);

    const activeImg = event.currentTarget;
    const siblings = (activeImg) => [].slice.call(activeImg.parentNode.children).filter(child => (child !== activeImg));

    siblings(activeImg).forEach((item) => {
      item.className = isActiveImg ? classes.galleryItemUnactive : classes.galleryItem;
    })

    event.target.className = isActiveImg ? classes.galleryImgActive : classes.galleryImg;
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className={classes.gallery}>
      {photos?.map((photo) =>
        <div
          className={classes.galleryItem}
          onClick={(event) => handleClickImg(event)}>
          <img className={classes.galleryImg} src={photo.URL} alt="" />
        </div>
      )}
    </div>
  )
}

export default Gallery;