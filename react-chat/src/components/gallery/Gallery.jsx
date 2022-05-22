import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../../index';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import classes from './Gallery.module.css';
import Loader from '../loader/Loader';

const Gallery = () => {
  const { firestore } = useContext(Context);
  const [isActiveImg, setIsActiveImg] = useState(false);
  const [photos, loading] = useCollectionData(
    firestore.collection('photos').orderBy('createdAt')
  )

  const handleActiveImg = (event) => {
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
          onClick={(event) => handleActiveImg(event)}>
          <img className={classes.galleryImg} src={photo.URL} alt="" />
        </div>
      )}
    </div>
  )
}

export default Gallery;