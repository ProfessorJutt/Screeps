var creepManager = require('creepManager');
var defenseManager = require('defenseManager');

module.exports.loop = function () {
    creepManager.cleanupMemory();
    creepManager.spawnCreep();
    creepManager.executeRoles();
    defenseManager.towersAttack('E43N13');
}
