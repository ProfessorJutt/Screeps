var shared = require('creepShared');

module.exports = {
    work: function (creep) {
        
        // Managing the working state of the creep.
        if (creep.carry.energy == creep.carryCapacity) creep.memory.working = true;
        else if (creep.carry.energy == 0) creep.memory.working = false;

        if (creep.memory.working) {
            var nearestConstruction = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

            // Build structures.
            if (nearestConstruction != null) {
                if (creep.memory.working) shared.build(creep, nearestConstruction);
                else shared.withdrawEnergy(creep, shared.getNearestStorage());
            }
            // Repair structures.
            else {
                var damagedStructure = shared.getDamagedStructure(creep);

                if (damagedStructure != null) shared.repair(creep, damagedStructure);
                            
                // Repair walls and ramparts.
                else {
                    var walls = shared.getDamagedWalls(creep);
                    if (walls != null) shared.repair(creep, walls);
                    else shared.upgrade(creep);
                }
            }
        }
        else {
            if (creep.room.storage.store.energy != 0) shared.withdrawEnergy(creep, creep.room.storage);
            else creep.moveTo(Game.flags['OtherRally']);
        }
        
    }
}