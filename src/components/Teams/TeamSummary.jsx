import React from 'react'
import { useState, useEffect } from 'react'
import { teamService } from '../../services/teamService.js'
import { playerService } from '../../services/playerService.js'

const TeamSummary = ({ team, onClose }) => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Helper function to get team abbreviation
    const getTeamAbrev = (teamName) => {
        switch(teamName) { 
            case 'Arizona Cardinals': return 'ARI';
            case 'Atlanta Falcons': return 'ATL';
            case 'Baltimore Ravens': return 'BAL';
            case 'Buffalo Bills': return 'BUF';
            case 'Carolina Panthers': return 'CAR';
            case 'Chicago Bears': return 'CHI';
            case 'Cincinnati Bengals': return 'CIN';
            case 'Cleveland Browns': return 'CLE';
            case 'Dallas Cowboys': return 'DAL';
            case 'Denver Broncos': return 'DEN';
            case 'Detroit Lions': return 'DET';
            case 'Green Bay Packers': return 'GNB';
            case 'Houston Texans': return 'HOU';
            case 'Indianapolis Colts': return 'IND';
            case 'Jacksonville Jaguars': return 'JAX';
            case 'Kansas City Chiefs': return 'KAN';
            case 'Las Vegas Raiders': return 'LV';
            case 'Los Angeles Chargers': return 'LAC';
            case 'Los Angeles Rams': return 'LAR';
            case  'Miami Dolphins': return 'MIA';
            case 'Minnesota Vikings': return 'MIN';
            case 'New England Patriots': return 'NWE';
            case 'New Orleans Saints': return 'NO';
            case 'New York Giants': return 'NYG';
            case 'New York Jets': return 'NYJ';
            case 'Philadelphia Eagles': return 'PHI';
            case 'Pittsburgh Steelers': return 'PIT';
            case 'San Francisco 49ers': return 'SF';
            case 'Seattle Seahawks': return 'SEA';
            case 'Tampa Bay Buccaneers': return 'TAM';
            case 'Tennessee Titans': return 'TEN';
            case 'Washington Commanders': return 'WAS';
            default: return '';
        }
    };

    // Fetch players from the selected team
    useEffect(() => {
        const fetchTeamPlayers = async () => {
            try {
                setLoading(true);
                const teamAbrev = getTeamAbrev(team.name);
                const response = await playerService.getAllPlayersFromTeamSorted(teamAbrev);

                setPlayers(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchTeamPlayers();
    }, [team.name]);

    // Loading and Error States
    if (loading) {
        return <div className="px-5 md:ml-35 h-screen flex items-center justify-center">Loading Details...</div>;
    }
    if (error) {
        return <div className="px-5 md:ml-35 h-screen flex items-center justify-center">Error: {error}</div>;
    }

    // Summary modal that shows team stats and players 
    return (
        <div className="fixed flex items-center justify-center inset-0 bg-black/40 backdrop-brightness-50 z-200">

            {/* Modal Container */}
            <div className="absolute md:rounded-lg w-full h-full md:w-[80%] md:h-[80%] bg-black md:border-2 border-amber-400 flex flex-col overflow-hidden">

                <div className="flex flex-col sticky top-0 z-20">

                    {/* Team description section */}
                    <div className="flex w-full bg-linear-to-br from-gray-100 to-gray-800 md:rounded-t-lg flex-row p-5">

                        {/* Team Logo */}
                        <img 
                            src={team.logoUrl}
                            alt="Team Logo"
                            className="object-contain h-30 w-30 md:h-40 md:w-40 mr-8 "
                        />
                        
                        {/* Team Info */}
                        <div className="flex flex-col font-semibold text-[12px] md:text-[16px] text-black gap-2 justify-center">
                            <p className="font-bold text-[18px] md:text-[22px] lg:text-[28px]">{team.name}</p>

                            <div className="flex flex-row gap-5">
                                <p>W/L: {(team.wlPct * 100).toFixed(1)}%</p>
                                <p>({team.wins}-{team.losses}-{team.ties})</p>
                            </div>

                            <p>Team Points Per Game: <span className="text-white">{team.pointsForPerGame.toFixed(2)}</span></p>
                            <p>Points Allowed Per Game: <span className="text-white">{team.pointsAgainstPerGame.toFixed(2)}</span></p>
                        </div>

                        {/* Close Button */}
                        <button className="ml-auto flex text-white text-3xl font-bold hover:cursor-pointer hover:text-amber-400" onClick={onClose}>
                            X
                        </button>
                    </div>

                    {/* Table Header */}
                    <div className="bg-amber-400 text-black font-semibold">
                        <div className="grid grid-cols-5 w-full">
                            <p className="text-left p-3">Name</p>
                            <p className="text-center p-3">Pos</p>
                            <p className="text-center p-3">Age</p>
                            <p className="text-center p-3">Games</p>
                            <p className="text-center p-3">PPR</p>
                        </div>
                    </div>

                </div>

                {/* Players list section - Scrollable */}
                <div className="flex-1 overflow-y-auto">
                    <div className="divide-y divide-gray-600">
                        {players.map((player) => (
                            <div 
                                key={player.player_id}
                                className="grid grid-cols-5 text-[12px] md:text-[14px] lg:text-[16px] hover:bg-gray-800"
                            >
                                <p className="text-left px-3 py-5">{player.name}</p>
                                <p className="text-center px-3 py-5">{player.position}</p>
                                <p className="text-center px-3 py-5">{player.age}</p>
                                <p className="text-center px-3 py-5">{player.games}</p>
                                <p className="text-center px-3 py-5">{player.pprPerGame}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamSummary
