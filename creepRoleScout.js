module.exports = {
    work: function (creep) {
        
        if (creep.y != 0 && creep.room.name == 'E43N13') {
            creep.moveTo(38, 0);
        }
        else if (creep.pos.y != 26) {
            creep.moveTo(27, 26);
            
            if (creep.memory.lastMessage == 'I') {
                creep.say('Love');
                creep.memory.lastMessage = 'love';
            }
            else if (creep.memory.lastMessage == 'love') {
                creep.say('Wang!');
                creep.memory.lastMessage = 'Wang';
            }
            else {
                creep.say('I');
                creep.memory.lastMessage = 'I';
            }
        }
        else {
            if (creep.memory.lastMessage == 'I') {
                creep.say('Love');
                creep.memory.lastMessage = 'love';
            }
            else if (creep.memory.lastMessage == 'love') {
                creep.say('Wang!');
                creep.memory.lastMessage = 'Wang';
            }
            else {
                creep.say('I');
                creep.memory.lastMessage = 'I';
            }
        }
    }
};