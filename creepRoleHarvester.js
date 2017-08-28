var shared = require('creepShared');

module.exports = {
    work: function (creep) {
        shared.harvest(creep, creep.pos.findClosestByPath(FIND_SOURCES));
    }
}