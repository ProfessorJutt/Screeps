var shared = require('creepShared');

module.exports = {
    work: function (creep) {
        if (creep.carryCapacity == creep.carry.energy) {
            var nearestStorage = shared.getNearestStorage(creep);
            shared.transferEnergy(creep, nearestStorage);
        }
        else {
            var nearestContainer = shared.getNearestContainer(creep);
            
            if (nearestContainer != null) shared.withdrawEnergy(creep, nearestContainer);
            else {
                var dropped = shared.getNearestDroppedEnergy(creep);

                if (dropped != null) shared.pickupEnergy(creep, dropped);
                else creep.moveTo(Game.flags['GatherRally']);
            }
        }
    }
}