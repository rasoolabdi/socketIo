const { Router } = require("express");
const roomController = require("../controllers/room.controller");
const { uploadFile } = require("../utils/uploader");
const router = Router();

router.post("/add" , uploadFile.single("image") , roomController.addNewRoom);
router.get("/list" , roomController.getAllRoom);

module.exports = {
    RoomRoutesApi: router
}