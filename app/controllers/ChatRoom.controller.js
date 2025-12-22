const Controller = require("../Controller");

class ChatController extends Controller {
    constructor() {
        super();
    }

    renderChatRoom(req , res , next) {
        try {
            return res.render("chat.ejs");
        }
        catch(error) {
            next(error);
        }
    }

};

module.exports = new ChatController();