import React, { useEffect, useState } from 'react';

function List() {
  const [savedImages, setSavedImages] = useState([]);

  useEffect(() => {
    const loadSavedImages = () => {
      const saved = JSON.parse(localStorage.getItem('savedImages')) || [];
      setSavedImages(saved);
    };

    loadSavedImages();
  }, []);

  return (
    <div className='flex flex-wrap items-center py-12 px-32 gap-8'>
      {savedImages.length > 0 ? (
        savedImages.map(({ src, code }, index) => (
          <div key={index} className='relative'>
            <img
              className='w-72 mt-4 cursor-pointer'
              src={src}
              alt={`Saved Dog ${code}`}
            />
          </div>
        ))
      ) : (
        <p className='mt-4'>No saved images.</p>
      )}
    </div>
  );
}

export default List;
