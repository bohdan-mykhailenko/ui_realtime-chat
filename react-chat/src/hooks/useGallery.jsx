import { useState, useEffect } from 'react';

export const useGallery = (defaltValue) => {
  const [isVisibleGallery, setIsVisibleGallery] = useState(localStorage.getItem('app-gallery') || defaltValue);

  useEffect(() => {
    localStorage.setItem('app-gallery', JSON.stringify(isVisibleGallery))
  }, [isVisibleGallery]);

  return { isVisibleGallery, setIsVisibleGallery }
}