import React from 'react'
import { useState, useEffect } from 'react'
import { playerService } from '../../services/playerService.js'

const PlayerHome = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all players
    useEffect(() => {
        const fetchAllPlayers = async () => {
            try {
                setLoading(true);
                const players = await playerService.getAllPlayers();
                setPlayers(players.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAllPlayers();
    }, [])

    // Loading and Error States
    if (loading) {
        return <div className="px-5 md:ml-35 h-screen flex items-center justify-center">Loading Teams...</div>;
    }
    if (error) {
        return <div className="px-5 md:ml-35 h-screen flex items-center justify-center">Error: {error}</div>;
    }

    return (
        <div className="md:ml-35 flex flex-col h-screen">
            <div className="fixed top-0 bg-black z-50 w-full pb-5">
                <p className="page-title mt-5 mb-1 px-5">NFL Players</p>
                <p className="top-18 text-[14px] md:text-[18px] px-5">Click on each player to see more details</p>
            </div>
        </div>
    )
}

export default PlayerHome
