import { useState, useEffect } from 'react';

export const useGallery = () => {
  const [isVisibleGallery, setIsVisibleGallery] = useState(localStorage.getItem('app-gallery'));

  useEffect(() => {
    localStorage.setItem('app-gallery', JSON.stringify(isVisibleGallery))
  }, [isVisibleGallery]);

  return { isVisibleGallery, setIsVisibleGallery }
}