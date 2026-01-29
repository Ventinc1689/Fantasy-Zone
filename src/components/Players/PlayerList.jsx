import React from 'react'

const PlayerList = ({ players, onPlayerClick }) => {

    // Returns specfic color based on player position
    const getPositionColor = (position) => {
        switch(position) {
            case 'QB':
                return 'text-green-400';
            case 'RB':
                return 'text-rose-400';
            case 'WR':
                return 'text-cyan-400';
            case 'TE':
                return 'text-violet-500';
            default:
                return 'text-white';
        }
    };

    return (
        <div className="w-full">
            <table className="w-full border-collapse">

                {/* Table Header */}
                <thead className="sticky top-0 bg-black">
                    <tr className="bg-amber-400 text-black font-semibold ">
                        <th className="py-3 px-4 text-left w-[30%] md:w-[20%] lg:w-[20%]">Name</th>
                        <th className="py-3 px-4 text-center w-[15%] md:w-[15%] lg:w-[10%]">Pos</th>
                        <th className="py-3 px-4 text-center w-[20%] md:w-[15%] lg:w-[10%]">Tm</th>
                        <th className="py-3 px-4 text-center w-[15%] md:w-[15%] lg:w-[10%]">Games</th>
                        <th className="py-3 px-4 text-center w-[20%] md:w-[15%] lg:w-[20%]">PPR</th>
                        <th className="py-3 px-4 text-center w-[20%] hidden md:table-cell md:w-[20%] lg:w-[15%]">Pos Rank</th>
                        <th className="py-3 px-4 text-center w-[20%] hidden lg:table-cell lg:w-[15%]">Ovr Rank</th>
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-gray-600">
                    {players.map((player) => (
                        <tr key={player.player_id} 
                            className="hover:bg-gray-800 hover:cursor-pointer text-[12px] md:text-[14px] lg:text-[16px]"
                            onClick={() => onPlayerClick(player)}
                        >
                            <td className="py-5 px-4 text-left font-semibold text-amber-400">{player.name}</td>
                            <td className={`py-5 px-4 text-center ${getPositionColor(player.position)}`}>{player.position}</td>
                            <td className="py-5 px-4 text-center">{player.team}</td>
                            <td className="py-5 px-4 text-center">{player.games}</td>
                            <td className="py-5 px-4 text-center">{player.pprPerGame}</td>
                            <td className={`py-5 px-4 text-center hidden md:table-cell ${getPositionColor(player.position)}`}>{player.position}{player.positionRank}</td>
                            <td className="py-5 px-4 text-center hidden lg:table-cell">{player.overallRank}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PlayerList