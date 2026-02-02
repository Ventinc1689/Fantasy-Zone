import React from 'react'
import person from '../../assets/person.svg'

const PlayerSummary = ({ player, onClose }) => {

    // Returns specfic color based on player position
    const getPositionColor = (position) => {
        switch(position) {
            case 'QB':
                return 'bg-green-400';
            case 'RB':
                return 'bg-rose-400';
            case 'WR':
                return 'bg-cyan-400';
            case 'TE':
                return 'bg-violet-500';
            default:
                return 'bg-gray-800';
        }
    };

    {/* Player summary with all relevant stats */}
    return (
        <div className="fixed flex items-center justify-center inset-0 bg-black/40 backdrop-brightness-50 z-500">

            {/* Modal Container */}
            <div className="absolute md:rounded-lg w-full h-full md:w-[80%] md:h-[80%] bg-black md:border-2 border-amber-400 flex flex-col overflow-hidden">

                {/* Sticky Header */}
                <div className="flex flex-col sticky top-0 z-20">

                    {/* Player Info Section */}
                    <div className="flex p-5 bg-linear-to-r from-gray-200 to-gray-900 flex-row">

                        {/* Player Image (!!! REPLACE IN FUTURE WITH REAL PLAYER HEADSHOT) */}
                        <img
                            src={person}
                            alt="Player"
                            className="object-contain h-20 w-20 md:h-30 md:w-30 mr-5"
                        />

                        {/* Player Details */}
                        <div className="flex flex-col gap-5 justify-center">
                            <p className="font-bold text-black text-[22px] md:text-[26px] lg:text-[30px]">{player.name}</p>

                            <div className="flex flex-row gap-5 text-[12px] md:text-[16px] lg:text-[18px]">
                                <div className={`p-2 rounded-lg ${getPositionColor(player.position)}`}>{player.position}{player.positionRank}</div>
                                <div className="p-2 bg-gray-800 rounded-lg">{player.team}</div>
                                <div className="p-2 bg-gray-800 rounded-lg">{player.age} yo</div>
                                <div className="p-2 bg-gray-800 rounded-lg">Gm: {player.games}</div>
                                <div className="p-2 bg-gray-800 rounded-lg">PPR/G: {player.pprPerGame}</div>
                            </div>
                        </div>

                        {/* Close Button */}
                        <button className="ml-auto flex text-white text-3xl font-bold hover:cursor-pointer hover:text-amber-400" onClick={onClose}>
                            X
                        </button>

                    </div>

                </div>

                {/* Player Stats Section */}
                <div className="flex-1 overflow-y-auto text-black">

                    {/* Passing Stats */}
                    {player.position === 'QB' && (
                        <div className="w-full">
                            <p className="bg-amber-400 items-center justify-center flex py-3 font-bold text-black">Passing Stats</p>

                            <div className="flex flex-col text-white divide-y divide-gray-600 font-bold">
                                <div className="flex flex-row px-10 py-4 justify-between items-center hover:bg-gray-800">
                                    <span>Passing Attempts:</span><span>{player.passing_attempts}</span>
                                </div>
                                <div className="flex flex-row px-10 py-4 justify-between items-center hover:bg-gray-800">
                                    <span>Passing Completions:</span><span>{player.passing_completions}</span>
                                </div>
                                <div className="flex flex-row px-10 py-4 justify-between items-center hover:bg-gray-800">
                                    <span>Passing Yards:</span><span>{player.passing_yards}</span>
                                </div>
                                <div className="flex flex-row px-10 py-4 justify-between items-center hover:bg-gray-800">
                                    <span>Passing Touchdowns:</span><span>{player.passing_td}</span>
                                </div>
                                <div className="flex flex-row px-10 py-4 justify-between items-center hover:bg-gray-800">
                                    <span>Interceptions:</span><span>{player.interceptions}</span>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Rushing Stats */}
                    {player.rushing_yards > 0 && (
                        <div className="w-full">
                            <p className="bg-amber-400 items-center justify-center flex py-3 font-bold text-black">Rushing Stats</p>

                            <div className="flex flex-col text-white divide-y divide-gray-600 font-bold">
                                <div className="flex flex-row px-10 py-4 justify-between items-center hover:bg-gray-800">
                                    <span>Rushing Attempts:</span><span>{player.rushing_attempts}</span>
                                </div>
                                <div className="flex flex-row px-10 py-4 justify-between items-center hover:bg-gray-800">
                                    <span>Rushing Yards:</span><span>{player.rushing_yards}</span>
                                </div>
                                <div className="flex flex-row px-10 py-4 justify-between items-center hover:bg-gray-800">
                                    <span>Yards per Rush:</span><span>{player.yard_per_attempt}</span>
                                </div>
                                <div className="flex flex-row px-10 py-4 justify-between items-center hover:bg-gray-800">
                                    <span>Rushing Touchdowns:</span><span>{player.rushing_td}</span>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Receiving Stats */}
                    {player.position !== 'QB' && (
                        <div className="w-full">
                            <p className="bg-amber-400 items-center justify-center flex py-3 font-bold text-black">Receiving Stats</p>

                            <div className="flex flex-col text-white divide-y divide-gray-600 font-bold">
                                <div className="flex flex-row px-10 py-4 justify-between items-center hover:bg-gray-800">
                                    <span>Targets:</span><span>{player.targets}</span>
                                </div>
                                <div className="flex flex-row px-10 py-4 justify-between items-center hover:bg-gray-800">
                                    <span>Receptions:</span><span>{player.receptions}</span>
                                </div>
                                <div className="flex flex-row px-10 py-4 justify-between items-center hover:bg-gray-800">
                                    <span>Receiving Yards:</span><span>{player.reception_yards}</span>
                                </div>
                                <div className="flex flex-row px-10 py-4 justify-between items-center hover:bg-gray-800">
                                    <span>Yards per Reception:</span><span>{player.yard_per_reception}</span>
                                </div>
                                <div className="flex flex-row px-10 py-4 justify-between items-center hover:bg-gray-800">
                                    <span>Receiving Touchdowns:</span><span>{player.reception_td}</span>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

            </div>
        
        </div>
    )
}

export default PlayerSummary
