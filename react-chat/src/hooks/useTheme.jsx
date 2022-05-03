import { documentId } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';


const isDarkTheme = window?.matchMedia('(prefers-color-scheme: dark').matches;


const defaultTheme = isDarkTheme ? 'dark' : 'light';

export const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem('app-theme') || defaultTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme)
  }, [theme]);

  return { theme, setTheme }
}