import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { playerService } from '../../services/playerService.js'
import PlayerSearch from '../Players/PlayerSearch.jsx'
import PlayerList from '../Players/PlayerList.jsx'
import PlayerSummary from './PlayerSummary.jsx'
import PlayerFilter from './PlayerFilter.jsx'
import filter from '../../assets/filter.svg'

const PlayerHome = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        positions: [],
        minGames: 0,
        sortBy: 'PPR'
    });

    // Map sort option to player property
    const sortOptionMap = {
        'PPR': 'pprPerGame',
        'Passing Attempts': 'passing_attempts',
        'Passing Completions': 'passing_completions',
        'Passing Yards': 'passing_yards',
        'Passing TDs': 'passing_td',
        'Interceptions': 'interceptions',
        'Rushing Attempts': 'rushing_attempts',
        'Rushing Yards': 'rushing_yards',
        'Yards per Rush': 'yard_per_attempt',
        'Rushing TDs': 'rushing_td',
        'Targets': 'targets',
        'Receptions': 'receptions',
        'Receiving Yards': 'reception_yards',
        'Yards per Reception': 'yard_per_reception',
        'Receiving TDs': 'reception_td'
    };

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

                // Calculate position ranking
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
    }, []);

    // Filter players based on search term
    const filteredPlayers = useMemo(() => {
        let result = [...players];

        // Filter by search term
        if (searchTerm) {
            result = result.filter(player =>
                player.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by positions
        if (filters.positions.length > 0) {
            result = result.filter(player => 
                filters.positions.includes(player.position)
            );
        }

        // Filter by minimum games played
        if (filters.minGames > 0) {
            result = result.filter(player =>
                player.games >= filters.minGames
            );
        }

        // Sort by selected stat
        const sortKey = sortOptionMap[filters.sortBy];
        result.sort((a, b) => (b[sortKey] || 0) - (a[sortKey] || 0));

        return result;
    }, [players, searchTerm, filters]);

    // Loading and Error States
    if (loading) {
        return <div className="px-5 md:ml-35 h-screen flex items-center justify-center">Loading Players...</div>;
    }
    if (error) {
        return <div className="px-5 md:ml-35 h-screen flex items-center justify-center">Error: {error}</div>;
    }

    return (
        <div className="md:ml-30 flex flex-col h-screen overflow-hidden">
            <div className="fixed top-0 bg-black z-100 w-full pb-6">

                {/* Header Section */}
                <p className="page-title mt-5 mb-1 px-5">NFL Players</p>
                <p className="top-18 text-[14px] md:text-[18px] px-5">Click on each player to see more details</p>

                {/* Search Bar and Filters/Sorts */}
                <div className="flex flex-row mt-8 px-5 md:mr-30 gap-2">

                    {/* Search Bar */}
                    <PlayerSearch 
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                    
                    {/* Position Filter */}
                    <div className="flex" onClick={() => setIsFilterOpen(true)}>
                        <img
                            src={filter}
                            alt="Filter Icon"
                            className="w-13 h-13 bg-gray-700 p-2 rounded-md hover:cursor-pointer"
                        />
                    </div>

                </div>
                
            </div>

            {/* List of all players matching all filters */}
            <div className="flex-1 overflow-y-auto mt-52 px-5">
                <PlayerList 
                    players={filteredPlayers}
                    onPlayerClick={setSelectedPlayer}
                />
            </div>

            {selectedPlayer && (
                <PlayerSummary 
                    player={selectedPlayer}
                    onClose={() => setSelectedPlayer(null)}
                />
            )}

            {isFilterOpen && (
                <PlayerFilter 
                    onClose={() => setIsFilterOpen(false)}
                    filters={filters}
                    setFilters={setFilters}
                />
            )}
        </div>
    )
}

export default PlayerHome
