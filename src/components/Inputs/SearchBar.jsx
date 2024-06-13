import React from 'react';

const SearchBar = ({ onSearch }) => {
    return (
        <div className="flex w-[90%] sm:w-[50%] items-center border-b border-gray-300 p-2 my-4 mx-auto">
            <input
                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Buscar Cancha..."
                aria-label="Buscar"
                onChange={(e) => onSearch(e.target.value)}
            />
            <button
                className="flex-shrink-0 bg-transparent hover:bg-blue-700 border-white hover:border-blue-700 text-sm border text-white py-1 px-2 rounded-full mx-2"
                type="button"
            >
                <i className="fas fa-search"></i>
            </button>
        </div>
    );
};

export default SearchBar;
