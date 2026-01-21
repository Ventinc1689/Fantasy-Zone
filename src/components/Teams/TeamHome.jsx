import React from 'react'
import { useState, useEffect } from 'react'
import { teamService } from '../../services/teamService.js'
import TeamList from './TeamList.jsx'
import TeamSearch from './TeamSearch.jsx'
import RecordSort from './RecordSort.jsx'

const TeamHome = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortByRecord, setSortByRecord] = useState(false);

    // Fetch all teams
    useEffect(() => {
        const fetchAllTeams = async () => {
            try {
                setLoading(true);
                const endpoint = sortByRecord
                    ? teamService.getAllTeamsSortedByRecord
                    : teamService.getAllTeams;
                const teams = await endpoint();
                setTeams(teams.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllTeams();
    }, [sortByRecord]);

    // Filter teams based on search input
    const filteredTeams = teams.filter(team =>
        team.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Loading and Error States
    if (loading) {
        return <div className="px-5 md:ml-35 h-screen flex items-center justify-center">Loading Teams...</div>;
    }
    if (error) {
        return <div className="px-5 md:ml-35 h-screen flex items-center justify-center">Error: {error}</div>;
    }

    return (
        <div className="md:ml-35 flex flex-col h-screen">

            {/* Sticky Header and Search Bar */}
            <div className="fixed top-0 bg-black z-50 w-full pb-5">
                {/* Header */}
                <p className="page-title mt-5 mb-1 px-5">NFL Teams</p>
                <p className="top-18 text-[14px] md:text-[18px] px-5">Click on each team to see more details and players from the selected team</p>

                <div className="flex flex-row mt-8 gap-2 w-full px-5">

                    {/* Search Bar */}
                    <TeamSearch 
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />

                    {/* Record Sort Button */}
                    <RecordSort 
                        sortByRecord={sortByRecord}
                        setSortByRecord={setSortByRecord}
                    />

                </div>
            </div>
            
            <TeamList teams={filteredTeams} />
        </div>
    )
}

export default TeamHome
