const { Router } = require("express");
const roomController = require("../controllers/room.controller");
const router = Router();

router.post("/add" , roomController.addNewRoom);
router.get("/list" , roomController.getAllRoom);

module.exports = {
    RoomRoutesApi: router
}