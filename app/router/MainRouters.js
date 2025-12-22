const { Router } = require("express");
const { ChatRoomRouterApi } = require("./chatRoom.router");
const { NameSpaceRoutesApi } = require("./namespace.router");
const { RoomRoutesApi } = require("./room.router");
const router = Router();

router.use("/chat" , ChatRoomRouterApi);
router.use("/namespace" , NameSpaceRoutesApi);
router.use("/room" , RoomRoutesApi);

module.exports = {
    MainRouterApi: router
}