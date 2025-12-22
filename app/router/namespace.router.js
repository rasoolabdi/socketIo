const { Router } = require("express");
const namespaceController = require("../controllers/namespace.controller");
const router = Router();

router.post("/add" , namespaceController.addNameSpace);
router.get("/list" , namespaceController.getListOfNameSpaces);

module.exports = {
    NameSpaceRoutesApi: router
}