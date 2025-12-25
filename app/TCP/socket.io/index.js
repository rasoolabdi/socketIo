const NameSpaceSocketHandler = require("./namespace.socket")


module.exports = {
    socketHandler: (io) => {
        new NameSpaceSocketHandler(io).initConnection();
    }
}