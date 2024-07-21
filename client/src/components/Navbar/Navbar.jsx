import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ProfileInfo from '../ProfileInfo/ProfileInfo';
import SearchBar from '../SearchBar/SearchBar';

function Navbar({ userInfo = null }) {
  const [searchCategory, setSearchCategory] = useState("");

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = (value) => {
    navigate(`/search/${value}`);
  };

  const onClearSearch = () => {
    setSearchCategory("");
    navigate(`/`); // Navigate to default path
  };

  return (
    <nav className="bg-gray-500 border-gray-200 px-4 lg:px-6 py-2.5 bg-opacity-50 sticky z-50 top-0">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <h2 className='text-lg font-medium font-serif'>Dog's House</h2>

        <div className="flex items-center lg:order-2 gap-1">
          <SearchBar
            value={searchCategory}
            onChange={({ target }) => {
              setSearchCategory(target.value);
              handleSearch(target.value);
            }}
            onClearSearch={onClearSearch}
          />

          <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </div>
        <div
          className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200
                  ${isActive ? "text-orange-700" : "text-gray-700"}
                   border-b border-gray-100
                  hover:bg-gray-50 lg:hover:bg-transparent
                   lg:border-0 hover:text-orange-700 lg:p-0 mr-2`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/list'
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200
                  ${isActive ? "text-orange-700" : "text-gray-700"}
                   border-b border-gray-100
                  hover:bg-gray-50 lg:hover:bg-transparent
                   lg:border-0 hover:text-orange-700 lg:p-0 mr-2`
                }
              >
                YourList
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
