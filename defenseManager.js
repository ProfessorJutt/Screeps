module.exports = {
    findHostiles: function (roomId) {
        return Game.rooms[roomId].find(FIND_HOSTILE_CREEPS);
    },
    towersAttack: function (roomId) {
        var hostiles = this.findHostiles(roomId);
        Game.rooms[roomId]
            .find(FIND_MY_STRUCTURES, { 
                filter: { 
                    structureType: STRUCTURE_TOWER 
                } 
            })
            .forEach(tower => tower.attack(hostiles[0]));
    }
}