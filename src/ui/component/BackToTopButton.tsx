import { useState, useEffect } from 'react';
import {Fab, Tooltip} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (currentScroll > totalScrollableHeight / 2) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
      <Tooltip title="Back To Top">
        <Fab
            size="small"
            aria-label="back to top"
            onClick={scrollToTop}
            sx={{
              backgroundColor: "#607D8B",
              position: 'fixed',
              bottom: 32,
              right: 32,
              zIndex: 1000,
            }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Tooltip>
  );
}