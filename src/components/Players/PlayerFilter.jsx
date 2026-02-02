import React from 'react'
import { useState, useEffect } from 'react'

const PlayerFilter = ({ onClose, filters, setFilters }) => {

    // Possible positions 
    const positions = ['QB', 'RB', 'WR', 'TE'];

    // Possible sort options
    const sortOptions = ['PPR', 'Passing Attempts', 'Passing Completions', 'Passing Yards', 'Passing TDs', 'Interceptions', 'Rushing Attempts', 'Rushing Yards', 'Yards per Rush', 'Rushing TDs', 'Targets', 'Receptions', 'Receiving Yards', 'Yards per Reception', 'Receiving TDs'];

    // Local state for filters
    const [localFilters, setLocalFilters] = useState(filters);

    // Handle position checkbox change
    const handlePositionChange = (position) => {
        setLocalFilters(prev => ({
            ...prev,
            positions: prev.positions.includes(position)
                ? prev.positions.filter(p => p !== position)
                : [...prev.positions, position]
        }));
    };

    // Handle filter apply clicked
    const handleApply = () => {
        setFilters(localFilters);
        onClose();
    };

    // Handle clear filters clicked
    const handleClear = () => {
        const defaultFilters = { positions: [], minGames: 0, sortBy: 'PPR' };
        setLocalFilters(defaultFilters);
        setFilters(defaultFilters);
        onClose();
    };

    // Player Filter Modal
    return (
        <div className="fixed flex items-center justify-center inset-0 bg-black/40 backdrop-brightness-50 z-500">

            {/* Modal Container */}
            <div className="absolute rounded-lg w-[80%] h-[90%] md:w-[50%] md:h-[80%] bg-linear-to-b from-black to-gray-800 border-2 border-amber-400 flex flex-col overflow-hidden">

                <p className="p-3 font-bold text-[22px] border-b-2 border-amber-400 text-amber-400">Filter/Sort</p>

                {/* Close Button */}
                <button className="absolute right-4 top-3 text-white text-2xl font-bold hover:cursor-pointer hover:text-amber-400" onClick={onClose}>
                    X
                </button>

                <div className="flex flex-col p-4 overflow-y-auto ">

                    {/* Position Filters */}
                    <p className="mb-2 flex text-[20px] font-bold">Position Filters</p>

                    <div className="flex flex-col gap-4 pl-5">
                        {positions.map((position) => (
                            <label key={position} 
                            className="flex flex-row gap-3 items-center text-[14px] hover:cursor-pointer">
                                <input 
                                    type="checkbox"
                                    checked={localFilters.positions.includes(position)}
                                    onChange={() => handlePositionChange(position)}
                                    className="accent-amber-400 w-4 h-4 "
                                />
                                {position}
                            </label>                    
                        ))}
                    </div>

                    <p className="mb-4 flex text-[20px] font-bold mt-8">Min Games Played</p>
                    <span className="mb-4 flex text-[16px] font-semibold justify-center">{localFilters.minGames}</span>

                    {/* Games Played Slider */}
                    <div className="flex flex-col gap-1 w-full px-2">
                        <input
                            type="range"
                            min="0"
                            max="17"
                            className="accent-amber-400 w-full "
                            value={localFilters.minGames}
                            onChange={(e) => setLocalFilters(prev => ({ ...prev, minGames: Number(e.target.value) }))}
                        />

                        <span className="flex justify-between text-[15px]">
                            <span>0</span>
                            <span>17</span>
                        </span>
                    </div>

                    <p className="mb-4 flex text-[20px] font-bold mt-10">Sort By:</p>

                    <div className="flex flex-col gap-3 pl-5">
                        {sortOptions.map((option) => (
                            <label key={option}
                            className="flex flex-row gap-3 items-center text-[14px] hover:cursor-pointer">
                                <input 
                                    type="radio"
                                    name="sortOption"
                                    checked={localFilters.sortBy === option}
                                    onChange={() => setLocalFilters(prev => ({ ...prev, sortBy: option }))}
                                    className="accent-amber-400 w-4 h-4"
                                />
                                {option}
                            </label>
                        ))}
                    </div>

                </div>

                {/* Sticky close/apply buttons */}
                <div className="flex flex-row items-end text-black font-bold border-t-2">
                    <span className="flex flex-1 py-2 bg-gray-300 justify-center hover:cursor-pointer" onClick={handleClear}>Clear</span>
                    <span className="flex flex-1 py-2 bg-amber-400 justify-center hover:cursor-pointer" onClick={handleApply}>Apply</span>
                </div>

            </div>

        </div>
    )
}

export default PlayerFilter
