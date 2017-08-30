var roleBuilder = require('creepRoleBuilder');
var roleHarvester = require('creepRoleHarvester');
var roleRestock = require('creepRoleRestock');
var roleTransport = require('creepRoleTransport');
var roleUpgrader = require('creepRoleUpgrader');
var roleScout = require('creepRoleScout');

module.exports = {

    // Handles creep creation.
    spawnCreep: function () {

        // Max creep count for each role.
        var maxHarvester = 2;
        var maxTransport = 2;
        var maxUpgrader = 2;
        var maxBuilder = 2;
        var maxRestock = 2;
        var maxScout = 1;

        // Creep count
        var harvesterCount = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
        var transportCount = _.sum(Game.creeps, (c) => c.memory.role == 'transport');
        var upgraderCount = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
        var builderCount = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
        var restockCount = _.sum(Game.creeps, (c) => c.memory.role == 'restock');
        var scoutCount = _.sum(Game.creeps, (c) => c.memory.role == 'scout');

        // Spawning creep.
        if (harvesterCount < maxHarvester) Game.spawns.Spawn1.createCreep([MOVE, MOVE, WORK, WORK, WORK, WORK, WORK], null, { role: 'harvester' });
        else if (transportCount < maxTransport) Game.spawns.Spawn1.createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], null, { role: 'transport' });
        else if (restockCount < maxRestock) Game.spawns.Spawn1.createCreep([MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, WORK], null, { role: 'restock' });
        else {            
            if (upgraderCount < maxUpgrader) Game.spawns.Spawn1.createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, WORK, WORK, WORK], null, { role: 'upgrader' });
            if (builderCount < maxBuilder) Game.spawns.Spawn1.createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK], null, { role: 'builder' });
            if (scoutCount < maxScout) Game.spawns.Spawn1.createCreep([MOVE], null, { role: 'scout' });
        }    

    },

    // Creep memory cleanup
    cleanupMemory: function () {
        for (let name in Memory.creeps) {
            if (Game.creeps[name] == undefined) {
                delete Memory.creeps[name];
            }
        }
    },

    // Executing appropriate role functions for each creep.
    executeRoles: function () {
        for (let name in Game.creeps) {
            var creep = Game.creeps[name];
            
            switch (creep.memory.role) {
                case 'harvester':
                    roleHarvester.work(creep);
                    break;
                case 'harvesterLink':
                    roleHarvester.linkWork(creep);
                    break;
                case 'transport':
                    roleTransport.work(creep);
                    break;
                case 'upgrader':
                    roleUpgrader.work(creep);
                    break;
                case 'builder':
                    roleBuilder.work(creep);
                    break;
                case 'restock':
                    roleRestock.work(creep);
                    break;
                case 'scout':
                    roleScout.work(creep);
                    break;
                default:
                    creep.suicide();
                    break;
            }
        }
    }
};
