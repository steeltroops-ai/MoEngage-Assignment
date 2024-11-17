import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ListDetail({ isEditMode }) {
  const { listName } = useParams();
  const [images, setImages] = useState([]);
  const [currentListName, setCurrentListName] = useState(listName);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLists = JSON.parse(localStorage.getItem('savedLists')) || [];
    const list = savedLists.find(list => list.name === listName);
    if (list) {
      setImages(list.images);
    }
  }, [listName]);

  const handleRemoveImage = (code) => {
    const updatedImages = images.filter(image => image.code !== code);
    setImages(updatedImages);

    const savedLists = JSON.parse(localStorage.getItem('savedLists')) || [];
    const updatedLists = savedLists.map(list =>
      list.name === listName ? { ...list, images: updatedImages } : list
    );
    localStorage.setItem('savedLists', JSON.stringify(updatedLists));
  };

  const handleSaveListName = () => {
    const savedLists = JSON.parse(localStorage.getItem('savedLists')) || [];
    const updatedLists = savedLists.map(list =>
      list.name === listName ? { ...list, name: currentListName } : list
    );
    localStorage.setItem('savedLists', JSON.stringify(updatedLists));
    navigate(`/list/${currentListName}`);
  };

  return (
    <div className='relative flex flex-col items-center min-h-screen px-8 py-12 bg-gray-100'>
      {isEditMode ? (
        <input
          type='text'
          value={currentListName}
          onChange={(e) => setCurrentListName(e.target.value)}
          className='w-full p-2 mb-4 text-2xl font-bold border border-gray-300 rounded'
        />
      ) : (
        <h2 className='w-full mb-4 text-2xl font-bold'>{listName}</h2>
      )}
      
      {images.length > 0 ? (
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {images.map(({ src, code }) => (
            <div key={code} className='relative flex flex-col items-center p-4 bg-white rounded-lg shadow-lg'>
              <img className='mt-4 rounded-lg w-72' src={src} alt={`HTTP Dog ${code}`} />
              {isEditMode && (
                <button 
                  className='px-4 py-2 mt-2 text-white transition duration-300 bg-red-500 rounded hover:bg-red-600' 
                  onClick={() => handleRemoveImage(code)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className='mt-4 text-lg text-gray-700'>No images found in this list.</p>
      )}

      {isEditMode && (
        <button 
          className='absolute px-4 py-2 text-white transition duration-300 bg-green-500 rounded top-2 right-2 hover:bg-green-600' 
          onClick={handleSaveListName}
        >
          Save List Name
        </button>
      )}
      <button 
        className='absolute px-4 py-2 text-white transition duration-300 bg-blue-800 rounded top-2 left-2 hover:bg-blue-900' 
        onClick={() => navigate('/lists')}
      >
        Back to Lists
      </button>
    </div>
  );
}

export default ListDetail;