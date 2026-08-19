import { useState, useEffect } from 'react';
import {Fab, Tooltip} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 網頁總可滾動高度 = 整個文件的總高度 - 瀏覽器視窗高度
      const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      // 當前滾動的距離
      const currentScroll = window.scrollY;

      // 如果滾動超過總高度的一半 (50%)，就顯示按鈕
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

  // 如果還沒滾動到一半，就不渲染按鈕
  if (!isVisible) return null;

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