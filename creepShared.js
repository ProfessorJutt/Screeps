module.exports = {

    // Node Interaction
    harvest: function (creep, target) {
        if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    },
    withdrawEnergy: function (creep, target) {
        if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    },
    pickupEnergy: function (creep, target) {
        if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    },
    transferEnergy: function (creep, target) {
        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    },
    build: function (creep, target) {
        if (creep.build(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    },
    repair: function (creep, target) {
        if (creep.repair(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    },
    upgrade: function (creep) {
        if (creep.carry.energy == creep.carryCapacity) creep.memory.upgrading = true;
        else if (creep.carry.energy == 0) creep.memory.upgrading = false;

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else { 
            var spawn = this.getNearestSpawn(creep);

            if (spawn.energy == spawn.energyCapacity) this.withdrawEnergy(creep, spawn);
            else if (creep.room.storage.store.energy != 0) this.withdrawEnergy(creep, creep.room.storage);
            else creep.moveTo(Game.flags['OtherRally']);
        }
    },

    // Finders
    getNearestContainer: function (creep) {
        return creep.pos.findClosestByPath(creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER && structure.store.energy > creep.carryCapacity);
            }
        }));
    },
    getNearestSpawn: function (creep) {
        return creep.pos.findClosestByPath(creep.room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_SPAWN);
            }
        })); 
    },
    getNearestStorage: function (creep) {
        return creep.pos.findClosestByPath(creep.room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE);
            }
        }));
    },
    getNearestDroppedEnergy: function (creep) {
        return creep.pos.findClosestByPath(creep.room.find(FIND_DROPPED_RESOURCES, {
            filter: (resource) => {
                return (resource.resourceType == RESOURCE_ENERGY);
            }
        }));
    },
    getDamagedStructure: function (creep) {
        return creep.pos.findClosestByPath(creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART && (structure.hits / structure.hitsMax) < .75);
            }
        }));
    },
    getTowerWithoutEnergy: function (creep) {
        return creep.pos.findClosestByPath(creep.room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER && structure.energy != structure.energyCapacity);
            }
        }));
    },
    getDamagedWalls: function (creep) {
        return creep.pos.findClosestByPath(creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType == STRUCTURE_WALL && structure.hits < 200000) || (structure.structureType == STRUCTURE_RAMPART && structure.hits < 100000));
            }
        }));
    },
    getEmptyExtension: function (creep) {
        return creep.pos.findClosestByPath(creep.room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION && structure.energy != structure.energyCapacity);
            }
        }));
    }
}