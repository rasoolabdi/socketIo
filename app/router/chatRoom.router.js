const { Router } = require("express");
const chatController = require("../controllers/ChatRoom.controller");
const router = Router();

router.get("/" , chatController.renderChatRoom);

module.exports = {
    ChatRoomRouterApi: router
}