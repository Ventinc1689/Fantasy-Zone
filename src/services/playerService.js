import api from './api.js'

export const playerService = {  
    getAllPlayers: () => {
        return api.get('/player')
    },
}