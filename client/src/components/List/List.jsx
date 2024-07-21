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
    <div className='relative flex flex-wrap items-center py-12 px-32 gap-8'>
      {savedLists.length > 0 ? (
        savedLists.map(({ name }, index) => (
          <div className='flex flex-col'>

          <button onClick={() => navigate(`/list/${name}`)}
          className='bg-blue-800 p-2 rounded text-white rounded-b-none'
          >{name}</button>

          <div key={index} className='relative flex flex-row'>

            <button 
              className='w-24 cursor-pointer bg-blue-500 text-white p-2 rounded-s rounded-t-none mb-2' 
              onClick={() => navigate(`/list/${name}`)}
            >
              Show
            </button>
            <button 
              className='w-24 cursor-pointer bg-yellow-500 text-white p-2 mb-2' 
              onClick={() => navigate(`/edit/${name}`)}
            >
              Edit
            </button>
            <button 
              className='w-24 cursor-pointer bg-red-500 text-white p-2 rounded-e rounded-t-none mb-2' 
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
