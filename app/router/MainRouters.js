const { Router } = require("express");
const { ChatRoomRouterApi } = require("./chatRoom.router");
const router = Router();

router.use("/chat" , ChatRoomRouterApi);

module.exports = {
    MainRouterApi: router
}