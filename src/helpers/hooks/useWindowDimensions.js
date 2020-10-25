import { useState, useEffect } from 'react';

function getWindowDimensions() {
  if (typeof window !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  return { width: 1920, height: 1080 };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    if (typeof window !== "undefined") {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener('resize', handleResize)
      }
    };
  }, []);

  return windowDimensions;
}
