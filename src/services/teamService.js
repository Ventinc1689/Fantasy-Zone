import api from './api.js'

export const teamService = {
    // Fetch all teams
    getAllTeams: () => {
        return api.get('/team')
    },
    getAllTeamsSortedByRecord: () => {
        return api.get('/team/sorted/wins')
    },
};