import { useState, useEffect } from 'react';

export const useGallery = () => {
  const [isVisibleGallery, setIsVisibleGallery] = useState(
    localStorage.getItem('gallery'),
  );

  useEffect(() => {
    localStorage.setItem('gallery', JSON.stringify(isVisibleGallery));
  }, [isVisibleGallery]);

  return { isVisibleGallery, setIsVisibleGallery };
};
