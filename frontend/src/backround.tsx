import React from 'react';
import '../backround.css';

interface BackgroundProps {
  children?: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <div className='square-to-octagon'>
      <div className='center'>
        {children}
      </div>
    </div>
  );
};

export default Background;
