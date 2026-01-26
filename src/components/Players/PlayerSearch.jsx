import React from 'react'
import { useState, useEffect } from 'react';
import search from '../../assets/search.svg';

const PlayerSearch = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="relative flex flex-1">

            {/* Search Bar */}
            <input 
                type="text"
                placeholder='Search for a player...'
                className="search-bar w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img 
                src={search}
                alt="search logo"
                className="h-6 w-6 absolute left-5 top-1/2 -translate-y-1/2"
            />

            {/* Clear search button */}
            {searchTerm && (
                <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-[0%] top-1/2 -translate-y-1/2 mr-4 text-amber-400 hover:text-red-400 font-bold text-xl hover:cursor-pointer"
                >
                    X
                </button>
            )}
        </div>
    )
}

export default PlayerSearch
