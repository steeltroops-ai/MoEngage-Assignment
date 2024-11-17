import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Lists() {
  const [savedLists, setSavedLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const lists = JSON.parse(localStorage.getItem('savedLists')) || [];
    setSavedLists(lists);
  }, []);

  const handleDeleteList = (listName) => {
    const updatedLists = savedLists.filter(list => list.name !== listName);
    localStorage.setItem('savedLists', JSON.stringify(updatedLists));
    setSavedLists(updatedLists);
  };

  return (
    <div className='relative flex flex-wrap items-center gap-8 px-32 py-12'>
      {savedLists.length > 0 ? (
        savedLists.map(({ name }, index) => (
          <div className='flex flex-col'>

          <button onClick={() => navigate(`/list/${name}`)}
          className='p-2 text-white bg-blue-800 rounded rounded-b-none'
          >{name}</button>

          <div key={index} className='relative flex flex-row'>

            <button 
              className='w-24 p-2 mb-2 text-white bg-blue-500 rounded-t-none cursor-pointer rounded-s' 
              onClick={() => navigate(`/list/${name}`)}
            >
              Show
            </button>
            <button 
              className='w-24 p-2 mb-2 text-white bg-yellow-500 cursor-pointer' 
              onClick={() => navigate(`/edit/${name}`)}
            >
              Edit
            </button>
            <button 
              className='w-24 p-2 mb-2 text-white bg-red-500 rounded-t-none cursor-pointer rounded-e' 
              onClick={() => handleDeleteList(name)}
            >
              Delete
            </button>
          </div>
          </div>
        ))
      ) : (
        <p className='mt-4'>No saved lists.</p>
      )}
    </div>
  );
}

export default Lists;
