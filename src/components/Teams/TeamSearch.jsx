import React from 'react'
import { useState, useEffect } from 'react';
import search from '../../assets/search.svg';

{/* Team Search Component for searching NFL teams */}
const TeamSearch = ({ searchTerm, setSearchTerm }) => {

    return (
        <div className="relative flex flex-1">

            {/* Search Bar */}
            <input 
                type="text"
                placeholder="Search for a team..."
                className="search-bar w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img 
                src={search}
                alt="Search Icon"
                className="w-6 h-6 absolute left-5 top-1/2 -translate-y-1/2"            
            />

            {/* Clear search button */}
            {searchTerm && (
                <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-[0%] top-1/2 -translate-y-1/2 mr-4 text-white hover:text-amber-400 font-bold text-xl hover:cursor-pointer"
                >
                    X
                </button>
            )}

        </div>
    )
}

export default TeamSearch
