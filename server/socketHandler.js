
class User {
    constructor(userId, roomId) {
        this.userId = userId;
        this.roomId = roomId;
    }
}

activeUsers = [];

function addNewActiveUser(User) {
    activeUsers.push(User);
}

