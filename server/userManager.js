const activeUsers = [];

class User {
    constructor(socketId, nanoId, type) {
        this.socketId = socketId;
        this.nanoId = nanoId;
        this.type = type;
    }
}

function addNewActiveUser(user) {
    activeUsers.push(user);
}

function getActiveUsers() {
    return activeUsers;
}

function removeUserBySocketId(socketId) {
    const index = activeUsers.findIndex(user => user.socketId === socketId);
    if (index !== -1) {
        activeUsers.splice(index, 1);
    }
}
function getSocketIdFromNanoId(nanoId) {
    const user = activeUsers.find(user => user.nanoId === nanoId);
    return user ? user.socketId : null;
}

module.exports = {
    User,
    addNewActiveUser,
    getActiveUsers,
    removeUserBySocketId,
    getSocketIdFromNanoId
};

/*
    user_add_chat event
    user_join_chat event
    user_start_chat event


*/

