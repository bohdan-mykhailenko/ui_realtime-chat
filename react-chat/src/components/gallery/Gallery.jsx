import React, { useState, useContext, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import classes from './Gallery.module.css';
import Loader from '../loader/Loader';
import { Context } from '../../index';
import { useAuthState } from 'react-firebase-hooks/auth';

const Gallery = () => {
  const [isActiveImg, setIsActiveImg] = useState(true);
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);

  const identifyUser = () => {
    if (
      user.uid == '27ofykS3n6hxFTDUzJAOAeIuCj93' ||
      user.uid == 'ccVxAhtSqjnXIxrCTit2R3jjhlao2' ||
      user.uid == 'gZYsZRVXbOMcCVJGRdiJP4bTUoW2' ||
      user.uid == 'lQ8gTXdhvFN7UtS598LLW5walEx2' ||
      user.uid == '27h9xSZ6xQU2SKoHlTs58Jg0UcC3' ||
      user.uid == 'nrKmbtMoJ5RFQUiMkPALm9Uxx6y2') {
      return ['messages', 'photos'];
    } else {
      return ['messages2', 'photos2'];
    }
  }

  const [photoCollection, setPhotoCollection] = useState(identifyUser()[1]);
  const [photos, loading] = useCollectionData(
    firestore.collection(photoCollection).orderBy('createdAt')
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