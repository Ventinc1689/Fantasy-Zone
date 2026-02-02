import api from './api.js'

export const playerService = {  
    getAllPlayers: () => {
        return api.get('/player')
    },
    getAllPlayersSortedByPpr: () => {
        return api.get('/player/sorted/ppr_per_game')
    },
    getAllPlayersFromTeamSorted: (team) => {
        return api.get(`/player/sorted/ppr_per_game/team/${team}`)
    },
    getPlayerByPositionSorted: (position) => {
        return api.get(`/player/sorted/ppr_per_game/position/${position}`)
    },
}