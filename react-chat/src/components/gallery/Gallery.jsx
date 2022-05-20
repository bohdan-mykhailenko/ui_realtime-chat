import React, { useState, useContext } from 'react';
import { Context } from '../../index';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import classes from './Gallery.module.css';
import Loader from '../loader/Loader';

const Gallery = () => {
  const { firestore } = useContext(Context);
  const [isActive, setActive] = useState("false");
  const [isUnActive, setIsUnActive] = useState("false");
  const [photos, loading] = useCollectionData(
    firestore.collection('photos').orderBy('createdAt')
  )

  if (loading) {
    return <Loader />
  }

  return (
    <div className={classes.gallery}>
      {photos?.map((photo) =>
        <div
          className={classes.galleryItem}
          onClick={(event) => {
            setActive(!isActive);
            event.target.className = isActive ? classes.galleryImgActive : classes.galleryImg;


            const el = event.currentTarget;
            const siblings = el => [].slice.call(el.parentNode.children).filter(child => (child !== el));
            siblings(el).forEach((item) => {
              item.className = isActive ? classes.galleryItemUnactive : classes.galleryItem;
            })


          }
          }>
          <img className={classes.galleryImg} src={photo.URL} alt="" />
        </div>
      )
      }
    </div >
  )
}

export default Gallery;