const { Router } = require("express");
const chatController = require("../controllers/ChatRoom.controller");
const { RoomRoutesApi } = require("./room.router");
const {NameSpaceRoutesApi} = require("./namespace.router");
const router = Router();

router.get("/" , chatController.renderChatRoom);
router.get("/login" , chatController.loginForm);
router.post("/login" , chatController.login)
router.use("/namespace" , NameSpaceRoutesApi);
router.use("/room" , RoomRoutesApi);

module.exports = {
    ChatRoomRouterApi: router
}