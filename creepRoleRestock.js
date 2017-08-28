var shared = require('creepShared');

module.exports = {
    work: function (creep) {
        if (creep.carry.energy == creep.carryCapacity) {
            creep.memory.restocking = true;
        }
        else if (creep.carry.energy == 0) {
            creep.memory.restocking = false;
        }

        if (creep.memory.restocking) {     
            var extension = shared.getEmptyExtension(creep);
            
            if (extension != null) shared.transferEnergy(creep, extension);
            else if (Game.spawns.Spawn1.energyCapacity != Game.spawns.Spawn1.energy) shared.transferEnergy(creep, Game.spawns.Spawn1);
            else {
                var tower = shared.getTowerWithoutEnergy(creep);
                if (tower != null) shared.transferEnergy(creep, tower);                
                else shared.upgrade(creep);
            }            
        }
        else {
            if (creep.room.storage.store.energy != 0) shared.withdrawEnergy(creep, creep.room.storage);
            else creep.moveTo(Game.flags['OtherRally']);
        }
        
    }
}