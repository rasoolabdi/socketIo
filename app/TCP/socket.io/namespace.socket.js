const ConversationModel = require("../../models/conversation");

class NameSpaceSocketHandler {
    #io;
    constructor(io) {
        this.#io = io;
    }

    async initConnection() {
        this.#io.on("connection" , async (socket) => {
            const namespaces = await ConversationModel.find({} , {title: 1, endpoint: 1}).sort({_id: -1});
            socket.emit("namespacesList" , namespaces);
        })
    }

    async createNamespacesConnection() {
        const namespaces = await ConversationModel.find({} , {title: 1, endpoint: 1, rooms: 1}).sort({_id: -1});
        for(const namespace of namespaces) {
            this.#io.of(`/${namespace.endpoint}`).on("connection" , (socket) => {
                socket.emit("roomList" , namespace.rooms);
            })
        }
    }
};
module.exports = NameSpaceSocketHandler;