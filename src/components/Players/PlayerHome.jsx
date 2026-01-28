import React from 'react'
import { useState, useEffect } from 'react'
import { playerService } from '../../services/playerService.js'
import PlayerSearch from '../Players/PlayerSearch.jsx'
import PlayerList from '../Players/PlayerList.jsx'

const PlayerHome = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortByPpr, setSortByPpr] = useState(true);

    // Fetch all players
    useEffect(() => {
        const fetchAllPlayers = async () => {
            try {
                setLoading(true);
                const players = await playerService.getAllPlayersSortedByPpr();

                // Calculate overall ranking
                const playerRanks = players.data.map((player, index) => ({
                    ...player,
                    overallRank: index + 1
                }));

                // Calculate positon ranking
                const positionCounts = {};
                const ranksByPosition = playerRanks.map(player => {
                    const position = player.position;
                    if (!positionCounts[position]) {
                        positionCounts[position] = 0;
                    }
                    positionCounts[position]++;

                    return {
                        ...player,
                        positionRank: positionCounts[position]
                    };
                });

                setPlayers(ranksByPosition);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAllPlayers();
    }, [])

    const filteredPlayers = players.filter(player => 
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Loading and Error States
    if (loading) {
        return <div className="px-5 md:ml-35 h-screen flex items-center justify-center">Loading Players...</div>;
    }
    if (error) {
        return <div className="px-5 md:ml-35 h-screen flex items-center justify-center">Error: {error}</div>;
    }

    return (
        <div className="md:ml-30 flex flex-col h-screen overflow-hidden">
            <div className="fixed top-0 bg-black z-50 w-full pb-6">

                {/* Header Section */}
                <p className="page-title mt-5 mb-1 px-5">NFL Players</p>
                <p className="top-18 text-[14px] md:text-[18px] px-5">Click on each player to see more details</p>

                {/* Search Bar and Filters/Sorts */}
                <div className="flex flex-row mt-8 px-5 md:mr-30">
                    <PlayerSearch 
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />

                </div>
            </div>

            {/* List of all players matching all filters */}
            <div className="flex-1 overflow-y-auto mt-52 px-5">
                <PlayerList players={filteredPlayers}/>
            </div>
        </div>
    )
}

export default PlayerHome
