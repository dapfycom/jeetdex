import { useEffect, useState } from 'react';

const useIsMobile = (widthThreshold: number = 640) => {
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < widthThreshold
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < widthThreshold);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [widthThreshold]);

  return isMobile;
};

export default useIsMobile;
