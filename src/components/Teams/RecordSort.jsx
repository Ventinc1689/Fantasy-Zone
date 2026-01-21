import React from 'react'
import sort from '../../assets/down.svg';

const RecordSort = ({ sortByRecord, setSortByRecord }) => {
    return (
        <button 
        className={`hover:cursor-pointer flex items-center justify-center bg-gray-700 rounded-lg py-3 px-3 shrink-0 ${sortByRecord ? 'border-2 border-amber-400' : ''}`}
        onClick={() => setSortByRecord(!sortByRecord)}
        >
            <img 
                src={sort}
                alt="sort icon"
                className="w-7 h-7"
            />
        </button>
    )
}

export default RecordSort
